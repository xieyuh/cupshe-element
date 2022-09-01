# Switch 开关

### 介绍

用于在打开和关闭状态之间进行切换。[PC 端预览](/mobile.html#/switch)

### 引入

通过以下方式来全局注册组件。

```js
import { createApp } from 'vue';
import { Switch } from 'cupshe-element';

const app = createApp();
app.use(Switch);
```

## 代码演示

### 基础用法

通过 `v-model` 绑定开关的选中状态，`true` 表示开，`false` 表示关。

```html
<c-switch v-model="checked" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const checked = ref(true);
    return { checked };
  },
};
```

### 禁用状态

通过 `disabled` 属性来禁用开关，禁用状态下开关不可点击。

```html
<c-switch v-model="checked" disabled />
```

### 异步控制

需要异步控制开关时，可以使用 `modelValue` 属性和 `update:model-value` 事件代替 `v-model`，并在事件回调函数中手动处理开关状态。

```html
<c-switch :model-value="checked" @update:model-value="onUpdateValue" />
```

```js
import { ref } from 'vue';
import { Dialog } from 'cupshe-element';

export default {
  setup() {
    const checked = ref(true);
    const onUpdateValue = (newValue) => {
      Dialog.confirm({
        title: '标题',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        message: '是否切换开关？',
      }).then(() => {
        checked.value = newValue;
      });
    };

    return {
      checked,
      onUpdateValue,
    };
  },
};
```

## API

### Props

| 参数           | 说明           | 类型      | 默认值    |
| -------------- | -------------- | --------- | --------- |
| v-model        | 开关选中状态   | _any_     | `false`   |
| disabled       | 是否为禁用状态 | _boolean_ | `false`   |
| active-color   | 打开时的背景色 | _string_  | `#333`    |
| inactive-color | 关闭时的背景色 | _string_  | `#e2e2e2` |
| active-value   | 打开时对应的值 | _any_     | `true`    |
| inactive-value | 关闭时对应的值 | _any_     | `false`   |

### Events

| 事件名 | 说明               | 回调参数            |
| ------ | ------------------ | ------------------- |
| change | 开关状态切换时触发 | _value: any_        |
| click  | 点击时触发         | _event: MouseEvent_ |

### 类型定义

组件导出以下类型定义：

```ts
import type { SwitchProps } from 'cupshe-element';
```
