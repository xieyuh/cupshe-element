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

| 参数           | 说明                                         | 类型               | 默认值    |
| -------------- | -------------------------------------------- | ------------------ | --------- |
| v-model        | 当前分值                                     | _number_           | -         |
| count          | 图标总数                                     | _number \| string_ | `5`       |
| size           | 尺寸，可选值为 `large` `small`               | _string_           | `normal`  |
| gutter         | 图标间距，默认单位为`px`                     | _number \| string_ | `4px`     |
| color          | 选中时的颜色                                 | _string_           | `#f6be42` |
| void-color     | 未选中时的颜色                               | _string_           | `#c8c9cc` |
| disabled-color | 禁用时的颜色                                 | _string_           | `#c8c9cc` |
| icon           | 选中时的[图标名称](#/zh-CN/icon)或图片链接   | _string_           | `star`    |
| void-icon      | 未选中时的[图标名称](#/zh-CN/icon)或图片链接 | _string_           | `star-o`  |
| allow-half     | 是否允许半选                                 | _boolean_          | `false`   |
| readonly       | 是否为只读状态，只读状态下无法修改评分       | _boolean_          | `false`   |
| disabled       | 是否禁用评分                                 | _boolean_          | `false`   |

### Events

| 事件名     | 说明                     | 回调参数            |
| ---------- | ------------------------ | ------------------- |
| change     | 当前分值变化时触发的事件 | 当前分值            |
| click-text | 点击文案时触发的事件     | _event: MouseEvent_ |

### Slots

| 名称 | 说明     |
| ---- | -------- |
| text | 评分文案 |
