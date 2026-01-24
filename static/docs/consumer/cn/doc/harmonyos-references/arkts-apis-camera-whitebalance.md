# Interface (WhiteBalance)

WhiteBalance 继承自 [WhiteBalanceQuery](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-whitebalancequery)。

提供了处理设备白平衡的相关功能，包括获取和设置白平衡模式以及白平衡值。



  * 本模块首批接口从API version 10开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
  * 本Interface首批接口从API version 20开始支持。



#### 导入模块
    
    
    import { camera } from '@kit.CameraKit';

#### setWhiteBalanceMode20+

setWhiteBalanceMode(mode: WhiteBalanceMode): void

设置白平衡模式。设置之前需要先检查设备是否支持指定的白平衡模式，具体方法请参考[isWhiteBalanceModeSupported](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-whitebalancequery#iswhitebalancemodesupported20)。

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**参数：**

参数名 | 类型 | 必填 | 说明  
---|---|---|---  
mode | [WhiteBalanceMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-e#whitebalancemode20) | 是 | 白平衡模式。  
  
**错误码：**

以下错误码的详细介绍请参见[Camera错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-camera)。

错误码ID | 错误信息  
---|---  
7400101 | Parameter missing or parameter type incorrect.  
7400103 | Session not config.  
  
**示例：**
    
    
    import { BusinessError } from '@kit.BasicServicesKit';
    
    function setWhiteBalanceMode(session: camera.PhotoSession | camera.VideoSession): void {
      try {
        session.setWhiteBalanceMode(camera.WhiteBalanceMode.DAYLIGHT);
      } catch (error) {
        let err = error as BusinessError;
        console.error(`The setWhiteBalanceMode call failed. error code: ${err.code}`);
      }
    }

#### getWhiteBalanceMode20+

getWhiteBalanceMode(): WhiteBalanceMode

获取当前白平衡模式。

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**返回值：**

类型 | 说明  
---|---  
[WhiteBalanceMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-e#whitebalancemode20) | 获取当前白平衡模式。若接口调用失败，返回undefined。  
  
**错误码：**

以下错误码的详细介绍请参见[Camera错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-camera)。

错误码ID | 错误信息  
---|---  
7400103 | Session not config.  
  
**示例：**
    
    
    import { BusinessError } from '@kit.BasicServicesKit';
    
    function getWhiteBalanceMode(session: camera.PhotoSession | camera.VideoSession): camera.WhiteBalanceMode | undefined {
      let whiteBalanceMode: camera.WhiteBalanceMode | undefined = undefined;
      try {
        whiteBalanceMode = session.getWhiteBalanceMode();
      } catch (error) {
        let err = error as BusinessError;
        console.error(`The getWhiteBalanceMode call failed. error code: ${err.code}`);
      }
      return whiteBalanceMode;
    }

#### setWhiteBalance20+

setWhiteBalance(whiteBalance: number): void

设置手动白平衡值。

设置之前需要先检查设备支持的白平衡值范围，具体方法请参考[getWhiteBalanceRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-whitebalancequery#getwhitebalancerange20)。

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**参数：**

参数名 | 类型 | 必填 | 说明  
---|---|---|---  
whiteBalance | number | 是 | 设置手动白平衡值。  
  
**错误码：**

以下错误码的详细介绍请参见[Camera错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-camera)。

错误码ID | 错误信息  
---|---  
7400101 | Parameter missing or parameter type incorrect.  
7400103 | Session not config.  
  
**示例：**
    
    
    import { BusinessError } from '@kit.BasicServicesKit';
    
    function setWhiteBalance(session: camera.PhotoSession | camera.VideoSession): void {
      try {
        let whiteBalance: number = 1000;
        session.setWhiteBalance(whiteBalance);
      } catch (error) {
        let err = error as BusinessError;
        console.error(`The setWhiteBalance call failed. error code: ${err.code}`);
      }
    }

#### getWhiteBalance20+

getWhiteBalance(): number

获取当前手动白平衡的值。

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**返回值：**

类型 | 说明  
---|---  
number | 返回当前白平衡值。  
  
**错误码：**

以下错误码的详细介绍请参见[Camera错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-camera)。

错误码ID | 错误信息  
---|---  
7400103 | Session not config.  
  
**示例：**
    
    
    import { BusinessError } from '@kit.BasicServicesKit';
    
    function getWhiteBalance(session: camera.PhotoSession | camera.VideoSession): number {
      let whiteBalance: number = 0;
      try {
        whiteBalance = session.getWhiteBalance();
      } catch (error) {
        let err = error as BusinessError;
        console.error(`The getWhiteBalance call failed. error code: ${err.code}`);
      }
      return whiteBalance;
    }
