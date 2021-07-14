# Icon 图标

### 介绍

基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 `icon` 属性引用。图标库存放在 [iconfont](https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.13&manage_type=myprojects&projectId=2670671&keyword=&project_type=&page=) 上，使用前联系设计开通 iconfont 图标库权限。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Icon } from 'cupshe-element';

const app = createApp();
app.use(Icon);
```

## 代码演示

### 基础用法

通过 `name` 属性来指定需要使用的图标，cupshe-element 内置了一套图标库，可以直接传入对应的名称来使用。

```html
<c-icon name="chat" />
<c-icon name="tick" />
<c-icon name="share_facebook" />
```

### 图标颜色

通过 `color` 属性来设置图标的颜色。

```html
<c-icon name="star" color="#1989fa" />
<c-icon name="share_twitter" color="#ee0a24" />
<c-icon name="sale_full" color="#07c160" />
```

### 图标大小

通过 `size` 属性来设置图标的尺寸大小，可以指定任意 CSS 单位。

```html
<!-- 不指定单位，默认使用 px -->
<c-icon name="email" size="24" />
<c-icon name="info" size="2.5rem" />
<c-icon name="like_full" size="3rem" />
```

## API

### Props

| 参数         | 说明                                       | 类型               | 默认值     |
| ------------ | ------------------------------------------ | ------------------ | ---------- |
| name         | 图标名称或图片链接                         | _string_           | -          |
| color        | 图标颜色                                   | _string_           | `inherit`  |
| size         | 图标大小，如 `20px` `2em`，默认单位为 `px` | _number \| string_ | `inherit`  |

### Events

| 事件名 | 说明           | 回调参数            |
| ------ | -------------- | ------------------- |
| click  | 点击图标时触发 | _event: MouseEvent_ |
