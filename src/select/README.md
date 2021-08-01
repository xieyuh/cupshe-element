# Select 选择器

### 介绍

用于对事物进行评级操作。[PC 端预览](/mobile.html#/Select)

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

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

## API

### Props

| 参数        | 说明                            | 类型       | 默认值   |
| ----------- | ------------------------------- | ---------- | -------- |
| v-model     | 当前分值                        | _number_   | -        |
| size        | 尺寸，可选值为 `normal` `small` | _number_   | `normal` |
| placeholder | 输入框占位提示文字              | _string_   | -        |
| options     | 选项列表                        | _Option[]_ | -        |

### Option 数据结构

| 参数  | 说明   | 类型             | 默认值 |
| ----- | ------ | ---------------- | ------ |
| text  | 文案   | _number_         | -      |
| value | 选项值 | _number\|string_ | -      |

### Events

| 事件名 | 说明                     | 回调参数 |
| ------ | ------------------------ | -------- |
| change | 当前分值变化时触发的事件 | 当前分值 |

### Slots

| 名称   | 说明     |
| ------ | -------- |
| option | 选项内容 |
