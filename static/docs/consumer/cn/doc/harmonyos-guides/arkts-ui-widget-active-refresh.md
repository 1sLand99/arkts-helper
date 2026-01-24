# ArkTS卡片主动刷新

本文主要提供主动刷新的开发指导，刷新流程请参考[主动刷新概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-interaction-overview#主动刷新)。

#### 卡片提供方主动刷新卡片内容

卡片提供方可以通过[updateForm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formprovider#formproviderupdateform)接口进行主动刷新。推荐与卡片生命周期回调[onFormEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formextensionability#formextensionabilityonformevent)、[onUpdateForm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formextensionability#formextensionabilityonupdateform)、[onAddForm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formextensionability#formextensionabilityonaddform)接口搭配使用。

#### [h2]开发步骤

下面给出一个示例，实现如下功能：卡片添加至桌面后，点击卡片上的刷新按钮，刷新卡片信息。

  1. [创建卡片](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-creation)。

  2. 实现卡片布局，在卡片上添加一个刷新按钮，点击按钮后通过[postCardAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-postcardaction#postcardaction-1)接口，触发onFormEvent回调。
         
         // entry/src/main/ets/updatebymessage/pages/UpdateByMessageCard.ets
         let storageUpdateByMsg = new LocalStorage();
         
         @Entry(storageUpdateByMsg)
         @Component
         struct UpdateByMessageCard {
           // 创建两个待刷新的Text，Text初始内容分别为'Title default'、'Description default'。资源文件定义请参见下方步骤4
           @LocalStorageProp('title') title: ResourceStr = $r('app.string.default_title');
           @LocalStorageProp('detail') detail: ResourceStr = $r('app.string.DescriptionDefault');
         
           build() {
             Column() {
               Column() {
                 Text(this.title)
                   .fontColor('#FFFFFF')
                   .opacity(0.9)
                   .fontSize(14)
                   .margin({ top: '8%', left: '10%' })
                 Text(this.detail)
                   .fontColor('#FFFFFF')
                   .opacity(0.6)
                   .fontSize(12)
                   .margin({ top: '5%', left: '10%' })
               }.width('100%').height('50%')
               .alignItems(HorizontalAlign.Start)
         
               Row() {
                 // 添加一个按钮，资源文件定义请参见下方步骤4
                 Button() {
                   Text($r('app.string.update'))
                     .fontColor('#45A6F4')
                     .fontSize(12)
                 }
                 .width(120)
                 .height(32)
                 .margin({ top: '30%', bottom: '10%' })
                 .backgroundColor('#FFFFFF')
                 .borderRadius(16)
                 .onClick(() => {
                   postCardAction(this, {
                     action: 'message',
                     params: { msgTest: 'messageEvent' }
                   });
                 })
               }.width('100%').height('40%')
               .justifyContent(FlexAlign.Center)
             }
             .width('100%')
             .height('100%')
             .alignItems(HorizontalAlign.Start)
             .backgroundImage($r('app.media.CardEvent'))
             .backgroundImageSize(ImageSize.Cover)
           }
         }

  3. 在onFormEvent回调函数的实现中，通过updateForm接口刷新卡片数据。
         
         // entry/src/main/ets/entryformability/EntryFormAbility.ts
         import { formBindingData, FormExtensionAbility, formInfo, formProvider } from '@kit.FormKit';
         import { Configuration, Want } from '@kit.AbilityKit';
         import { BusinessError } from '@kit.BasicServicesKit';
         import { hilog } from '@kit.PerformanceAnalysisKit';
         
         const TAG: string = 'EntryFormAbility';
         const DOMAIN_NUMBER: number = 0xFF00;
         
         export default class EntryFormAbility extends FormExtensionAbility {
           onAddForm(want: Want): formBindingData.FormBindingData {
             hilog.info(DOMAIN_NUMBER, TAG, '[EntryFormAbility] onAddForm');
             hilog.info(DOMAIN_NUMBER, TAG, want.parameters?.[formInfo.FormParam.NAME_KEY] as string);
             let formData: Record<string, string> = { };
             return formBindingData.createFormBindingData(formData);
           }
         
           onCastToNormalForm(formId: string): void {
             hilog.info(DOMAIN_NUMBER, TAG, '[EntryFormAbility] onCastToNormalForm');
           }
         
           onUpdateForm(formId: string): void {
             hilog.info(DOMAIN_NUMBER, TAG, '[EntryFormAbility] onUpdateForm');
             // ...
           }
         
           onChangeFormVisibility(newStatus: Record<string, number>): void {
             hilog.info(DOMAIN_NUMBER, TAG, '[EntryFormAbility] onChangeFormVisibility');
           }
         
           onFormEvent(formId: string, message: string): void {
             hilog.info(DOMAIN_NUMBER, TAG, `FormAbility onFormEvent, formId = ${formId}, message: ${JSON.stringify(message)}`);
             class FormDataClass {
               // 定义Text刷新后的内容，分别为'Title Update'、'Description update success'
               title: string = 'Title Update.';
               detail: string = 'Description update success.';
             }
         
             let formData = new FormDataClass();
             let formInfo: formBindingData.FormBindingData = formBindingData.createFormBindingData(formData);
             formProvider.updateForm(formId, formInfo).then(() => {
               hilog.info(DOMAIN_NUMBER, TAG, 'FormAbility updateForm success.');
             }).catch((error: BusinessError) => {
               hilog.error(DOMAIN_NUMBER, TAG, `Operation updateForm failed. Cause: ${JSON.stringify(error)}`);
             });
           }
         
           onRemoveForm(formId: string): void {
             hilog.info(DOMAIN_NUMBER, TAG, '[EntryFormAbility] onRemoveForm');
           }
         
           onConfigurationUpdate(config: Configuration) {
             hilog.info(DOMAIN_NUMBER, TAG, '[EntryFormAbility] onConfigurationUpdate:' + JSON.stringify(config));
           }
         
           onAcquireFormState(want: Want): formInfo.FormState {
             return formInfo.FormState.READY;
           }
         }

  4. 资源文件如下。
         
         // entry/src/main/resources/zh_CN/element/string.json
         {
           "string": [
             // ...
             {
               "name": "default_title",
               "value": "Title default."
             },
             {
               "name": "DescriptionDefault",
               "value": "Description default."
             },
             {
               "name": "update",
               "value": "刷新"
             }
           ]
         }




#### [h2]运行结果


