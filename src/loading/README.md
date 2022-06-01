# Loading 加载

### 介绍

加载图标，用于表示加载中的过渡状态。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[快速上手](#/quickstart)。

```js
import { createApp } from 'vue';
import { Loading } from 'cupshe-element';

const app = createApp();
app.use(Loading);
```

## 代码演示

### 基础用法

```html
<c-loading />
```

### 自定义颜色

通过 `color` 属性设置加载图标的颜色。

```html
<c-loading color="#1989fa" />
```

### 自定义大小

通过 `size` 属性设置加载图标的大小，默认单位为 `px`。

```html
<c-loading size="24" />

<c-loading size="24px" />
```

### 自定义文案颜色

通过 `color` 属性设置加载文案的颜色。

```html
<c-loading color="#0094ff" />
```

## API

### Props

| 参数  | 说明                          | 类型               | 默认值    |
| ----- | ----------------------------- | ------------------ | --------- |
| color | 颜色                          | _string_           | `#c9c9c9` |
| size  | 加载图标大小，默认单位为 `px` | _number \| string_ | `30px`    |
