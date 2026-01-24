# 静态方式加载Native模块

在ES6(ECMAScript 6.0)模块设计中，使用import语法加载其他文件导出的内容是ECMA规范所定义的语法规则。为支持开发者使用该功能导入Native模块（so）导出的内容，ArkTS进行了相关适配，并提供了以下几种支持写法。

#### 直接导入

在Native模块的index.d.ts文件中导出，并在文件内直接导入。

#### [h2]具名导入
    
    
    // libentry.so对应的index.d.ts
    export const add: (a: number, b: number) => number;
    
    
    // test.ets
    import { add } from 'libentry.so'
    add(2, 3);

#### [h2]默认导入
    
    
    // libentry.so对应的index.d.ts
    export const add: (a: number, b: number) => number;
    
    
    // test.ets
    import entry from 'libentry.so'
    entry.add(2, 3);

#### [h2]命名空间导入
    
    
    // libentry.so对应的index.d.ts
    export const add: (a: number, b: number) => number;
    
    
    // test.ets
    import * as entry from 'libentry.so'
    entry.add(2, 3);

#### 间接导入

#### [h2]转为具名变量导出再导入
    
    
    // libentry.so对应的index.d.ts
    export const add: (a: number, b: number) => number;
    
    
    // test1.ets
    // 将libentry.so的API封装后导出
    import { add } from 'libentry.so';
    export { add };
    
    
    // test2.ets
    // 从中间模块导入API
    import { add } from './test1';
    const result = add(2, 3);

#### [h2]转为命名空间导出再导入
    
    
    // libentry.so对应的index.d.ts
    export const add: (a: number, b: number) => number;
    
    
    // test1.ets
    export * from 'libentry.so'
    
    
    // test2.ets
    import { add } from './test1'
    add(2, 3);



不支持Native模块导出和导入同时使用命名空间。

**反例：**
    
    
    // test1.ets
    export * from 'libentry.so'
    
    
    // test2.ets
    import * as add from './test1'
    // 无法获取add对象

#### 动态导入

#### [h2]直接导入
    
    
    // libentry.so对应的index.d.ts
    export const add: (a: number, b: number) => number;
    
    
    // test.ets
    import('libentry.so').then((entry:ESObject) => {
        entry.default.add(2, 3);
    })

#### [h2]间接导入
    
    
    // test1.ets
    import entry from 'libentry.so'
    export { entry }
    
    // test2.ets
    import('./test1').then((ns:ESObject) => {
        ns.entry.add(2, 3);
    })



不支持动态加载时，导出文件使用命名空间。

**反例：**
    
    
    // test1.ets
    export * from 'libentry.so'
    
    
    // test2.ets
    import('./test1').then((ns:ESObject) => {
        // 无法获取ns对象
    })
