# ArkTS Documentation MCP Server

HarmonyOS ArkTS 开发文档的 MCP (Model Context Protocol) 服务器，为 AI 编程助手提供快速的文档检索能力。

## 功能特性

- **search_arkts_docs** - 关键词搜索 ArkTS 文档
- **get_arkts_doc** - 获取完整文档内容
- **list_arkts_topics** - 列出文档分类

## 安装

```bash
cd arkts-mcp-server
npm install
npm run build
```

## 使用方式

### 方式一：Claude Code 配置 (推荐)

在 Claude Code 配置文件中添加 MCP 服务器：

**全局配置** (`~/.claude/settings.json`)：

```json
{
  "mcpServers": {
    "arkts-docs": {
      "command": "node",
      "args": ["D:/develop/docs/arkts-docs-full-md/arkts-mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

**项目级配置** (`.claude/settings.local.json`)：

```json
{
  "mcpServers": {
    "arkts-docs": {
      "command": "node",
      "args": ["D:/develop/docs/arkts-docs-full-md/arkts-mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

### 方式二：HTTP 服务模式

启动 HTTP 服务后，可以通过 REST API 访问：

```bash
npm run start:http
```

API 端点：
- `GET /health` - 健康检查
- `GET /search?q=关键词` - 搜索文档
- `GET /doc/:objectId` - 获取完整文档
- `GET /topics` - 列出所有主题

### 方式三：开发模式

```bash
# stdio 模式
npm run dev

# HTTP 模式
npm run dev:http
```

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `ARKTS_DOCS_DIR` | 文档目录路径 | 项目 `static/docs` 目录 |
| `ARKTS_MCP_PORT` | HTTP 服务端口 | 3456 |

## 工具说明

### search_arkts_docs

搜索 HarmonyOS ArkTS 官方开发文档。

**使用场景：**
- ArkTS 语法特性和语言约束
- ArkUI 组件用法（Button、Text、Column、Row、List、Grid 等）
- 状态管理装饰器（@State、@Prop、@Link、@Observed 等）
- 动画和转场效果
- 导航和路由
- 系统能力和 API
- 错误码和问题排查

**参数：**
- `query` (必填): 搜索关键词，支持中英文，多个关键词用空格分隔
- `limit` (可选): 返回结果数量，默认 10，最大 50

**AI 调用示例：**

| 用户问题 | 工具调用 |
|---------|---------|
| "@State 和 @Prop 有什么区别？" | `search_arkts_docs({ query: "State Prop 装饰器" })` |
| "怎么实现页面跳转？" | `search_arkts_docs({ query: "Navigation 路由 页面跳转" })` |
| "List 组件怎么用？" | `search_arkts_docs({ query: "List 列表组件" })` |
| "动画怎么实现？" | `search_arkts_docs({ query: "animateTo 属性动画" })` |

**搜索技巧：**
- 使用中文关键词效果更好
- 可以组合多个关键词，用空格分隔
- 搜索组件时加上"组件"后缀
- 搜索装饰器时可以带 @ 符号

### get_arkts_doc

获取 ArkTS 文档的完整内容。

**使用流程：**
1. 先调用 `search_arkts_docs` 搜索相关文档
2. 从搜索结果中选择最相关的文档
3. 使用该文档的 `objectId` 调用此工具获取完整内容

**参数：**
- `objectId` (必填): 文档的唯一标识符，从搜索结果中获取

**示例：**
```
1. 调用：search_arkts_docs({ query: "State装饰器" })
2. 从结果中找到 objectId: "arkts-state"
3. 调用：get_arkts_doc({ objectId: "arkts-state" })
```

### list_arkts_topics

列出 ArkTS 文档的所有主题分类。

**使用场景：**
- 了解文档库的整体结构
- 查看有哪些主题分类
- 统计各分类的文档数量

## AI 助手使用效果

配置完成后，在任何工作目录中与 AI 对话时，AI 会自动调用工具获取文档：

**对话示例 1：**
```
用户：帮我看看 @State 装饰器怎么用
AI：(自动调用 search_arkts_docs 搜索，然后调用 get_arkts_doc 获取完整文档)
    @State 是用于组件内部状态管理的装饰器...
```

**对话示例 2：**
```
用户：Navigation 组件怎么实现页面跳转？
AI：(自动搜索并返回相关文档内容)
    Navigation 是路由容器组件，通过 NavPathStack 管理页面栈...
```

**对话示例 3：**
```
用户：ArkTS 不支持哪些 TypeScript 语法？
AI：(自动搜索语法约束相关文档)
    ArkTS 不支持以下 TypeScript 特性：
    - 不支持 any 和 unknown 类型
    - 不支持解构赋值
    ...
```

## 搜索算法

采用加权关键词匹配：
- 标题匹配：权重 10 (精确匹配额外 +5)
- objectId 匹配：权重 5
- 预览内容匹配：权重 2 (每次出现 +1，最多 +5)

## 许可证

MIT
