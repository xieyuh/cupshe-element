# Popup 弹出层

### 介绍

弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

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
<c-popup v-model:show="show">内容</c-popup>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(false);
    return {
      show,
    };
  },
};
```

<demo-code>./demo/index.vue</demo-code>

### 弹出位置

通过 `position` 属性设置弹出位置，默认居中弹出，可以设置为 `top`、`bottom`、`left`、`right`。

```html
<c-popup v-model:show="show" position="top" :style="{ height: '30%' }" />
```

<demo-code>./demo/position.vue</demo-code>

### 指定挂载位置

弹出层默认挂载到组件标签所在位置，可以通过 `teleport` 属性指定挂载位置。

```html
<!-- 挂载到 body 节点下 -->
<c-popup v-model:show="show" teleport="body" />

<!-- 挂载到 #app 节点下 -->
<c-popup v-model:show="show" teleport="#app" />

<!-- 挂载到指定的元素下 -->
<c-popup v-model:show="show" :teleport="myContainer" />
```

```js
export default {
  setup() {
    const myContainer = document.querySelector('.my-container');
    return {
      myContainer,
    };
  },
};
```

## API

### Props

| 参数                   | 说明                                                                                                          | 类型                        | 默认值      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------- | ----------- |
| v-model:show           | 是否显示弹出层                                                                                                | _boolean_                   | `false`     |
| overlay                | 是否显示遮罩层                                                                                                | _boolean_                   | `true`      |
| position               | 弹出位置，可选值为 `top` `bottom` `right` `left`                                                              | _string_                    | `center`    |
| overlay-class          | 自定义遮罩层类名                                                                                              | _string \| Array \| object_ | -           |
| overlay-style          | 自定义遮罩层样式                                                                                              | _object_                    | -           |
| duration               | 动画时长，单位秒                                                                                              | _number \| string_          | `0.3`       |
| lock-scroll            | 是否锁定背景滚动                                                                                              | _boolean_                   | `true`      |
| lazy-render            | 是否在显示弹层时才渲染节点                                                                                    | _boolean_                   | `true`      |
| close-on-popstate      | 是否在页面回退时自动关闭                                                                                      | _boolean_                   | `false`     |
| close-on-click-overlay | 是否在点击遮罩层后关闭                                                                                        | _boolean_                   | `true`      |
| transition             | 动画类名，等价于 [transition](https://v3.cn.vuejs.org/api/built-in-components.html#transition) 的 `name` 属性 | _string_                    | -           |
| transition-appear      | 是否在初始渲染时启用过渡动画                                                                                  | _boolean_                   | `false`     |
| teleport               | 指定挂载的节点                                                                                                | _string \| Element_         | -           |

| 事件名           | 说明                       | 回调参数            |
| ---------------- | -------------------------- | ------------------- |
| click            | 点击弹出层时触发           | _event: MouseEvent_ |
| click-overlay    | 点击遮罩层时触发           | _event: MouseEvent_ |
| open             | 打开弹出层时触发           | -                   |
| close            | 关闭弹出层时触发           | -                   |
| opened           | 打开弹出层且动画结束后触发 | -                   |
| closed           | 关闭弹出层且动画结束后触发 | -                   |

### Slots

| 名称                      | 说明         |
| ------------------------- | ------------ |
| default                   | 弹窗内容     |
| overlay-content           | 遮罩层的内容 |
