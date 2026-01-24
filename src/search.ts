import * as fs from 'fs';
import * as path from 'path';

export interface DocEntry {
  title: string;
  headings: string[];
  preview: string;
  char_count: number;
  image_count: number;
  url: string;
  path: string;
  rel_path: string;
  catalog: string;
  objectId: string;
  nodeName: string;
}

export interface SearchResult {
  title: string;
  objectId: string;
  preview: string;
  url: string;
  path: string;
  score: number;
}

export class DocsSearcher {
  private docs: DocEntry[] = [];
  private docsDir: string;
  private indexPath: string;

  constructor(docsDir: string) {
    this.docsDir = docsDir;
    this.indexPath = path.join(docsDir, 'arkts_index_share.json');
    this.loadIndex();
  }

  private loadIndex(): void {
    try {
      const content = fs.readFileSync(this.indexPath, 'utf-8');
      this.docs = JSON.parse(content);
      console.error(`[arkts-mcp] Loaded ${this.docs.length} documents from index`);
    } catch (error) {
      console.error(`[arkts-mcp] Failed to load index: ${error}`);
      this.docs = [];
    }
  }

  search(query: string, limit: number = 10): SearchResult[] {
    const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0);
    if (keywords.length === 0) {
      return [];
    }

    const results: SearchResult[] = [];

    for (const doc of this.docs) {
      let score = 0;
      const titleLower = doc.title.toLowerCase();
      const previewLower = doc.preview.toLowerCase();
      const objectIdLower = doc.objectId.toLowerCase();

      for (const keyword of keywords) {
        // Title match (highest weight)
        if (titleLower.includes(keyword)) {
          score += 10;
          if (titleLower === keyword) {
            score += 5; // Exact match bonus
          }
        }

        // ObjectId match
        if (objectIdLower.includes(keyword)) {
          score += 5;
        }

        // Preview match
        if (previewLower.includes(keyword)) {
          score += 2;
          // Count occurrences
          const matches = previewLower.split(keyword).length - 1;
          score += Math.min(matches, 5);
        }
      }

      if (score > 0) {
        results.push({
          title: doc.title,
          objectId: doc.objectId,
          preview: doc.preview.substring(0, 200) + (doc.preview.length > 200 ? '...' : ''),
          url: doc.url,
          path: doc.rel_path,
          score
        });
      }
    }

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    return results.slice(0, limit);
  }

  getDocByObjectId(objectId: string): { content: string; metadata: DocEntry } | null {
    const doc = this.docs.find(d => d.objectId === objectId);
    if (!doc) {
      return null;
    }

    const fullPath = path.join(this.docsDir, doc.rel_path);
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      return { content, metadata: doc };
    } catch (error) {
      console.error(`[arkts-mcp] Failed to read document: ${error}`);
      return null;
    }
  }

  listTopics(): { topic: string; count: number }[] {
    const topicMap = new Map<string, number>();

    for (const doc of this.docs) {
      // Extract topic from path
      const pathParts = doc.rel_path.split('/');
      if (pathParts.length >= 4) {
        const topic = pathParts[3]; // e.g., "harmonyos-guides" or "harmonyos-references"
        topicMap.set(topic, (topicMap.get(topic) || 0) + 1);
      }
    }

    return Array.from(topicMap.entries())
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count);
  }

  getTotalDocs(): number {
    return this.docs.length;
  }
}
