# ArkTS Helper MCP

ArkTS/ArkUI 开发助手 MCP Server，为 AI 编程助手（Claude Code、Cursor、Windsurf 等）提供文档检索和华为官方智能问答能力。

## 功能概览

| 工具 | 功能 | 说明 |
|------|------|------|
| `find_docs` | 文档搜索 | 关键词搜索 1000+ 篇 ArkTS/ArkUI 官方文档 |
| `read_doc` | 文档阅读 | 根据 objectId 获取完整 Markdown 内容 |
| `list_doc_topics` | 分类浏览 | 列出所有文档主题及数量 |
| `ask_ai` | AI 问答 | 调用华为官方智能问答，获取整合回答 |
| `ask_ai_batch` | 批量问答 | 并行处理多个问题，大幅节省时间 |
| `read_more` | 读取全文 | 获取被截断的完整回答 |
| `set_ai_auth` | 设置凭证 | 配置登录态 Cookie，突破匿名次数限制 |

## 快速开始

### 安装

```bash
git clone https://github.com/LongLiveY96/arkts-helper-mcp.git
cd arkts-helper-mcp
npm install
npm run build
```

### 配置 AI 助手

**Claude Code / Cursor / Windsurf：**

```json
{
  "mcpServers": {
    "arkts-helper": {
      "command": "node",
      "args": ["/path/to/arkts-helper-mcp/dist/index.js"]
    }
  }
}
```

### HTTP 模式（可选）

```bash
npm run start:http
```

端点：
- `GET /health` — 健康检查
- `GET /search?q=关键词` — 搜索文档
- `GET /doc/:objectId` — 获取文档
- `GET /topics` — 列出主题

## 使用示例

配置完成后，AI 助手会自动调用工具：

```
用户：@State 和 @Prop 有什么区别？
AI：→ find_docs({ query: "State Prop 装饰器" })
    → read_doc({ objectId: "arkts-state" })
    @State 是组件私有状态，@Prop 是单向数据传递...
```

```
用户：Navigation 怎么实现页面跳转并传参？
AI：→ ask_ai({ query: "Navigation 页面跳转传参" })
    Navigation 是路由容器组件，通过 NavPathStack 管理页面栈...
```

```
用户：同时告诉我 @State、@Prop、@Link 的用法
AI：→ ask_ai_batch({ queries: ["@State用法", "@Prop用法", "@Link用法"] })
    (并行查询，约 60 秒返回全部结果)
```

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `ARKTS_DOCS_DIR` | 文档目录路径 | `static/docs` |
| `ARKTS_MCP_PORT` | HTTP 服务端口 | `3456` |
| `ARKTS_QA_TIMEOUT_MS` | AI 问答超时（毫秒） | `120000` |
| `ARKTS_MCP_CONFIG_DIR` | Cookie 配置目录 | `~/.config/arkts-mcp` |

## AI 问答认证（可选）

匿名模式有次数限制。配置登录态 Cookie 可解除限制：

1. 登录 [developer.huawei.com](https://developer.huawei.com)
2. F12 → Network → 使用智能问答提问
3. 找到 `dialog/submission` 请求，复制 Cookie
4. 通过工具设置：`set_ai_auth({ cookie: "你的Cookie" })`

Cookie 保存在 `~/.config/arkts-mcp/config.json`，不会进入代码仓库。

## 许可证

MIT
