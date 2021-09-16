# Alert 提示

### 介绍

用于显示提示消息。[PC 端预览](/mobile.html#/alert)

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Alert } from 'cupshe-element';

const app = createApp();
app.use(Alert);
```

## 代码演示

### 提示类型

提示支持 `success`、`error`、`info`、`default` 四种类型，默认为 `default`。

```html
<c-alert type="success"> Global success prompt. </c-alert>
<c-alert type="error"> Incorrect email or password. </c-alert>
<c-alert type="info"> Global success prompt. </c-alert>
<c-alert type="default"> Global success prompt. </c-alert>
```

### 提示标题

通过 `title` 属性设置提示标题。

```html
<c-alert type="success" title="Title">
  Multi-line successful copywriting multi-line successful copywriting.
</c-alert>
```

## API

### Props

| 参数  | 说明                                    | 类型     | 默认值    |
| ----- | --------------------------------------- | -------- | --------- |
| type  | 类型，可选值为 `error` `success` `info` | _string_ | `default` |
| title | 提示标题                                | _string_ | -         |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 提示内容 |
| title   | 提示标题 |
