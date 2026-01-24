# ArkTS API错误码



以下仅介绍本模块特有错误码，通用错误码请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

#### 1010710001 图片尺寸不符合要求

**错误信息**

Maximum number of categories reached

**错误描述**

调用添加图标等接口时，传入的图标图片尺寸不符合要求。

**可能原因**

  * 未知原因





当前图标尺寸不做严格限制。

**处理步骤**

请更换传入的图片数据或通过[在线提单](https://developer.huawei.com/consumer/cn/support/feedback/#/)提交问题，华为支持人员会及时处理。

#### 1010710002 菜单项数量超出限制

**错误信息**

The number of menu items or submenu items exceeds the limit.

**错误描述**

调用添加图标等接口时，传入的菜单项数量超出限制。

**可能原因**

  * 传入的所有一级菜单项的数量超过限制上限20
  * 传入的某个一级菜单项的子菜单项的数量超过上限20



**处理步骤**

请重新设置一级菜单项和二级菜单项或通过[在线提单](https://developer.huawei.com/consumer/cn/support/feedback/#/)提交问题，华为支持人员会及时处理。

#### 1010710003 API调用频繁

**错误信息**

The API is being called too frequently.

**错误描述**

指定API调用频繁。

**可能原因**

  * addToStatusBar，removeFromStatusBar，updateStatusBarIcon，updateQuickOperationHeight，

updateStatusBarMenu方法调用间隔小于20ms。




**处理步骤**

请注意设置API的调用间隔或通过[在线提单](https://developer.huawei.com/consumer/cn/support/feedback/#/)提交问题，华为支持人员会及时处理。

#### 1010710004 无前台窗口不允许移除图标

**错误信息**

there are no foreground-windows, not allow to delete icon

**错误描述**

前台无应用窗口，不允许调用removeFromStatusBar移除状态栏图标。

**可能原因**

  * 应用退后台后调用了removeFromStatusBar方法。



**处理步骤**

请注意API的调用时机或通过[在线提单](https://developer.huawei.com/consumer/cn/support/feedback/#/)提交问题，华为支持人员会及时处理。

#### 1010720001 传入的一级菜单项数据不满足要求

**错误信息**

A menu item contains neither submenu nor menuAction.

**错误描述**

调用添加图标、更新菜单等接口时，传入的一级菜单项数据不满足要求。

**可能原因**

  * 当前传入的某个一级菜单项既不包含[menuAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/statusbar-extension-manager#section3627115133810)，也不包含[subMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/statusbar-extension-manager#section3627115133810)



**处理步骤**

请排查传入的一级菜单项的参数或通过[在线提单](https://developer.huawei.com/consumer/cn/support/feedback/#/)提交问题，华为支持人员会及时处理。
