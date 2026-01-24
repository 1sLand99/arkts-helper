# ArkTS API错误码



以下仅介绍本模块特有错误码，通用错误码请参考[通用错误码说明文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。若您的问题仍无法解决，请通过[在线提单](https://developer.huawei.com/consumer/cn/support/feedback/#/)提交问题，华为支持人员会及时处理。

#### 1020300001 系统服务异常

**错误信息**

System service exception.

**错误描述**

系统服务异常。

**可能原因**

无效空间ID，或者未知文件处理类型。

**处理步骤**

尝试重试操作或请通过[在线提单](https://developer.huawei.com/consumer/cn/support/feedback/#/)提交问题。

#### 1020300002 请求参数无效

**错误信息**

Parameter error.

**错误描述**

请求参数无效。

**可能原因**

必填参数为空或者参数类型错误。

**处理步骤**

请确认参数符合要求。

#### 1020400001 系统服务异常

**错误信息**

System service exception.

**错误描述**

系统服务异常。

**可能原因**

系统服务繁忙，或者网络异常。

**处理步骤**

尝试重试操作或请通过[在线提单](https://developer.huawei.com/consumer/cn/support/feedback/#/)提交问题。

#### 1020400002 请求参数无效

**错误信息**

Parameter error.

**错误描述**

请求参数无效。

**可能原因**

必填参数为空或者参数类型错误。

**处理步骤**

请确认参数符合要求。

#### 1020400003 工作空间无效

**错误信息**

Invalid workspace.

**错误描述**

工作空间无效。

**可能原因**

  1. 工作空间不存在。
  2. 工作空间已存在。
  3. 工作空间类型不支持。
  4. 工作空间数量已达限制。



**处理步骤**

请按照[WorkspaceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section1528202625516)确认工作空间信息符合要求。

#### 1020400006 SA进程异常退出，导致连接中断

**错误信息**

Session disconnected.

**错误描述**

SA进程异常退出，导致连接中断。

**可能原因**

当存在应用订阅了空间事件时，服务进程异常退出。

**处理步骤**

应用重新订阅空间相关事件。

#### 1020400007 企业空间未开启

**错误信息**

Enterprise workspace not enabled.

**错误描述**

企业空间未开启。

**可能原因**

企业管理员未使能企业空间功能。

**处理步骤**

企业管理员使能企业空间功能。
