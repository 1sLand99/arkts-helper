# 订阅启动耗时事件（ArkTS）

#### 接口说明

API接口的具体使用说明（参数使用限制、具体取值范围等）请参考[@ohos.hiviewdfx.hiAppEvent (应用事件打点)ArkTS API文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-hiviewdfx-hiappevent)。

接口名 | 描述  
---|---  
addWatcher(watcher: Watcher): AppEventPackageHolder | 添加应用事件观察者，以添加对应用事件的订阅。  
removeWatcher(watcher: Watcher): void | 移除应用事件观察者，以移除对应用事件的订阅。  
  
#### 开发步骤

以实现对用户运行应用工程生成的启动耗时事件订阅为例，说明开发步骤。

  1. 编辑工程中的“entry > src > main > ets > entryability > EntryAbility.ets”文件，在onCreate函数中添加系统事件的订阅，示例代码如下：
         
         import { hiAppEvent, hilog } from '@kit.PerformanceAnalysisKit';
         
         hiAppEvent.addWatcher({
            // 开发者可以自定义观察者名称，系统会使用名称来标识不同的观察者
            name: "watcher",
            // 开发者可以订阅感兴趣的系统事件，此处是订阅了启动耗时事件
            appEventFilters: [
              {
                domain: hiAppEvent.domain.OS,
                names: [hiAppEvent.event.APP_LAUNCH]
              }
            ],
            // 开发者可以自行实现订阅回调函数，以便对订阅获取到的事件数据进行自定义处理
            onReceive: (domain: string, appEventGroups: Array<hiAppEvent.AppEventGroup>) => {
              hilog.info(0x0000, 'testTag', `HiAppEvent onReceive: domain=${domain}`);
              for (const eventGroup of appEventGroups) {
                // 开发者可以根据事件集合中的事件名称区分不同的系统事件
                hilog.info(0x0000, 'testTag', `HiAppEvent eventName=${eventGroup.name}`);
                for (const eventInfo of eventGroup.appEventInfos) {
                  // 开发者可以对事件集合中的事件数据进行自定义处理，此处是将事件数据打印在日志中
                  hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo=${JSON.stringify(eventInfo)}`);
                }
              }
            }
          });



     * 系统在监控应用启动时，依赖多个系统内部事件的记录。若这些事件在完成应用启动的5秒内全部上报，系统将立即生成APP_LAUNCH事件，并通过回调函数将事件内容传递给应用；若非关键事件存在缺失，系统将在5秒后根据实际接收到的事件生成APP_LAUNCH事件。
     * 单设备上的所有应用在24小时内最多可以累计上报2000次APP_LAUNCH事件。若在一次启动流程中，涉及多个同一依赖事件的触发（如在启动过程中调用多次[startAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#startability-1)），会导致实际可上报的启动耗时事件数量少于理论上限。
     * 启动完成前（如应用[首帧绘制](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-profiler-launch-case)前）终止启动不会生成APP_LAUNCH事件。
     * 在订阅APP_LAUNCH事件后，应用启动完成生成APP_LAUNCH事件触发回调的过程中，若应用出现退出或崩溃，onReceive回调接口可能不会被触发，从而导致事件回调处理失败。当应用重新启动时，回调函数会将之前未完成回调的事件内容传递给应用，导致onReceive回调**可能在一次应用启动过程中被多次调用** 。
     * **不建议在onReceive中执行任何关键业务逻辑** （例如移除事件观察者、资源释放等操作），否则可能导致业务代码重复执行、资源被多次释放，从而引发程序错误甚至应用崩溃。
     * 建议开发者将 onReceive 仅用于事件的接收和简单记录。

  2. 点击DevEco Studio界面中的运行按钮，运行应用工程，添加系统事件订阅者，退出应用，再次点击桌面应用图标，触发一次启动耗时事件。

  3. 应用工程再次启动可以在Log窗口看到对系统事件数据的处理日志：
         
         HiAppEvent onReceive: domain=OS
         HiAppEvent eventName=APP_LAUNCH
         HiAppEvent eventInfo={"domain":"OS","name":"APP_LAUNCH","eventType":4,"params":{"animation_finish_time":662,"bundle_name":"com.example.myapplication","bundle_version":"1.0.0","extend_time":0,"icon_input_time":1709367533224,"process_name":"com.example.myapplication","start_type":0,"time":1709367533901}}



