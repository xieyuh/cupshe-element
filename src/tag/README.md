# Tag 标签

### 介绍

用于标记关键词和概括主要内容。[PC 端预览](/mobile.html#/tag)

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Tag } from 'cupshe-element';

const app = createApp();
app.use(Tag);
```

## 代码演示

### 基础用法

```html
<c-tag v-model:checked="value0">Tag</c-tag>
<c-tag v-model:checked="value1">
  <c-icon name="star" />
  Tag
</c-tag>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const value0 = ref(false);
    const value1 = ref(false);

    return {
      value0,
      value1,
    };
  },
};
```

### 不可选中

设置 `checkable` 属性设置为 `false` 设置为不可选中。

```html
<c-tag :checkable="false">Tag</c-tag>
```

### 自定义样式

设置 `checked-class` 属性自定义选中时的样式类。

```html
<c-tag checked-class="checked" v-model:checked="value">Tag</c-tag>
```

```js
import { ref } from 'vue';

const value = ref(false);
```

```css
.checked {
  background: #fff;
  border: 1px solid #000;
  color: #000;
  box-sizing: border-box;
}
```

### 可关闭标签

设置 `checkable` 属性设置为 `false` 设置为不可选中。

```html
<c-tag closeable v-model:checked="checked" :show="value" @close="onClose"
  >标签</c-tag
>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(true);
    const checked = ref(false);

    const onClose = () => {
      value.value = false;
    };

    return {
      value,
      checked,
      onClose,
    };
  },
};
```

## API

### Props

| 参数          | 说明             | 类型      | 默认值  |
| ------------- | ---------------- | --------- | ------- |
| checkable     | 是否为可选中标签 | _boolean_ | `true`  |
| checked       | 选中状态         | _boolean_ | `false` |
| checked-class | 选中时样式类     | _string_  | -       |
| closeable     | 是否可关闭       | _boolean_ | `false` |

### Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 标签显示内容 |

### Events

| 事件名         | 说明                     | 回调参数            |
| -------------- | ------------------------ | ------------------- |
| click          | 点击时触发               | _event: MouseEvent_ |
| close          | 点击关闭时触发           | _event: MouseEvent_ |
| update:checked | 点击时触发，切换选中状态 | -                   |
