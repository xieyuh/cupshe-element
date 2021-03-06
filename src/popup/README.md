# Popup 弹出层

### 介绍

弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。[PC 端预览](/mobile.html#/popup)

### 引入

通过以下方式来全局注册组件。

```js
import { createApp } from 'vue';
import { Popup } from 'cupshe-element';

const app = createApp();
app.use(Popup);
```

## 代码演示

### 基础用法

通过 `v-model:show` 控制弹出层是否展示。

```html
<c-cell is-link @click="showPopup">展示弹出层</c-cell>
<c-popup v-model:show="show">内容</c-popup>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(false);
    const showPopup = () => {
      show.value = true;
    };
    return {
      show,
      showPopup,
    };
  },
};
```

### 弹出位置

通过 `position` 属性设置弹出位置，默认居中弹出，可以设置为 `top`、`bottom`、`left`、`right`。

```html
<c-popup v-model:show="show" position="top" :style="{ height: '30%' }" />
```

### 关闭图标

设置 `closeable` 属性后，会在弹出层的右上角显示关闭图标，并且可以通过 `close-icon` 属性自定义图标，使用 `close-icon-position` 属性可以自定义图标位置。

```html
<c-popup
  v-model:show="show"
  closeable
  position="bottom"
  :style="{ height: '30%' }"
/>
<!-- 自定义图标 -->
<c-popup
  v-model:show="show"
  closeable
  close-icon="close"
  position="bottom"
  :style="{ height: '30%' }"
/>
<c-popup v-model:show="show" position="bottom" :style="{ height: '30%' }">
  <template #icon>
    <span>close</span>
  </template>
</c-popup>
<!-- 图标位置 -->
<c-popup
  v-model:show="show"
  closeable
  close-icon-position="top-left"
  position="bottom"
  :style="{ height: '30%' }"
/>
```

## API

### Props

| 参数                   | 说明                                                                                                          | 类型                                                | 默认值      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ----------- |
| v-model:show           | 是否显示弹出层                                                                                                | _boolean_                                           | `false`     |
| overlay                | 是否显示遮罩层                                                                                                | _boolean_                                           | `true`      |
| position               | 弹出位置，可选值为 `top` `bottom` `right` `left`                                                              | _string_                                            | `center`    |
| overlay-class          | 自定义遮罩层类名                                                                                              | _string \| Array \| object_                         | -           |
| overlay-style          | 自定义遮罩层样式                                                                                              | _object_                                            | -           |
| duration               | 动画时长，单位秒                                                                                              | _number \| string_                                  | `0.3`       |
| lock-scroll            | 是否锁定背景滚动                                                                                              | _boolean_                                           | `true`      |
| close-on-popstate      | 是否在页面回退时自动关闭                                                                                      | _boolean_                                           | `false`     |
| close-on-click-overlay | 是否在点击遮罩层后关闭                                                                                        | _boolean_                                           | `true`      |
| close-icon             | 关闭[图标名称](#/icon)或图片链接                                                                              | _string_                                            | `close`     |
| close-icon-position    | 关闭图标位置，可选值为 `top-left`<br>`bottom-left` `bottom-right`                                             | _string_                                            | `top-right` |
| before-close           | 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 Promise                                                   | _(action: string) => boolean \| Promise\<boolean\>_ | -           |
| closeable              | 是否显示关闭图标                                                                                              | _boolean_                                           | `false`     |
| transition             | 动画类名，等价于 [transition](https://v3.cn.vuejs.org/api/built-in-components.html#transition) 的 `name` 属性 | _string_                                            | -           |
| transition-appear      | 是否在初始渲染时启用过渡动画                                                                                  | _boolean_                                           | `false`     |

### Events

| 事件名           | 说明                       | 回调参数            |
| ---------------- | -------------------------- | ------------------- |
| click            | 点击弹出层时触发           | _event: MouseEvent_ |
| click-overlay    | 点击遮罩层时触发           | _event: MouseEvent_ |
| click-close-icon | 点击关闭图标时触发         | _event: MouseEvent_ |
| open             | 打开弹出层时触发           | -                   |
| close            | 关闭弹出层时触发           | -                   |
| opened           | 打开弹出层且动画结束后触发 | -                   |
| closed           | 关闭弹出层且动画结束后触发 | -                   |

### Slots

| 名称            | 说明           |
| --------------- | -------------- |
| default         | 弹窗内容       |
| overlay-content | 遮罩层的内容   |
| icon            | 关闭按钮的内容 |
