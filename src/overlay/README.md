# Overlay 遮罩层

### 介绍

创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Overlay } from 'cupshe-element';

const app = createApp();
app.use(Overlay);
```

## 代码演示

### 基础用法

```html
<c-button type="primary" text="显示遮罩层" @click="show = true" />
<c-overlay :show="show" @click="show = false" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(false);
    return { show };
  },
};
```

### 嵌入内容

通过默认插槽可以在遮罩层上嵌入任意内容。

```html
<c-overlay :show="show" @click="show = false">
  <div class="wrapper" @click.stop>
    <div class="block" />
  </div>
</c-overlay>

<style>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
</style>
```

## API

### Props

| 参数         | 说明             | 类型               | 默认值  |
| ------------ | ---------------- | ------------------ | ------- |
| show         | 是否展示遮罩层   | _boolean_          | `false` |
| z-index      | z-index 层级     | _number \| string_ | `1`     |
| duration     | 动画时长，单位秒 | _number \| string_ | `0.3`   |
| class-name   | 自定义类名       | _string_           | -       |
| custom-style | 自定义样式       | _object_           | -       |

### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| click  | 点击时触发 | _event: MouseEvent_ |

### Slots

| 名称    | 说明                               |
| ------- | ---------------------------------- |
| default | 默认插槽，用于在遮罩层上方嵌入内容 |
