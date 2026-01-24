# ArkTS MCP Server 项目总结

## 项目概述

**arkts-docs-mcp-server** 是一个 MCP（Model Context Protocol）服务器，为 AI 编程助手（如 Claude Code）提供 HarmonyOS ArkTS 官方文档的检索能力。

---

## 项目结构

```
arkts-mcp-server/
├── src/
│   ├── index.ts           # 主入口，定义 MCP 工具和处理逻辑
│   ├── search.ts          # 文档搜索引擎
│   ├── huawei-qa.ts       # 华为智能问答（匿名模式）
│   ├── huawei-qa-auth.ts  # 华为智能问答（登录态）+ Cookie 管理
│   └── http-server.ts     # HTTP 服务模式
├── dist/                  # 编译输出目录
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
└── README.md              # 项目说明
```

---

## 实现原理

### 1. 核心架构

```
┌─────────────────┐     MCP Protocol      ┌──────────────────────┐
│   Claude Code   │ ◄──────────────────► │  arkts-mcp-server    │
│   (AI 助手)      │      stdio/HTTP       │                      │
└─────────────────┘                        └──────────┬───────────┘
                                                      │
                                    ┌─────────────────┼─────────────────┐
                                    ▼                 ▼                 ▼
                            ┌────────────┐   ┌────────────┐   ┌────────────┐
                            │ 本地文档索引 │   │ 华为 QA API │   │ 华为 QA API │
                            │   (JSON)    │   │  (匿名态)   │   │  (登录态)   │
                            └────────────┘   └────────────┘   └────────────┘
```

### 2. 提供的工具 (Tools)

| 工具名 | 功能 | 数据来源 |
|--------|------|----------|
| `search_arkts_docs` | 关键词搜索文档 | 本地 `arkts_index_share.json` |
| `get_arkts_doc` | 获取完整文档内容 | 本地 Markdown 文件 |
| `list_arkts_topics` | 列出文档分类 | 本地索引 |
| `ask_huawei_qa` | 调用华为官方 AI 问答 | 华为开发者 API |
| `set_huawei_cookie` | 设置登录凭证 | 本地配置文件 |

### 3. 文档搜索原理 (`search.ts`)

#### 索引加载
- 启动时加载 `arkts_index_share.json` 到内存
- 索引包含：标题、预览、URL、objectId、文件路径等

#### 搜索算法（加权关键词匹配）
```
标题匹配：权重 10（精确匹配额外 +5）
objectId 匹配：权重 5
预览内容匹配：权重 2（每次出现 +1，最多 +5）
```

### 4. 华为智能问答原理

#### 匿名模式 (`huawei-qa.ts`)
```
1. 生成随机 anonymousId（32位十六进制）
2. 调用 /v1/public/dialog/id 创建会话，获取 dialogId
3. 调用 /v1/public/dialog/submission 发送问题
4. 解析 SSE 流式响应，提取答案和参考链接
```

**特点**：每次调用都是独立会话，无状态设计

#### 登录态模式 (`huawei-qa-auth.ts`)
```
1. 从配置文件读取 Cookie
2. 调用 /v1/dialog/id 创建会话（带 Cookie）
3. 调用 /v1/dialog/submission 发送问题（带 Cookie）
4. 解析响应
```

**特点**：使用登录凭证，无次数限制

### 5. 调用流程

```
ask_huawei_qa 被调用
        │
        ▼
┌─────────────────────┐
│  检查配置文件中是否   │
│  存在 cookie 字段    │
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    │             │
有 cookie    无 cookie
    │             │
    ▼             ▼
登录态模式    匿名模式
```

---

## 配置文件

### 位置
- Windows: `%APPDATA%\arkts-mcp\config.json`
- 完整路径示例: `C:\Users\<用户名>\AppData\Roaming\arkts-mcp\config.json`

### 格式

#### 匿名模式（无需配置或空文件）
```json
{}
```

#### 登录态模式
```json
{
  "cookie": "完整的Cookie字符串",
  "lastUpdated": "2026-01-23T00:00:00.000Z"
}
```

### Cookie 格式说明
Cookie 是一个字符串，包含多个由分号分隔的键值对：
```
key1=value1; key2=value2; key3=value3; ...
```

---

## 当 ask_huawei_qa 失效时的处理

### 常见失效情况及解决方案

#### 1. 匿名模式次数限制
**症状**：返回错误提示，提示次数已用完

**解决方案**：切换到登录态模式
1. 登录 https://developer.huawei.com
2. 打开开发者工具 (F12) → Network 标签
3. 在页面上使用智能问答功能提问
4. 找到 `dialog/submission` 请求
5. 复制 Request Headers 中的 `Cookie` 值
6. 创建或编辑配置文件：
   ```json
   {
     "cookie": "复制的完整Cookie值"
   }
   ```

#### 2. Cookie 过期
**症状**：返回 401/403 错误，或提示认证失败

**解决方案**：
1. 重新登录华为开发者网站
2. 按照上述步骤获取新的 Cookie
3. 更新配置文件中的 cookie 值

#### 3. 网络问题
**症状**：连接超时或网络错误

**解决方案**：
1. 检查网络连接
2. 确认能够访问 https://developer.huawei.com
3. 检查是否有代理或防火墙阻止

#### 4. API 变更
**症状**：返回格式异常或未知错误

**解决方案**：
1. 使用 `search_arkts_docs` 作为备选方案搜索本地文档
2. 检查项目是否有更新版本
3. 查看华为开发者论坛了解 API 变更情况

### 备选方案

当 `ask_huawei_qa` 完全不可用时，可以使用本地文档搜索：

```
1. 调用 search_arkts_docs({ query: "关键词" }) 搜索相关文档
2. 从结果中找到相关的 objectId
3. 调用 get_arkts_doc({ objectId: "xxx" }) 获取完整文档
```

---

## 运行模式

### stdio 模式（默认，供 Claude Code 使用）
```bash
npm run build
npm run start
```

### HTTP 模式（REST API）
```bash
npm run start:http
```

API 端点：
- `GET /health` - 健康检查
- `GET /search?q=关键词` - 搜索文档
- `GET /doc/:objectId` - 获取完整文档
- `GET /topics` - 列出所有主题

### 开发模式
```bash
npm run dev        # stdio 模式
npm run dev:http   # HTTP 模式
```

---

## MCP 日志查看

日志通过 `console.error()` 输出到运行 MCP 服务器的终端。

常见日志信息：
- `[arkts-mcp] Server started in stdio mode` - 服务器启动
- `[arkts-mcp] Using anonymous mode for Huawei QA` - 使用匿名模式
- `[arkts-mcp] Using authenticated mode for Huawei QA` - 使用登录态
- `[huawei-qa] Creating new dialog...` - 创建会话
- `[huawei-qa] Asking: ...` - 发送问题

---

## Claude Code 配置

在 `~/.claude/settings.json` 或项目级 `.claude/settings.local.json` 中添加：

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

---

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `ARKTS_DOCS_DIR` | 文档目录路径 | 项目 `static/docs` 目录 |
| `ARKTS_MCP_PORT` | HTTP 服务端口 | 3456 |
