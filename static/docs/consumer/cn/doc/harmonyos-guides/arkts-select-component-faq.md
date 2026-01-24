# 按钮与选择组件常见问题

本文档介绍按钮与选择组件的常见问题并提供参考。

#### Slider组件滑块与滑轨是如何对齐的

Slider的滑块与滑轨显示样式[SliderStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-slider#sliderstyle枚举说明)有三种，其中SliderStyle.OutSet与SliderStyle.InSet存在滑块。Slider的滑动条进度为最小值时，滑块对齐方式如下：

SliderStyle.OutSet模式下，滑块的中心与滑轨的端点对齐，示例图如下：



SliderStyle.InSet模式下，滑块与滑轨的中心对齐，即距离端点滑轨高度的一半的位置，示例图如下：



**示例**
    
    
    @Entry
    @Component
    struct Index {
      build() {
        Column() {
          Slider({
            style: SliderStyle.OutSet
          })
            .blockSize({
              width: 20,
              height: 20
            })
            .trackThickness(50)
          Slider({
            style: SliderStyle.InSet
          })
            .blockSize({
              width: 20,
              height: 20
            })
            .trackThickness(50)
        }
        .height('100%')
        .width('100%')
      }
    }
