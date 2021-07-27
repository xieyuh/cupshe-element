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
<c-tag>Tag</c-tag>
<c-tag>
  <c-icon name="star" />
  Tag
</c-tag>
```

### 不可选中

设置 `checkable` 属性设置为 `false` 设置为不可选中。

```html
<c-tag :checkable="false">Tag</c-tag>
```

### 自定义颜色

通过 `color` 和 `text-color` 属性设置标签颜色。

```html
<c-tag color="#ffe1e1" text-color="#ad0000">标签</c-tag>
```

### 自定义样式

设置 `checked-class` 属性自定义选中样式。

```html
<c-tag checked-class="checked">Tag</c-tag>
```

```css
.checked {
  color: #fff;
  background-color: #000;
}
```

## API

### Props

| 参数          | 说明             | 类型      | 默认值 |
| ------------- | ---------------- | --------- | ------ |
| color         | 标签背景颜色     | _string_  | -      |
| text-color    | 文本颜色         | _string_  | -      |
| checkable     | 是否为可选中标签 | _boolean_ | `true` |
| checked-class | 选中下的样式类   | _string_  | -      |

### Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 标签显示内容 |

### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| click  | 点击时触发 | _event: MouseEvent_ |
