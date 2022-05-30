# Lazyload 懒加载

### 介绍

当页面需要加载大量内容时，使用懒加载可以实现延迟加载页面可视区域外的内容，从而使页面加载更流畅。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

`Lazyload` 是 `Vue` 指令，使用前需要对指令进行注册。

```js
import { createApp } from 'vue';
import { Lazyload } from 'cupshe-element';

const app = createApp();
app.use(Lazyload);

// 注册时可以配置额外的选项
app.use(Lazyload, {
  loading: 'assets/loading.gif',
});
```

## 代码演示

### 基础用法

将 `v-lazy` 指令的值设置为你需要懒加载的图片。

```html
<img v-for="img in imageList" v-lazy="img" />
```

```js
export default {
  setup() {
    return {
      imageList: [
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
      ],
    };
  },
};
```

## API

### Options

| 参数         | 说明             | 类型       | 默认值     |
| ------------ | ---------------- | ---------- | ---------- |
| loading      | 加载时的图片     | _string_   | -          |
| error        | 错误时的图片     | _string_   | -          |
| preload      | 预加载高度的比例 | _string_   | -          |
| attempt      | 尝试次数         | _number_   | `3`        |
| listenEvents | 监听的事件       | _string[]_ | `scroll`等 |
| adapter      | 适配器           | _object_   | -          |
| filter       | 图片 URL 过滤    | _object_   | -          |

> 更多内容请参照：[vue-lazyload 官方文档](https://github.com/hilongjw/vue-lazyload)
