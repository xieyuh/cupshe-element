# Select 选择器

### 介绍

下拉选择器。

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
