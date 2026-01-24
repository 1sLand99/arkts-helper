# Interfaces (其他)



本模块首批接口从API version 6开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

#### PositionArea7+

表示图片指定区域内的数据。

**卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Image.Core

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
pixels | ArrayBuffer | 否 | 否 | 像素。仅支持BGRA_8888格式的图像像素数据。  
offset | number | 否 | 否 | 偏移量。单位：字节。  
stride | number | 否 | 否 | 跨距，内存中每行像素所占的空间。stride >= region.size.width*4。  
region | Region | 否 | 否 | 区域，按照区域读写。写入的区域宽度加X坐标不能大于原图的宽度，写入的区域高度加Y坐标不能大于原图的高度。  
  
#### ImageInfo

表示图片信息。

**系统能力：** SystemCapability.Multimedia.Image.Core

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
size6+ | Size | 否 | 否 |  图片大小。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
density9+ | number | 否 | 否 |  像素密度，单位为ppi。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
stride11+ | number | 否 | 否 |  跨距，内存中每行像素所占的空间。stride >= region.size.width*4 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
pixelFormat12+ | [PixelMapFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#pixelmapformat7) | 否 | 否 |  像素格式。 **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
alphaType12+ | [AlphaType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#alphatype9) | 否 | 否 |  透明度。 **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
mimeType12+ | string | 否 | 否 |  图片真实格式（MIME type）。 图片解码和图片编码支持格式的范围不同，请避免直接将解码得到的图片真实格式作为图片编码时PackingOption的format。 可以使用[ImageSource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagesource#属性)的supportedFormats属性和[ImagePacker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagepacker#属性)的supportedFormats属性查看解码和编码支持的格式范围。  
isHdr12+ | boolean | 否 | 否 | true表示图片为高动态范围（HDR），false表示图片非高动态范围（SDR）。对于[ImageSource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagesource)，代表源图片是否为HDR；对于[PixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap)，代表解码后的pixelmap是否为HDR。  
  
#### Size

表示图片尺寸。

**卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Image.Core

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
height | number | 否 | 否 | 输出图片的高，单位：像素。  
width | number | 否 | 否 | 输出图片的宽，单位：像素。  
  
#### AuxiliaryPictureInfo13+

表示辅助图图像信息。

**系统能力：** SystemCapability.Multimedia.Image.Core

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
auxiliaryPictureType | [AuxiliaryPictureType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#auxiliarypicturetype13) | 否 | 否 | 辅助图的图像类型。  
size | Size | 否 | 否 | 图片大小。  
rowStride | number | 否 | 否 | 行距。  
pixelFormat | [PixelMapFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#pixelmapformat7) | 否 | 否 | 像素格式。  
colorSpace | [colorSpaceManager.ColorSpaceManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-colorspacemanager#colorspacemanager) | 否 | 否 | 目标色彩空间。  
  
#### SourceOptions9+

ImageSource的初始化选项。

**卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Image.Core

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
sourceDensity | number | 否 | 否 |  图片资源像素密度，单位为ppi。 在解码参数DecodingOptions未设置desiredSize的前提下，当前参数SourceOptions.sourceDensity与DecodingOptions.fitDensity非零时将对解码输出的pixelmap进行缩放。 缩放后宽计算公式如下(高同理)：(width * fitDensity + (sourceDensity >> 1)) / sourceDensity。  
sourcePixelFormat | [PixelMapFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#pixelmapformat7) | 否 | 是 | 图片像素格式，默认值为UNKNOWN。  
sourceSize | Size | 否 | 是 | 图像像素大小，默认值为空。  
  
#### InitializationOptions8+

PixelMap的初始化选项。

**系统能力：** SystemCapability.Multimedia.Image.Core

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
alphaType9+ | [AlphaType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#alphatype9) | 否 | 是 |  透明度。默认值为IMAGE_ALPHA_TYPE_PREMUL。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
editable | boolean | 否 | 是 |  图像像素是否可被编辑。true表示可被编辑，false表示不可被编辑。设为false时，可提升图像的渲染和传输性能。默认值为false。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
srcPixelFormat12+ | [PixelMapFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#pixelmapformat7) | 否 | 是 | 传入的buffer数据的像素格式。默认值为BGRA_8888。  
pixelFormat | [PixelMapFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#pixelmapformat7) | 否 | 是 |  生成的pixelMap的像素格式。默认值为RGBA_8888。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
scaleMode9+ | [ScaleMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#scalemode9) | 否 | 是 |  缩放模式。默认值为0。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
size | Size | 否 | 否 |  创建图片大小。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
  
#### DecodingOptions7+

图像解码设置选项。

**系统能力：** SystemCapability.Multimedia.Image.ImageSource

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
sampleSize | number | 否 | 是 |  缩略图采样大小，默认值为1。当前只能取1。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
rotate | number | 否 | 是 |  旋转角度。默认值为0。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
editable | boolean | 否 | 是 |  true表示可编辑，false表示不可编辑。默认值为false。当取值为false时，图片不可二次编辑，如writePixels操作将失败。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
desiredSize | Size | 否 | 是 |  期望输出大小，必须为正整数，若与原尺寸比例不一致，则会进行拉伸/缩放到指定尺寸，默认为原始尺寸。 注意：若解码接口同时传入了desiredSize参数与desiredRegion参数，需进一步传入cropAndScaleStrategy参数指定缩放与裁剪的先后顺序，推荐设置CROP_FIRST。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
desiredRegion | Region | 否 | 是 |  解码图像中由Region指定的矩形区域，当原始图像很大而只需要解码图像的一部分时，可以设置该参数，有助于提升性能，默认为原始大小。 注意：若解码接口同时传入了desiredSize参数与desiredRegion参数，需进一步传入cropAndScaleStrategy参数指定缩放与裁剪的先后顺序，推荐设置CROP_FIRST。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
desiredPixelFormat | [PixelMapFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#pixelmapformat7) | 否 | 是 |  解码的像素格式。默认值为RGBA_8888。仅支持设置：RGBA_8888、BGRA_8888和RGB_565。有透明通道图片格式不支持设置RGB_565，如PNG、GIF、ICO和WEBP。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
index | number | 否 | 是 |  解码图片序号。默认值为0，表示第一张图片。当取值为N时，表示第N+1张图片。单帧图片场景中index取值只能为0，动图等多帧图片场景中index的取值范围为：0~（帧数-1）。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
fitDensity9+ | number | 否 | 是 |  图像像素密度，单位为ppi。默认值为0。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 **卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。  
desiredColorSpace11+ | [colorSpaceManager.ColorSpaceManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-colorspacemanager#colorspacemanager) | 否 | 是 | 目标色彩空间。默认值为UNKNOWN。  
desiredDynamicRange12+ | [DecodingDynamicRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#decodingdynamicrange12) | 否 | 是 |  目标动态范围，默认值为SDR。 通过[CreateIncrementalSource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-f#imagecreateincrementalsource9)创建的imagesource不支持设置此属性，默认解码为SDR内容。 如果平台不支持HDR，设置无效，默认解码为SDR内容。  
cropAndScaleStrategy18+ | [CropAndScaleStrategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#cropandscalestrategy18) | 否 | 是 |  解码参数如果同时设置desiredRegion与desiredSize，由此决定裁剪与缩放操作的先后策略。 仅支持设置：SCALE_FIRST、CROP_FIRST。  
  
#### DecodingOptionsForPicture13+

图像解码设置选项。

**系统能力：** SystemCapability.Multimedia.Image.ImageSource

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
desiredAuxiliaryPictures | Array<[AuxiliaryPictureType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#auxiliarypicturetype13)> | 否 | 否 |  设置AuxiliaryPicture类型，当未指定或传入空的Array时，系统会解码所有可用的AuxiliaryPicture类型。 如果不希望解码任何辅助图，可以直接解码为PixelMap，使用PixelMap创建仅包含主图的Picture。  
  
#### Region8+

表示区域信息。

**卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Image.Core

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
size7+ | Size | 否 | 否 | 区域大小。  
x7+ | number | 否 | 否 | 区域左上角横坐标。单位：像素。  
y7+ | number | 否 | 否 | 区域左上角纵坐标。单位：像素。  
  
#### PackingOption

表示图片编码选项。

**系统能力：** SystemCapability.Multimedia.Image.ImagePacker

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
format | string | 否 | 否 |  目标格式。 当前只支持"image/jpeg"、"image/webp"、"image/png"和"image/heic(或者image/heif)"12+、"image/sdr_astc_4x4"18+、"image/sdr_sut_superfast_4x4"18+（不同硬件设备支持情况不同）、"image/hdr_astc_4x4"20+。 **说明：** 因为jpeg不支持透明通道，若使用带透明通道的数据编码jpeg格式，透明色将变为黑色。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。  
quality | number | 否 | 否 |  1\. 编码中设定输出图片质量的参数，该参数仅对JPEG图片和HEIF图片生效。取值范围：[0, 100]。0质量最低，100质量最高，质量越高生成图片所占空间越大。WebP、PNG等图片均为无损编码。 2.sdr_astc_4x4编码中，可以设定输出图片质量的参数，可选参数：92、85。 3\. sut编码中，设定输出图片质量可选参数：92。 4\. （API version 20支持）hdr_astc_4x4编码中，可以设定输出图片质量的参数，可选参数：85。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。  
bufferSize9+ | number | 否 | 是 |  接收编码数据的缓冲区大小，单位为Byte。如果不设置大小，默认为25M。如果编码图片超过25M，需要指定大小。bufferSize需大于编码后图片大小。使用[packToFile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagepacker#packtofile11)不受此参数限制。 **元服务API：** 从API version 11开始，该接口支持在元服务中使用。  
desiredDynamicRange12+ | [PackingDynamicRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#packingdynamicrange12) | 否 | 是 | 目标动态范围。默认值为SDR。  
needsPackProperties12+ | boolean | 否 | 是 | 是否需要编码图片属性信息，例如EXIF。true表示需要，false表示不需要。默认值为false。  
  
#### PackingOptionsForSequence18+

描述动图编码参数的选项。

**系统能力：** SystemCapability.Multimedia.Image.ImagePacker

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
frameCount | number | 否 | 否 | GIF编码中指定的帧数。  
delayTimeList | Array<number> | 否 | 否 |  GIF编码中设定每帧输出图像的延迟时间，取值需大于0。 \- 单位为10毫秒。例如，取值为10时，实际单帧延迟是100毫秒。 \- 如果长度小于frameCount，不足的部分将使用delayTimeList中的最后一个值进行填充。  
disposalTypes | Array<number> | 否 | 是 |  GIF编码中设定每帧输出图像的帧过渡模式，如果长度小于frameCount，不足的部分将使用disposalTypes中的最后一个值进行填充，可取值如下： \- 0：不需要任何操作。 \- 1：保持图形不变。 \- 2：恢复背景色。 \- 3：恢复到之前的状态。  
loopCount | number | 否 | 是 |  表示在GIF编码中输出图片循环播放次数，取值范围为[0，65535]。 0表示无限循环；若无此字段，则表示不循环播放。  
  
#### ImagePropertyOptions11+

表示查询图片属性的索引。

**系统能力：** SystemCapability.Multimedia.Image.ImageSource

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
index | number | 否 | 是 | 图片序号。默认值为0。  
defaultValue | string | 否 | 是 | 默认属性值。默认值为空。  
  
#### Component9+

描述图像颜色分量。

**系统能力：** SystemCapability.Multimedia.Image.Core

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
componentType | [ComponentType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#componenttype9) | 是 | 否 | 组件类型。  
rowStride | number | 是 | 否 | 行距。读取相机预览流数据时，需要按stride进行读取，使用详情请参考[相机预览花屏解决方案](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-deal-stride-solution)。  
pixelStride | number | 是 | 否 | 像素间距。  
byteBuffer | ArrayBuffer | 是 | 否 | 组件缓冲区。  
  
#### HdrStaticMetadata12+

静态元数据值，[HdrMetadataKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#hdrmetadatakey12)中HDR_STATIC_METADATA关键字对应的值。

**系统能力：** SystemCapability.Multimedia.Image.Core

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
displayPrimariesX | Array<number> | 否 | 否 | 归一化后显示设备三基色的X坐标，数组的长度为3，以0.00002为单位，范围[0.0, 1.0]。  
displayPrimariesY | Array<number> | 否 | 否 | 归一化后显示设备三基色的Y坐标，数组的长度为3，以0.00002为单位，范围[0.0, 1.0]。  
whitePointX | number | 否 | 否 | 归一化后白点值的X坐标，以0.00002为单位，范围[0.0, 1.0]。  
whitePointY | number | 否 | 否 | 归一化后白点值的Y坐标，以0.00002为单位，范围[0.0, 1.0]。  
maxLuminance | number | 否 | 否 | 图像主监视器最大亮度。以1为单位，最大值为65535。  
minLuminance | number | 否 | 否 | 图像主监视器最小亮度。以0.0001为单位，最大值6.55535。  
maxContentLightLevel | number | 否 | 否 | 显示内容的最大亮度。以1为单位，最大值为65535。  
maxFrameAverageLightLevel | number | 否 | 否 | 显示内容的最大平均亮度，以1为单位，最大值为65535。  
  
#### GainmapChannel12+

Gainmap图单个通道的数据内容，参考ISO 21496-1。

**系统能力：** SystemCapability.Multimedia.Image.Core

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
gainmapMax | number | 否 | 否 | 增强图像的最大值，参考ISO 21496-1。  
gainmapMin | number | 否 | 否 | 增强图像的最小值，参考ISO 21496-1。  
gamma | number | 否 | 否 | gamma值，参考ISO 21496-1。  
baseOffset | number | 否 | 否 | 基础图的偏移，参考ISO 21496-1。  
alternateOffset | number | 否 | 否 | 提取的可选择图像偏移量，参考ISO 21496-1。  
  
#### HdrGainmapMetadata12+

Gainmap使用的元数据值，[HdrMetadataKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-e#hdrmetadatakey12)中HDR_GAINMAP_METADATA关键字对应的值，参考ISO 21496-1。

**系统能力：** SystemCapability.Multimedia.Image.Core

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
writerVersion | number | 否 | 否 | 元数据编写器使用的版本。  
miniVersion | number | 否 | 否 | 元数据解析需要理解的最小版本。  
gainmapChannelCount | number | 否 | 否 | Gainmap的颜色通道数，值为3时RGB通道的元数据值不同，值为1时各通道元数据值相同，参考ISO 21496-1。  
useBaseColorFlag | boolean | 否 | 否 | 是否使用基础图的色彩空间，参考ISO 21496-1。true表示是，false表示否。  
baseHeadroom | number | 否 | 否 | 基础图提亮比，参考ISO 21496-1。  
alternateHeadroom | number | 否 | 否 | 提取的可选择图像提亮比，参考ISO 21496-1。  
channels | Array<GainmapChannel> | 否 | 否 | 各通道的数据，长度为3，参考ISO 21496-1。  
  
#### GetImagePropertyOptions(deprecated)

表示查询图片属性的索引。



从API version 7开始支持，从API version 11开始废弃，建议使用ImagePropertyOptions代替。

**系统能力：** SystemCapability.Multimedia.Image.ImageSource

名称 | 类型 | 只读 | 可选 | 说明  
---|---|---|---|---  
index | number | 否 | 是 | 图片序号。默认值为0。  
defaultValue | string | 否 | 是 | 默认属性值。默认值为空。
