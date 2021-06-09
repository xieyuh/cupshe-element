# Button 按钮

### 介绍

按钮用于触发一个操作，如提交表单。

### 引入

```js
import { createApp } from 'vue';
import { Button } from 'cupshe-element';

const app = createApp();
app.use(Button);
```

## 代码演示

### 按钮类型

按钮支持 `default`、`primary` 两种类型，默认为 `default`。

```html
<c-button type="primary">主要按钮</c-button>
<c-button type="default">默认按钮</c-button>
```

<demo-code>./demo/index.vue</demo-code>


### 透明按钮

通过 `ghost` 属性将按钮设置为透明按钮，透明按钮的文字为按钮颜色，背景为透明。

```html
<c-button ghost>透明按钮</c-button>
```

<demo-code>./demo/ghost.vue</demo-code>

### 动画效果

通过 `band` 属性给按钮设置hover动画。

```html
<c-button band>动画按钮</c-button>
```

<demo-code>./demo/band.vue</demo-code>


### 按钮形状

通过 `square` 设置方形按钮，通过 `round` 设置圆形按钮。

```html
<c-button square type="primary">方形按钮</c-button>
<c-button round type="primary">圆形按钮</c-button>
```

<demo-code>./demo/shape.vue</demo-code>

### 块级元素

按钮在默认情况下为行内块级元素，通过 `block` 属性可以将按钮的元素类型设置为块级元素。

```html
<c-button type="primary" block>块级元素</c-button>
```

<demo-code>./demo/block.vue</demo-code>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `primary` `default` | _string_ | `default` |
| size | 尺寸，可选值为 `large` `small` `mini` | _string_ | `normal` |
| text | 按钮文字 | _string_ | - |
| native-type | 原生 button 标签的 type 属性 | _string_ | `button` |
| block | 是否为块级元素 | _boolean_ | `false` |
| band | 是否增加hover特效 | _boolean_ | `false` |
| ghost | 是否为透明按钮 | _boolean_ | `false` |
| disabled | 是否禁用按钮 | _boolean_ | `false` |

### Events

| 事件名     | 说明                                     | 回调参数            |
| ---------- | ---------------------------------------- | ------------------- |
| click      | 点击按钮，且按钮状态不为加载或禁用时触发 | _event: MouseEvent_ |

### Slots

| 名称           | 说明           |
| -------------- | -------------- |
| default        | 按钮内容       |

<!-- ### 样式变量

组件提供了下列 Less 变量，可用于自定义样式，使用方法请参考[主题定制](#/zh-CN/theme)。

| 名称                             | 默认值               | 描述 |
| -------------------------------- | -------------------- | ---- |
| @button-mini-height              | `24px`               | -    |
| @button-mini-padding             | `0 @padding-base`    | -    |
| @button-mini-font-size           | `@font-size-xs`      | -    |
| @button-small-height             | `32px`               | -    |
| @button-small-padding            | `0 @padding-xs`      | -    |
| @button-small-font-size          | `@font-size-sm`      | -    |
| @button-normal-font-size         | `@font-size-md`      | -    |
| @button-normal-padding           | `0 15px`             | -    |
| @button-large-height             | `50px`               | -    |
| @button-default-height           | `44px`               | -    |
| @button-default-line-height      | `1.2`                | -    |
| @button-default-font-size        | `@font-size-lg`      | -    |
| @button-default-color            | `@text-color`        | -    |
| @button-default-background-color | `@white`             | -    |
| @button-default-border-color     | `@border-color`      | -    |
| @button-primary-color            | `@white`             | -    |
| @button-primary-background-color | `@blue`              | -    |
| @button-primary-border-color     | `@blue`              | -    |
| @button-success-color            | `@white`             | -    |
| @button-success-background-color | `@green`             | -    |
| @button-success-border-color     | `@green`             | -    |
| @button-danger-color             | `@white`             | -    |
| @button-danger-background-color  | `@red`               | -    |
| @button-danger-border-color      | `@red`               | -    |
| @button-warning-color            | `@white`             | -    |
| @button-warning-background-color | `@orange`            | -    |
| @button-warning-border-color     | `@orange`            | -    |
| @button-border-width             | `@border-width-base` | -    |
| @button-border-radius            | `@border-radius-sm`  | -    |
| @button-round-border-radius      | `@border-radius-max` | -    |
| @button-plain-background-color   | `@white`             | -    |
| @button-disabled-opacity         | `@disabled-opacity`  | -    |
| @button-icon-size                | `1.2em`              | -    |
| @button-loading-icon-size        | `20px`               | -    | -->
