# Select 选择器

### 介绍

下拉选择器。[PC 端预览](/mobile.html#/select)

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

可以通过 `v-model` 双向绑定输入框的值，通过 `placeholder` 设置占位提示文字。。

```html
<c-select
  v-model="value"
  placeholder="please select"
  :options="option"
></c-select>
```

```js
import { toRefs, reactive } from '@vue/reactivity';

export default {
  setup() {
    const state = reactive({
      value: '',
      option: [
        {
          label: 111,
          value: 1,
        },
        {
          label: 222,
          value: 2,
        },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
};
```

### 斑马线风格

可以通过 `v-model` 双向绑定输入框的值，通过 `placeholder` 设置占位提示文字。。

```html
<c-select
  v-model="value"
  placeholder="please select"
  :options="option"
  type="zebra"
></c-select>
```

### 后缀图标

可以通过 `slot` 或者 `suffix-icon`自定义图标。

```html
<c-select v-model="value" placeholder="slot icon" :options="option">
  <template #icon>
    <c-icon name="down_full"></c-icon>
  </template>
</c-select>
<c-select
  v-model="value"
  placeholder="icon name"
  :options="option"
  suffix-icon="down_full"
>
</c-select>
```

## API

### Props

| 参数        | 说明                   | 类型                                            | 默认值 |
| ----------- | ---------------------- | ----------------------------------------------- | ------ |
| v-model     | 指定当前选中的条目     | _number \| \_string_                            | -      |
| placeholder | 选择框默认文字         | _string_                                        | -      |
| suffixIcon  | 自定义的选择框后缀图标 | _string_ \| _slot_                              | -      |
| options     | options 数据           | _array<{value, label, [disabled, key, title]}>_ | -      |
| defaultOpen | 是否默认展开下拉菜单   | _boolean_                                       | -      |
| open        | 是否展开下拉菜单       | _boolean_                                       | -      |

### Events

| 事件名称 | 说明                       | 回调参数                                 |
| -------- | -------------------------- | ---------------------------------------- |
| change   | 选中 option 时，调用此函数 | _function(item: Object<{label, value}>)_ |
