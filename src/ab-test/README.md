# Alert 提示

### 介绍

用于进行 AB 测试。[PC 端预览](/mobile.html#/ab-test)

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { ABTest } from 'cupshe-element';

const app = createApp();
app.use(ABTest);
```

## 代码演示

### Token 设置

当 `token` 属性为空时，默认展示自元素。当 `token` 属性不为空时，将检查 `localstorage` 中键为 `token` 的值是否与 `token` 的值相匹配，若匹配则展示子元素。

```html
<c-ab-test>
  <div>Test-0</div>
</c-ab-test>

<c-ab-test token="test-1">
  <div>Test-1</div>
</c-ab-test>

<c-ab-test token="test-2">
  <div>Test-2</div>
</c-ab-test>
```

### 展示策略

设置 `mode` 属性为 `negative`，将匹配规则转为：若 `token` 值与 `localstorage` 中对应值相同时，不展示子元素。

```html
<c-ab-test token="test-3" mode="negative">
  <div>Test-3</div>
</c-ab-test>
<c-ab-test token="test-4" mode="negative">
  <div>Test-4</div>
</c-ab-test>
```

## API

### Props

| 参数  | 说明                      | 类型     | 默认值     |
| ----- | ------------------------- | -------- | ---------- |
| token | 控制显示或隐藏的 token 值 | _string_ | -          |
| mode  | 策略，可选值为 `negative` | _string_ | `positive` |

### Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 子元素内容 |
