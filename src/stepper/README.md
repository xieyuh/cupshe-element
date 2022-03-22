# Stepper 步进器

### 介绍

步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。[PC 端预览](/mobile.html#/stepper)

### 引入

通过以下方式来全局注册组件。

```js
import { createApp } from 'vue';
import { Stepper } from 'cupshe-element';

const app = createApp();
app.use(Stepper);
```

## 代码演示

### 基础用法

通过 `v-model` 绑定输入值，可以通过 `change` 事件监听到输入值的变化。

```html
<c-stepper v-model="value" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(1);
    return { value };
  },
};
```

### 步长设置

通过 `step` 属性设置每次点击增加或减少按钮时变化的值，默认为 `1`。

```html
<c-stepper v-model="value" step="2" />
```

### 限制输入范围

通过 `min` 和 `max` 属性限制输入值的范围。

```html
<c-stepper v-model="value" min="5" max="8" />
```

### 禁用状态

通过设置 `disabled` 属性来禁用步进器，禁用状态下无法点击按钮或修改输入框。

```html
<c-stepper v-model="value" disabled />
```

### 禁用输入框

通过设置 `disable-input` 属性来禁用输入框，此时按钮仍然可以点击。

```html
<c-stepper v-model="value" disable-input />
```

### 异步变更

通过 `before-change` 属性可以在

```html
<c-stepper v-model="value" :before-change="beforeChange" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(1);

    const beforeChange = (value) =>
      new Promise((resolve) => {
        setTimeout(() => {
          // 在 resolve 函数中返回 true 或 false
          resolve(true);
        }, 500);
      });

    return {
      value,
      beforeChange,
    };
  },
};
```

## API

### Props

| 参数          | 说明                                                              | 类型                            | 默认值  |
| ------------- | ----------------------------------------------------------------- | ------------------------------- | ------- |
| v-model       | 当前输入的值                                                      | _number \| string_              | -       |
| min           | 最小值                                                            | _number \| string_              | `1`     |
| max           | 最大值                                                            | _number \| string_              | -       |
| default-value | 初始值，当 v-model 为空时生效                                     | _number \| string_              | `1`     |
| step          | 步长，每次点击时改变的值                                          | _number \| string_              | `1`     |
| name          | 标识符，可以在 `change` 事件回调参数中获取                        | _number \| string_              | -       |
| input-width   | 输入框宽度，默认单位为 `px`                                       | _number \| string_              | `32px`  |
| button-size   | 按钮大小以及输入框高度，默认单位为 `px`                           | _number \| string_              | `28px`  |
| placeholder   | 输入框占位提示文字                                                | _string_                        | -       |
| disabled      | 是否禁用步进器                                                    | _boolean_                       | `false` |
| disable-plus  | 是否禁用增加按钮                                                  | _boolean_                       | `false` |
| disable-minus | 是否禁用减少按钮                                                  | _boolean_                       | `false` |
| disable-input | 是否禁用输入框                                                    | _boolean_                       | `false` |
| before-change | 输入值变化前的回调函数，返回 `false` 可阻止输入，支持返回 Promise | _(value) => boolean \| Promise_ | `false` |

### Events

| 事件名    | 说明                     | 回调参数                                  |
| --------- | ------------------------ | ----------------------------------------- |
| change    | 当绑定值变化时触发的事件 | _value: string, detail: { name: string }_ |
| overlimit | 点击不可用的按钮时触发   | -                                         |
| plus      | 点击增加按钮时触发       | -                                         |
| minus     | 点击减少按钮时触发       | -                                         |
| focus     | 输入框聚焦时触发         | _event: Event_                            |
| blur      | 输入框失焦时触发         | _event: Event_                            |

## 常见问题

### 为什么 value 有时候会变成 string 类型？

这是因为用户输入过程中可能出现小数点或空值，比如 `1.`，这种情况下组件会抛出字符串类型。

如果希望 value 保持 number 类型，可以在 v-model 上添加 `number` 修饰符：

```html
<c-stepper v-model.number="value" />
```
