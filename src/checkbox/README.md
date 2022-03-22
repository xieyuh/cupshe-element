# Checkbox 复选框

### 介绍

在一组备选项中进行多选。[PC 端预览](/mobile.html#/checkbox)

### 引入

通过以下方式来全局注册组件。

```js
import { createApp } from 'vue';
import { Checkbox, CheckboxGroup } from 'cupshe-element';

const app = createApp();
app.use(Checkbox);
app.use(CheckboxGroup);
```

## 代码演示

### 基础用法

通过 `v-model` 绑定复选框的勾选状态。

```html
<c-checkbox v-model="checked">复选框</c-checkbox>
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

### 水平排列

通过设置 `direction` 属性值为 `horizontal` 设置为水平排列方式。

```html
<c-checkbox-group v-model="horizontalResult" direction="horizontal">
  <c-checkbox name="a">复选框</c-checkbox>
  <c-checkbox name="b">复选框</c-checkbox>
</c-checkbox-group>
```

### 禁用状态

通过设置 `disabled` 属性可以禁用复选框。

```html
<c-checkbox v-model="checked" disabled>复选框</c-checkbox>
```

### 复选框组

复选框可以与复选框组一起使用，复选框组通过 `v-model` 数组绑定复选框的勾选状态。

```html
<c-checkbox-group v-model="checked">
  <c-checkbox name="a">复选框 a</c-checkbox>
  <c-checkbox name="b">复选框 b</c-checkbox>
</c-checkbox-group>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const checked = ref(['a', 'b']);
    return { checked };
  },
};
```

### 限制最大可选数

通过 `max` 属性可以限制复选框组的最大可选数。

```html
<c-checkbox-group v-model="result" :max="2">
  <c-checkbox name="a">复选框 a</c-checkbox>
  <c-checkbox name="b">复选框 b</c-checkbox>
  <c-checkbox name="c">复选框 c</c-checkbox>
</c-checkbox-group>
```

### 全选与反选

通过 `CheckboxGroup` 实例上的 `toggleAll` 方法可以实现全选与反选。

```html
<c-checkbox-group v-model="result" ref="checkboxGroup">
  <c-checkbox name="a">复选框 a</c-checkbox>
  <c-checkbox name="b">复选框 b</c-checkbox>
  <c-checkbox name="c">复选框 c</c-checkbox>
</c-checkbox-group>

<c-button type="primary" @click="checkAll">全选</c-button>
<c-button type="primary" @click="toggleAll">反选</c-button>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const checked = ref([]);
    const checkboxGroup = ref(null);

    const checkAll = () => {
      checkboxGroup.value.toggleAll(true);
    }
    const toggleAll = () => {
      checkboxGroup.value.toggleAll();
    },

    return {
      checked,
      checkAll,
      toggleAll,
      checkboxGroup,
    };
  },
};
```

## API

### Checkbox Props

| 参数       | 说明               | 类型      | 默认值  |
| ---------- | ------------------ | --------- | ------- |
| v-model    | 是否为选中状态     | _boolean_ | `false` |
| name       | 标识符             | _any_     | -       |
| disabled   | 是否禁用复选框     | _boolean_ | `false` |
| bind-group | 是否与复选框组绑定 | _boolean_ | `true`  |

### CheckboxGroup Props

| 参数      | 说明                            | 类型               | 默认值     |
| --------- | ------------------------------- | ------------------ | ---------- |
| v-model   | 所有选中项的标识符              | _any[]_            | -          |
| disabled  | 是否禁用所有复选框              | _boolean_          | `false`    |
| max       | 最大可选数，`0` 为无限制        | _number \| string_ | `0`        |
| direction | 排列方向，可选值为 `horizontal` | _string_           | `vertical` |

### Checkbox Events

| 事件名 | 说明                     | 回调参数            |
| ------ | ------------------------ | ------------------- |
| change | 当绑定值变化时触发的事件 | _checked: boolean_  |
| click  | 点击复选框时触发         | _event: MouseEvent_ |

### CheckboxGroup Events

| 事件名 | 说明                     | 回调参数       |
| ------ | ------------------------ | -------------- |
| change | 当绑定值变化时触发的事件 | _names: any[]_ |

### Checkbox Slots

| 名称    | 说明       | 参数 |
| ------- | ---------- | ---- |
| default | 自定义文本 | -    |

### CheckboxGroup 方法

通过 ref 可以获取到 CheckboxGroup 实例并调用实例方法，详见[组件实例方法](#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa)。

| 方法名    | 说明                                                               | 参数                          | 返回值 |
| --------- | ------------------------------------------------------------------ | ----------------------------- | ------ |
| toggleAll | 切换所有复选框，传 `true` 为选中，`false` 为取消选中，不传参为取反 | _options?: boolean \| object_ | -      |

### toggleAll 方法示例

```js
const { checkboxGroup } = this.$refs;

// 全部反选
checkboxGroup.toggleAll();
// 全部选中
checkboxGroup.toggleAll(true);
// 全部取消
checkboxGroup.toggleAll(false);

// 全部反选，并跳过禁用的复选框
checkboxGroup.toggleAll({
  skipDisabled: true,
});
// 全部选中，并跳过禁用的复选框
checkboxGroup.toggleAll({
  checked: true,
  skipDisabled: true,
});
```

### Checkbox 方法

通过 ref 可以获取到 Checkbox 实例并调用实例方法，详见[组件实例方法](#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa)。

| 方法名 | 说明                                                             | 参数                | 返回值 |
| ------ | ---------------------------------------------------------------- | ------------------- | ------ |
| toggle | 切换选中状态，传 `true` 为选中，`false` 为取消选中，不传参为取反 | _checked?: boolean_ | -      |
