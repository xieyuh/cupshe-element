# Badge 徽标

### 介绍

在右上角展示徽标数字或小红点。[PC 端预览](/mobile.html#/badge)

### 引入

通过以下方式来全局注册组件。

```js
import { createApp } from 'vue';
import { Badge } from 'cupshe-element';

const app = createApp();
app.use(Badge);
```

## 代码演示

### 基础用法

设置 `content` 属性后，Badge 会在子元素的右上角显示对应的徽标，也可以通过 `dot` 来显示小红点。

```html
<c-badge :content="5">
  <div class="child" />
</c-badge>
<c-badge :content="10">
  <div class="child" />
</c-badge>
<c-badge content="Hot">
  <div class="child" />
</c-badge>
<c-badge dot>
  <div class="child" />
</c-badge>

<style>
  .child {
    width: 40px;
    height: 40px;
    background: #f2f3f5;
    border-radius: 4px;
  }
</style>
```

### 最大值

设置 `max` 属性后，当 `content` 的数值超过最大值时，会自动显示为 `{max}+`。

```html
<c-badge :content="20" max="9">
  <div class="child" />
</c-badge>
<c-badge :content="50" max="20">
  <div class="child" />
</c-badge>
<c-badge :content="200" max="99">
  <div class="child" />
</c-badge>
```

### 自定义颜色

通过 `color` 属性来设置徽标的颜色。

```html
<c-badge :content="5" color="#1989fa">
  <div class="child" />
</c-badge>
<c-badge :content="10" color="#1989fa">
  <div class="child" />
</c-badge>
<c-badge dot color="#1989fa">
  <div class="child" />
</c-badge>
```

### 自定义徽标内容

通过 `content` 插槽可以自定义徽标的内容，比如插入一个图标。

```html
<c-badge>
  <div class="child" />
  <template #content>!</template>
</c-badge>
<c-badge>
  <div class="child" />
  <template #content>?</template>
</c-badge>
```

```css
.badge-icon {
  display: block;
  font-size: 10px;
  line-height: 16px;
}
```

### 自定义徽标位置

通过 `position` 属性来设置徽标的位置。

```html
<c-badge :content="10" position="top-left">
  <div class="child" />
</c-badge>
<c-badge :content="10" position="bottom-left">
  <div class="child" />
</c-badge>
<c-badge :content="10" position="bottom-right">
  <div class="child" />
</c-badge>
```

### 独立展示

当 Badge 没有子元素时，会作为一个独立的元素进行展示。

```html
<c-badge :content="20" />

<c-badge :content="200" max="99" />
```

## API

### Props

| 参数      | 说明                                                                        | 类型                                   | 默认值      |
| --------- | --------------------------------------------------------------------------- | -------------------------------------- | ----------- |
| content   | 徽标内容                                                                    | _number \| string_                     | -           |
| color     | 徽标背景颜色                                                                | _string_                               | `#ee0a24`   |
| dot       | 是否展示为小红点                                                            | _boolean_                              | `false`     |
| max       | 最大值，超过最大值会显示 `{max}+`，仅当 content 为数字时有效                | _number \| string_                     | -           |
| offset    | 设置徽标的偏移量，数组的两项分别对应水平和垂直方向的偏移量，默认单位为 `px` | _[number \| string, number \| string]_ | -           |
| show-zero | 当 content 为数字 0 时，是否展示徽标                                        | _boolean_                              | `true`      |
| position  | 徽标位置，可选值为 `top-left` `bottom-left` `bottom-right`                  | _string_                               | `top-right` |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 徽标包裹的子元素 |
| content | 自定义徽标内容   |

### 类型定义

组件导出以下类型定义：

```ts
import type { BadgeProps, BadgePosition } from 'cupshe-element';
```
