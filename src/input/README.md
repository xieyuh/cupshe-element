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

## API

### Props

| 参数         | 说明                                                                       | 类型               | 默认值  |
| ------------ | -------------------------------------------------------------------------- | ------------------ | ------- |
| v-model      | 输入框内容                                                                 | _string_           | -       |
| placeholder  | 输入框占位符文字                                                           | _string_           | -       |
| defaultValue | 输入框默认内容                                                             | _string_           | -       |
| disabled     | 是否禁用状态，默认为 false                                                 | _boolean_          | false   |
| id           | 输入框的 id                                                                | _string_           | -       |
| maxlength    | 最大长度                                                                   | _number_           | -       |
| prefix       | 带有前缀图标的 input                                                       | _string_ \| _slot_ | -       |
| size         | 控件大小。注：标准表单内的输入框大小限制为 large。可选 large default small | _string_           | default |
| suffix       | 带有后缀图标的 input                                                       | _string_ \| _slot_ | -       |
| allowClear   | 可以点击清除图标删除内容                                                   | _boolean_          | -       |
| type         | 声明 input 类型                                                            | _string_           | text    |

### Textarea Props

| 参数      | 说明         | 类型      | 默认值 |
| --------- | ------------ | --------- | ------ |
| showCount | 是否展示字数 | _boolean_ | false  |

### Events

| 事件名称   | 说明                   | 回调参数      |
| ---------- | ---------------------- | ------------- |
| change     | 输入框内容变化时的回调 | _function(e)_ |
| pressEnter | 按下回车的回调         | _function(e)_ |
| blur       | 失去焦点               | _function(e)_ |
