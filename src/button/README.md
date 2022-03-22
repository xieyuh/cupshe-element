# Button 按钮

### 介绍

按钮用于触发一个操作，如提交表单。[PC 端预览](/mobile.html#/button)

### 引入

通过以下方式来全局注册组件。

```js
import { createApp } from 'vue';
import { Button } from 'cupshe-element';

const app = createApp();
app.use(Button);
```

## 代码演示

### 按钮类型

按钮支持 `primary`、`default` 两种类型，默认为 `default`。

```html
<c-button type="primary">主要按钮</c-button>
<c-button type="default">默认按钮</c-button>
```

### 透明按钮

通过 `ghost` 属性将按钮设置为透明按钮，透明按钮的文字为按钮颜色，背景为透明。

```html
<c-button ghost type="primary">透明按钮</c-button>
```

### 加载状态

通过 `loading` 属性设置加载状态，禁用状态下按钮不可点击。

```html
<c-button type="primary" loading>加载状态</c-button>
```

### 禁用状态

通过 `disabled` 属性来禁用按钮，禁用状态下按钮不可点击。

```html
<c-button disabled>禁用状态</c-button>
```

### 动画效果

通过 `cover` 设置按钮 hover 动画。

```html
<c-button type="primary" cover>主要按钮</c-button>
<c-button cover>默认按钮</c-button>
```

### 图标按钮

通过 `icon` 属性设置按钮图标，支持 Icon 组件里的所有图标，也可以传入图标 URL。

```html
<c-button icon="star" type="primary" />
<c-button ghost type="primary" icon="like">主要按钮</c-button>
<c-button icon="https://img.yzcdn.cn/vant/user-active.png">按钮</c-button>
```

### 按钮尺寸

支持 `large`、`normal`、`small` 三种尺寸，默认为 `normal`。

```html
<c-button type="primary" size="large">大号按钮</c-button>
<c-button type="primary" size="normal">普通按钮</c-button>
<c-button type="primary" size="small">小型按钮</c-button>
```

### 块级元素

按钮在默认情况下为行内块级元素，通过 `block` 属性可以将按钮的元素类型设置为块级元素。

```html
<c-button type="primary" block>块级元素</c-button>
```

### 自定义颜色

通过 `color` 属性可以自定义按钮的颜色。

```html
<c-button color="#7232dd">单色按钮</c-button>
<c-button color="#7232dd" plain>单色按钮</c-button>
<c-button color="linear-gradient(to right, #ff6034, #ee0a24)">
  渐变色按钮
</c-button>
```

### 路由跳转

通过 `url` 属性进行 URL 跳转，或通过 `to` 属性进行路由跳转。

```html
<c-button url="https://baidu.com">外部链接</c-button>
<c-button to="/home">内部路由</c-button>
```

## API

### Props

| 参数        | 说明                                                | 类型      | 默认值    |
| ----------- | --------------------------------------------------- | --------- | --------- |
| type        | 类型，可选值为 `primary` `success` `warning` `info` | _string_  | `default` |
| size        | 尺寸，可选值为 `large` `small`                      | _string_  | `normal`  |
| color       | 按钮颜色，支持传入 `linear-gradient` 渐变色         | _string_  | -         |
| tag         | 按钮根节点的 HTML 标签                              | _string_  | `button`  |
| text-color  | 按钮文字颜色                                        | _string_  | -         |
| icon        | 左侧[图标名称](#/icon)或图片链接                    | _string_  | -         |
| native-type | 原生 button 标签的 type 属性                        | _string_  | `button`  |
| block       | 是否为块级元素                                      | _boolean_ | `false`   |
| ghost       | 是否为透明按钮                                      | _boolean_ | `false`   |
| disabled    | 是否禁用按钮                                        | _boolean_ | `false`   |
| loading     | 是否为加载状态                                      | _boolean_ | `false`   |

### Events

| 事件名 | 说明                                     | 回调参数            |
| ------ | ---------------------------------------- | ------------------- |
| click  | 点击按钮，且按钮状态不为加载或禁用时触发 | _event: MouseEvent_ |

### Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 按钮内容   |
| icon    | 自定义图标 |
