# 弹出框焦点策略

ArkUI的弹出框焦点策略可以设定是否中断用户当前操作，并聚焦到新弹出的弹出框。若设定弹出框不获取焦点，则新弹出时不会中断用户当前操作，例如，当用户正在文本框中输入内容时，新弹出的弹出框不会关闭软键盘，焦点仍保留在文本框中。

从API version 19开始，可以通过设置[focusable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-promptaction#basedialogoptions11)参数来管理弹出框是否获取焦点。

#### 使用约束

[openCustomDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-uicontext-custom-dialog)和[CustomDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-common-components-custom-dialog)支持通过focusable参数来管理弹出框是否获取焦点。



只有弹出覆盖在当前窗口之上的弹出框才可以获取焦点。

#### 创建不获取焦点的弹出框



详细变量定义请参考完整示例。

  1. 初始化一个弹出框内容区域，内含一个Text组件。
         
         private message = '弹窗'
         @State dialogIdIndex: number = 0
         @Builder customDialogComponent() {
           Column({ space: 5 }) {
             Text(this.message + this.dialogIdIndex)
               .fontSize(30)
           }
           .height(200)
           .padding(5)
           .justifyContent(FlexAlign.SpaceBetween)
         }

  2. 创建一个TextInput组件，在onChange事件函数中通过调用[UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext)中的[getPromptAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#getpromptaction)方法获取[PromptAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction)对象，再通过该对象调用[openCustomDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-promptaction#opencustomdialog12)接口，并设置[focusable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-promptaction#basedialogoptions11)参数为false，以创建弹出框。
         
         TextInput()
           .onChange(() => {
             this.dialogIdIndex++
             this.getUIContext().getPromptAction().openCustomDialog({
               builder: () => {
                 this.customDialogComponent()
               },
               focusable: false
             }).then((dialogId: number) => {
               setTimeout(() => {
                 this.getUIContext().getPromptAction().closeCustomDialog(dialogId);
               }, 3000)
             })
           })




#### 完整示例

当用户正在文本框中输入内容时，新弹出的弹出框不会关闭软键盘，焦点仍保留在文本框中。
    
    
    @Entry
    @Component
    export struct Index {
      private message = '弹窗';
      @State dialogIdIndex: number = 0;
    
      @Builder
      customDialogComponent() {
        Column({ space: 5 }) {
          Text(this.message + this.dialogIdIndex)
            .fontSize(30)
        }
        .height(200)
        .padding(5)
        .justifyContent(FlexAlign.SpaceBetween)
      }
    
      build() {
        Column({ space: 5 }) {
          TextInput()
            .onChange(() => {
              this.dialogIdIndex++;
              this.getUIContext().getPromptAction().openCustomDialog({
                builder: () => {
                  this.customDialogComponent()
                },
                focusable: false
              }).then((dialogId: number) => {
                setTimeout(() => {
                  this.getUIContext().getPromptAction().closeCustomDialog(dialogId);
                }, 3000)
              })
            })
        }.width('100%')
      }
    }


