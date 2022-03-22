# Select 选择器

### 介绍

下拉选项列表。[PC 端预览](/mobile.html#/Select)

### 引入

通过以下方式来全局注册组件。

```js
import { createApp } from 'vue';
import { Select } from 'cupshe-element';

const app = createApp();
app.use(Select);
```

## 代码演示

### 基础用法

通过 `v-model` 来绑定当前评分值。

```html
<c-select :options="option" v-model="select" placeholder="请选择" />
<c-select
  :options="option"
  v-model="select"
  placeholder="请选择"
  :style="{ width: '280px' }"
/>
```

```js
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      option: [
        {
          text: '选项 1',
          value: '1',
        },
        {
          text: '选项 2',
          value: '2',
        },
      ],
      select: '',
    });

    return { ...toRefs(state) };
  },
};
```

### 限制滚动高度

```html
<c-select
  :options="option"
  v-model="select"
  placeholder="请选择"
  :popper-style="{ maxHeight: '140px' }"
/>
```

### 自定义选项内容

通过 `option` 插槽来自定义选项内容。

```html
<c-select :options="option" v-model="select" placeholder="请选择">
  <template #option="{ index }">
    <c-rate :modelValue="index" readonly />
  </template>
</c-select>
```

```js
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      option: [
        {
          text: '选项 1',
          value: '1',
        },
        {
          text: '选项 2',
          value: '2',
        },
        {
          text: '选项 3',
          value: '3',
        },
        {
          text: '选项 4',
          value: '4',
        },
      ],
      select: '',
    }),

    return { ...toRefs(state) };
  },
};
```

### 选择器尺寸

通过 `size` 属性指定选择器尺寸。

```html
<c-select
  size="small"
  :options="option"
  v-model="select"
  placeholder="请选择"
/>
```

### 自定义控件

通过 `reference` 插槽自定义选择器控件。

```html
<c-select
  :options="option"
  v-model="select"
  placeholder="请选择"
  placement="bottom-start"
  :popperStyle="{ width: '178px', marginTop: '10px' }"
>
  <template #reference="{ match }">
    <span>
      <span>{{ match ? match.text : '请选择' }}</span>
      <c-icon name="arrow_down" />
    </span>
  </template>
</c-select>
```

### 错误状态

通过 `error` 属性指定选择器为错误状态。

```html
<c-select error :options="option" v-model="select" placeholder="请选择" />
```

### 选项禁用

通过 `option` 插槽来自定义选项内容。

```html
<c-select :options="option" v-model="select" placeholder="请选择" disabled />
```

```js
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      option: [
        {
          text: '选项 1',
          value: '1',
        },
        {
          text: '选项 2',
          value: '2',
          disabled: true
        },
        {
          text: '选项 3',
          value: '3',
        },
      ],
      select: '',
    }),

    return { ...toRefs(state) };
  },
};
```

### 禁用状态

通过 `disabled` 属性设置禁用状态。

```html
<c-select :options="option" v-model="select" placeholder="请选择" disabled />
```

## API

### Props

| 参数        | 说明                                           | 类型       | 默认值   |
| ----------- | ---------------------------------------------- | ---------- | -------- |
| v-model     | 当前分值                                       | _number_   | -        |
| size        | 尺寸，可选值为 `normal` `small`                | _number_   | `normal` |
| placeholder | 输入框占位提示文字                             | _string_   | -        |
| defaultText | 未选中任何值的时候显示的文字                   | _string_   | -        |
| disabled    | 禁用状态                                       | _boolean_  | `false`  |
| options     | 选项列表                                       | _Option[]_ | -        |
| style       | 控件容器样式                                   | _object_   | -        |
| error       | 错误状态                                       | _boolean_  | -        |
| popperStyle | 弹出层容器样式                                 | _object_   | -        |
| placement   | 弹出位置，可选值为 `bottom-start` `bottom-end` | _object_   | `bottom` |
| required    | 是否必填，同 `Input` 组件                      | _boolean_  | `false`  |

### Option 数据结构

| 参数     | 说明     | 类型             | 默认值  |
| -------- | -------- | ---------------- | ------- |
| text     | 文案     | _number_         | -       |
| value    | 选项值   | _number\|string_ | -       |
| disabled | 禁用状态 | _boolean_        | `false` |

### Events

| 事件名 | 说明                     | 回调参数               |
| ------ | ------------------------ | ---------------------- |
| change | 当前分值变化时触发的事件 | 当前分值               |
| select | 点击选项时触发           | _option: SelectOption_ |
| click  | 点击控件时触发的事件     | _event: MouseEvent_    |

### Slots

| 名称      | 说明     |
| --------- | -------- |
| option    | 选项内容 |
| reference | 控件内容 |
