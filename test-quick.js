
import { DocsSearcher } from './dist/search.js';
import * as path from 'path';

const docsDir = '/Volumes/T7/WebstormProjects/arkts-mcp-server/static/docs';
const searcher = new DocsSearcher(docsDir);

console.log(`Total documents found: ${searcher.getTotalDocs()}`);

const query = 'State';
console.log(`\nSearching for: "${query}"...`);
const results = searcher.search(query);

results.forEach((r, i) => {
    console.log(`[${i + 1}] ${r.title} (Score: ${r.score})`);
    console.log(`    ObjectId: ${r.objectId}`);
});

if (searcher.getTotalDocs() > 0) {
    console.log('\n✅ Local index loading and searching is working correctly.');
} else {
    console.log('\n❌ No documents found. Please check implementation or data directory.');
}
