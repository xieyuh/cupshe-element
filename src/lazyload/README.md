# Lazyload 懒加载

### 介绍

当页面需要加载大量内容时，使用懒加载可以实现延迟加载页面可视区域外的内容，从而使页面加载更流畅。[PC 端预览](/mobile.html#/lazyload)

### 引入

`Lazyload` 是 `Vue` 指令，使用前需要对指令进行注册。

```js
import { createApp } from 'vue';
import { Lazyload } from 'cupshe-element';

const app = createApp();
app.use(Lazyload);

// 注册时可以配置额外的选项
app.use(Lazyload, {
  loading: 'assets/loading.gif', // 图片 loading 时的占位
  error: 'assets/error.gif', // 图片 error 时的占位
});
```

## 代码演示

### 基础用法

将 `v-lazy` 指令的值设置为你需要懒加载的图片。`v-lazy` 会在检测浏览器是否支持 `avif` 或 `webp` 格式，并自动添加相应的格式后缀，默认为 aws 云后缀，图片宽度默认为容器宽度的 1.5 倍，默认图像质量为 100%。

```html
<img v-lazy="image" />
```

```js
export default {
  setup() {
    return {
      // 转化为 https://cdn-review.cupshe.com/rms-admin/20220125/f43fa5acbf5e44839e81563235afdf8f.jpg?x-oss-process=image/format,avif/quality,q_100/resize,w_492
      image:
        'https://cdn-review.cupshe.com/rms-admin/20220125/f43fa5acbf5e44839e81563235afdf8f.jpg',
    };
  },
};
```

### webp 参数

`v-lazy` 指令可以手动配置 webp 图片参数，支持 `w` 图片宽度和 `q` 图像质量。使用时以对象形式传递给指令。

```html
<img v-lazy="{ src: image, q: 80, w: 600 }" />
```

```js
export default {
  setup() {
    return {
      image:
        'https://cdn-review.cupshe.com/rms-admin/20220125/f43fa5acbf5e44839e81563235afdf8f.jpg',
    };
  },
};
```

### 立即加载

`v-lazy` 指令使用 `now` 修饰符，可以立即加载所传递的图片，也不影响 webp 参数的设置。

```html
<img v-lazy.now="image" />
```

```js
export default {
  setup() {
    return {
      image:
        'https://cdn-review.cupshe.com/rms-admin/20220125/f43fa5acbf5e44839e81563235afdf8f.jpg',
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
