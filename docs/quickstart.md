# 快速上手

### 介绍

通过本章节你可以了解到 cupshe-element 的安装方法和基本使用姿势。

### 安装

```bash
# 通过 npm 安装
npm i cupshe-element -S

# 通过 yarn 安装
yarn add cupshe-element
```

## 引入组件

### 方式一. 通过 babel 插件按需引入组件

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 babel 插件，它会在编译过程中将 import 语句自动转换为按需引入的方式。

```bash
# 安装插件
npm i babel-plugin-import -D
```

在.babelrc 或 babel.config.js 中添加配置：

```json
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "cupshe-element",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
```

接着你可以在代码中直接引入 cupshe-element 组件，插件会自动将代码转化为按需引入的形式。

```js
// 原始代码
import { Button } from 'cupshe-element';

// 编译后代码
import Button from 'cupshe-element/es/button';
import 'cupshe-element/es/button/style';
```

### 方式二. 手动按需引入组件

在不使用插件的情况下，可以手动引入需要使用的组件和样式。

```js
// 引入组件
import Button from 'cupshe-element/es/button';
// 引入组件对应的样式，若组件没有样式文件，则无须引入
import 'cupshe-element/es/button/style';
```

### 方式三. 导入所有组件

cupshe-element 支持一次性导入所有组件，引入所有组件会增加代码包体积，因此不推荐这种做法。

```js
import { createApp } from 'vue';
import Cupshe from 'cupshe-element';
import 'cupshe-element/lib/index.css';

const app = createApp();
app.use(Cupshe);
```
