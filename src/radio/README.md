# Radio 单选框

### 介绍

在一组备选项中进行单选。[PC 端预览](/mobile.html#/radio)

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { RadioGroup, Radio } from 'cupshe-element';

const app = createApp();
app.use(Radio);
app.use(RadioGroup);
```

## 代码演示

### 基础用法

通过 `v-model` 绑定值当前选中项的 name。

```html
<c-radio-group v-model="checked">
  <c-radio name="1">单选框 1</c-radio>
  <c-radio name="2">单选框 2</c-radio>
</c-radio-group>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const checked = ref('1');
    return { checked };
  },
};
```

### 水平排列

将 `direction` 属性设置为 `horizontal` 后，单选框组会变成水平排列。

```html
<c-radio-group v-model="checked" direction="horizontal">
  <c-radio name="1">单选框 1</c-radio>
  <c-radio name="2">单选框 2</c-radio>
</c-radio-group>
```

### 禁用状态

通过 `disabled` 属性禁止选项切换，在 `Radio` 上设置 `disabled` 可以禁用单个选项。

```html
<c-radio-group v-model="checked" disabled>
  <c-radio name="1">单选框 1</c-radio>
  <c-radio name="2">单选框 2</c-radio>
</c-radio-group>
```

### 自定义图标

通过 `icon` 插槽自定义图标，并通过 `slotProps` 判断是否为选中状态。

```html
<c-radio-group v-model="checked">
  <c-radio name="1">
    单选框 1
    <template #icon="props">
      <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
    </template>
  </c-radio>
  <c-radio name="2">
    单选框 2
    <template #icon="props">
      <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
    </template>
  </c-radio>
</c-radio-group>
```

## API

### Radio Props

| 参数      | 说明                     | 类型               | 默认值  |
| --------- | ------------------------ | ------------------ | ------- |
| name      | 标识符                   | _any_              | -       |
| disabled  | 是否为禁用状态           | _boolean_          | `false` |
| icon-size | 图标大小，默认单位为`px` | _number \| string_ | `20px`  |

### RadioGroup Props

| 参数      | 说明                                 | 类型               | 默认值  |
| --------- | ------------------------------------ | ------------------ | ------- |
| v-model   | 当前选中项的标识符                   | _any_              | -       |
| disabled  | 是否禁用所有单选框                   | _boolean_          | `false` |
| icon-size | 所有单选框的图标大小，默认单位为`px` | _number \| string_ | `20px`  |

### Radio Events

| 事件名 | 说明             | 回调参数            |
| ------ | ---------------- | ------------------- |
| click  | 点击单选框时触发 | _event: MouseEvent_ |

### RadioGroup Events

| 事件名 | 说明                     | 回调参数       |
| ------ | ------------------------ | -------------- |
| change | 当绑定值变化时触发的事件 | _name: string_ |

### Radio Slots

| 名称    | 说明       | 参数                                      |
| ------- | ---------- | ----------------------------------------- |
| default | 自定义文本 | -                                         |
| icon    | 自定义图标 | _{ checked: boolean, disabled: boolean }_ |
