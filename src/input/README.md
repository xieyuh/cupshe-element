# Input 输入框

### 介绍

通过鼠标或键盘输入内容，是最基础的表单域的包装。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Input } from 'cupshe-element';

const app = createApp();
app.use(Input);
```

## 代码演示

### 基础用法

可以通过 `v-model` 双向绑定输入框的值，通过 `placeholder` 设置占位提示文字。。

```html
<c-input v-model="value" placeholder="your name"></c-input>
```

### 多行文本

根据 `type` 属性定义不同类型的输入框，默认值为 text。。

```html
<c-input
  v-model="value"
  type="textarea"
  placeholder="your name"
  :rows="3"
  :cols="3"
></c-input>
```

### 禁用状态

通过 `readonly` 将输入框设置为只读状态，通过 `disabled` 将输入框设置为禁用状态。

```html
<c-input value="禁用" disabled></c-input>
<c-input value="只读" readonly></c-input>
```
