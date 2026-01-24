# 弹出框层级管理

ArkUI的弹出框节点都是直接挂载在根节点上，会根据层级从小到大依次挂载。根节点下，右边的弹出框节点会覆盖显示在左边的弹出框节点上，新创建的弹出框节点会根据层级大小插入到对应的位置，同一层级大小的弹窗节点按照创建的先后顺序进行挂载。

从API version 18开始，可以通过设置[levelOrder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-promptaction#basedialogoptions11)参数来管理弹出框的显示顺序，确保层级较高的弹出框覆盖在层级较低的弹出框之上，从而根据需要灵活控制各层弹出框的显示效果。

#### 使用约束

目前[openCustomDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-uicontext-custom-dialog)、[CustomDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-common-components-custom-dialog)、[AlertDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-fixes-style-dialog#警告弹窗-alertdialog)、[ActionSheet](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-fixes-style-dialog#列表选择弹窗-actionsheet)、[showDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-fixes-style-dialog#对话框-showdialog)支持通过levelOrder参数来管理弹出框的层次。



弹出框层级管理不支持子窗场景，即当showInSubWindow设置为true时，levelOrder参数设置无效。不支持动态刷新弹出框的显示顺序。

#### 创建不同层级的弹出框



详细变量定义请参考完整示例。

1.初始化一个弹出框内容区，内部包含一个Text组件。
    
    
    @Builder normalCustomDialog(index: number) {
      Column() {
        Text("我是普通弹窗" + index).fontSize(30)
      }.height(400).padding(5).justifyContent(FlexAlign.SpaceBetween)
    }

2.初始化另一个弹出框内容区，内部包含一个点击打开普通弹出框的按钮，点击事件中通过调用[UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext)中[getPromptAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#getpromptaction)方法获取[PromptAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction)对象，再通过该对象调用[openCustomDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction#opencustomdialog12)接口，并且设置层级为0的[levelOrder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-promptaction#basedialogoptions11)参数来创建普通层级弹出框。
    
    
    @Builder topCustomDialog() {
      Column() {
        Text("我是置顶弹窗").fontSize(30)
        Row({ space: 50 }) {
          Button('点我打开普通弹窗')
            .onClick(() => {
              this.getUIContext().getPromptAction().openCustomDialog({
                builder: () => {
                  this.normalCustomDialog(this.dialogIndex)
                },
                levelOrder: LevelOrder.clamp(0),
              })
                .catch((err: BusinessError) => {
                  console.error("openCustomDialog error: " + err.code + " " + err.message)
                })
              this.dialogIndex++
            })
        }
      }.height(200).padding(5).justifyContent(FlexAlign.SpaceBetween)
    }

3.通过调用[UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext)中[getPromptAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#getpromptaction)方法获取[PromptAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction)对象，再通过该对象调用[openCustomDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction#opencustomdialog12)接口，并且设置层级为100000的[levelOrder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-promptaction#basedialogoptions11)参数来创建最高层级弹出框。
    
    
    this.getUIContext().getPromptAction().openCustomDialog({
      builder: () => {
        this.topCustomDialog()
      },
      levelOrder: LevelOrder.clamp(100000)
    }).catch((err: BusinessError) => {
      console.error("openCustomDialog error: " + err.code + " " + err.message)
    })

#### 完整示例
    
    
    import { LevelOrder } from '@kit.ArkUI';
    import { BusinessError } from '@kit.BasicServicesKit';
    
    @Entry
    @Component
    struct Index {
      @StorageLink('dialogIndex') dialogIndex: number = 0
    
      @Builder normalCustomDialog(index: number) {
        Column() {
          Text('我是普通弹窗' + index).fontSize(30)
        }.height(400).padding(5).justifyContent(FlexAlign.SpaceBetween)
      }
    
      @Builder topCustomDialog() {
        Column() {
          Text('我是置顶弹窗').fontSize(30)
          Row({ space: 50 }) {
            Button('点我打开普通弹窗')
              .onClick(() => {
                this.getUIContext().getPromptAction().openCustomDialog({
                  builder: () => {
                    this.normalCustomDialog(this.dialogIndex)
                  },
                  levelOrder: LevelOrder.clamp(0),
                })
                  .catch((err: BusinessError) => {
                    console.error('openCustomDialog error: ' + err.code + '' + err.message)
                  })
                this.dialogIndex++
              })
          }
        }.height(200).padding(5).justifyContent(FlexAlign.SpaceBetween)
      }
    
      build() {
        Row() {
          Column({ space: 5 }) {
            Button('点击弹窗')
              .fontSize(20)
              .onClick(() => {
                this.getUIContext().getPromptAction().openCustomDialog({
                  builder: () => {
                    this.topCustomDialog()
                  },
                  levelOrder: LevelOrder.clamp(100000)
                }).catch((err: BusinessError) => {
                  console.error('openCustomDialog error: ' + err.code + '' + err.message)
                })
              })
          }.width('100%')
        }
      }
    }


