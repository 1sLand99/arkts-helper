# ArkTS Helper

HarmonyOS ArkTS 开发助手 MCP Server，为 AI 编程助手提供文档检索和智能问答能力。

## 功能特性

### 📂 本地文档
| 工具 | 功能 |
|------|------|
| `find_docs` | 关键词搜索 ArkTS 文档 |
| `read_doc` | 读取完整文档内容 |
| `list_doc_topics` | 列出文档分类 |

### 🤖 AI 问答
| 工具 | 功能 |
|------|------|
| `ask_ai` | 调用华为官方智能问答 |
| `ask_ai_batch` | 批量问答（并行处理） |
| `read_more` | 读取被截断的完整回答 |
| `set_ai_auth` | 设置登录凭证 |

## 安装

```bash
cd arkts-mcp-server
npm install
npm run build
```

## 使用方式

### 方式一：Claude Code / Gemini 配置 (推荐)

在 AI 助手配置文件中添加 MCP 服务器：

```json
{
  "mcpServers": {
    "arkts-docs": {
      "command": "node",
      "args": ["/path/to/arkts-mcp-server/dist/index.js"],
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

## 工具详解

### find_docs

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
| "@State 和 @Prop 有什么区别？" | `find_docs({ query: "State Prop 装饰器" })` |
| "怎么实现页面跳转？" | `find_docs({ query: "Navigation 路由 页面跳转" })` |
| "List 组件怎么用？" | `find_docs({ query: "List 列表组件" })` |
| "动画怎么实现？" | `find_docs({ query: "animateTo 属性动画" })` |

**搜索技巧：**
- 使用中文关键词效果更好
- 可以组合多个关键词，用空格分隔
- 搜索组件时加上"组件"后缀
- 搜索装饰器时可以带 @ 符号

### read_doc

读取 ArkTS 文档的完整内容。

**使用流程：**
1. 先调用 `find_docs` 搜索相关文档
2. 从搜索结果中选择最相关的文档
3. 使用该文档的 `objectId` 调用此工具读取完整内容

**参数：**
- `objectId` (必填): 文档的唯一标识符，从搜索结果中获取

**示例：**
```
1. 调用：find_docs({ query: "State装饰器" })
2. 从结果中找到 objectId: "arkts-state"
3. 调用：read_doc({ objectId: "arkts-state" })
```

### list_doc_topics

列出 ArkTS 文档的所有主题分类。

**使用场景：**
- 了解文档库的整体结构
- 查看有哪些主题分类
- 统计各分类的文档数量

### ask_ai

向华为开发者官方智能问答助手提问。

**使用场景：**
- 复杂的开发问题（整合了官方文档 + 社区经验）
- 需要代码示例和最佳实践
- 错误排查和问题解决
- 获取最新的开发建议

**与 find_docs 的区别：**
- `find_docs`：搜索本地文档，返回原始文档内容
- `ask_ai`：调用华为官方 AI，返回整合后的智能回答

**参数：**
- `query` (必填): 要问的问题，使用中文效果更好
- `newSession` (可选): 是否开启新会话，默认 false

**示例：**
```
ask_ai({ query: "Navigation 怎么实现页面跳转并传参" })
```

### ask_ai_batch

批量向华为智能问答助手提问（并行处理）。

**使用场景：**
- 一次调用处理多个相关问题
- 服务器端并行执行，大幅节省时间
- 适用于需要查询多个不同主题的场景

**参数：**
- `queries` (必填): 问题数组，最多 10 个
- `newSession` (可选): 是否开启新会话

**性能优势：**
```
单个问题响应时间 60 秒：
- 串行调用 3 个问题：60s + 60s + 60s = 180 秒
- 批量并行调用：约 60 秒
```

### read_more

读取被截断的完整回答内容。

**使用场景：**
当 `ask_ai` 返回的内容被截断时（超过 1500 字符），使用此工具读取完整内容。

**使用流程：**
1. 调用 `ask_ai` 获取回答
2. 如果回答中包含 "内容过长已缓存" 的提示和 resourceId
3. 使用该 resourceId 调用此工具读取完整内容

**参数：**
- `resourceId` (必填): 资源 ID，从 ask_ai 的回答中获取

**示例：**
```
read_more({ resourceId: "qa-result-1-1706123456789" })
```

### set_ai_auth

设置 AI 问答的登录凭证，用于突破匿名态的次数限制。

**如何获取 Cookie：**
1. 打开浏览器，登录 developer.huawei.com
2. 打开开发者工具 (F12) → Network 标签
3. 在页面上使用智能问答功能提问
4. 找到 dialog/submission 请求
5. 复制 Request Headers 中的 Cookie 值

**示例：**
```
set_ai_auth({ cookie: "your_full_cookie_value_here" })
```

## AI 助手使用效果

配置完成后，在任何工作目录中与 AI 对话时，AI 会自动调用工具获取文档：

**对话示例 1：**
```
用户：帮我看看 @State 装饰器怎么用
AI：(自动调用 find_docs 搜索，然后调用 read_doc 获取完整文档)
    @State 是用于组件内部状态管理的装饰器...
```

**对话示例 2：**
```
用户：Navigation 组件怎么实现页面跳转？详细介绍一下
AI：(自动调用 ask_ai 获取智能回答，如果内容过长会自动调用 read_more)
    Navigation 是路由容器组件，通过 NavPathStack 管理页面栈...
```

**对话示例 3：**
```
用户：同时告诉我 @State、@Prop、@Link 的用法
AI：(自动调用 ask_ai_batch 批量查询，并行获取答案)
    1. @State：组件私有状态...
    2. @Prop：单向数据传递...
    3. @Link：双向数据同步...
```

## 搜索算法

采用加权关键词匹配：
- 标题匹配：权重 10 (精确匹配额外 +5)
- objectId 匹配：权重 5
- 预览内容匹配：权重 2 (每次出现 +1，最多 +5)

## 许可证

MIT
