# Input 输入框

### 介绍

用户可以在文本框内输入或编辑文字。[PC 端预览](/mobile.html#/input)

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

可以通过 `v-model` 双向绑定输入框的值，通过 `placeholder` 设置占位提示文字。

```html
<c-input v-model="value" placeholder="请输入文本" />
<c-input v-model="value1" style="width: 220px" placeholder="自定义尺寸" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const value = ref('');
    return { value };
  },
};
```

### 输入框尺寸

通过 `size` 属性设置输入框尺寸。

```html
<c-input v-model="value" size="small" placeholder="请输入文本" />
```

### 禁用和只读

通过 `readonly` 将输入框设置为只读状态，通过 `disabled` 将输入框设置为禁用状态。

```html
<c-input disabled modelValue="123" /> <c-input readonly modelValue="123" />
```

### 格式化输入内容

通过 `formatter` 属性可以对输入的内容进行格式化，通过 `format-trigger` 属性可以指定执行格式化的时机，默认在输入时进行格式化。

```html
<c-input
  v-model="value1"
  :formatter="formatter"
  placeholder="在输入时执行格式化"
/>
<c-input
  v-model="value2"
  :formatter="formatter"
  placeholder="在失焦时执行格式化"
  format-trigger="onBlur"
/>
```

```js
import { reactive } from 'vue';

export default {
  setup() {
    const state = reactive({
      value1: '',
      value2: '',
    });
    // 过滤输入的数字
    const formatter = (value) => value.replace(/\d/g, '');

    return {
      state,
      formatter,
    };
  },
};
```

### 显示图标

通过 `prefix` 和 `suffix` 配置输入框两侧的图标。

```html
<c-input suffix="question" /> <c-input prefix="search" />
```

### 多行文本

设置 `type` 属性为 `textarea` 设置为多行文本框。

```html
<c-input rows="2" type="textarea" autosize />
```

### 插入按钮

通过 `addon` 插槽可以在输入框尾部插入按钮。

```html
<c-input>
  <template #addon>
    <c-button type="primary" size="large" icon="copy" />
  </template>
</c-input>
```

### 错误状态

通过 `required` 属性标记为必填项。

```html
<c-input error placeholder="请输入文本" />
```

### 必填项

通过 `required` 属性标记为必填项。

```html
<c-input required placeholder="Phone" />
```

## API

### Props

| 参数           | 说明                                                                                                        | 类型                      | 默认值     |
| -------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------- | ---------- |
| v-model        | 当前输入的值                                                                                                | _number \| string_        | -          |
| name           | 名称，提交表单的标识符                                                                                      | _string_                  | -          |
| type           | 输入框类型, 可选值为 `tel` `digit`<br>`number` `textarea` `password` 等                                     | _string_                  | `text`     |
| size           | 输入框尺寸, 可选值为 `small`                                                                                | _string_                  | `normal`   |
| maxlength      | 输入的最大字符数                                                                                            | _number \| string_        | -          |
| placeholder    | 输入框占位提示文字                                                                                          | _string_                  | -          |
| style          | 自定义容器样式                                                                                              | _object_                  | -          |
| disabled       | 是否禁用输入框                                                                                              | _boolean_                 | `false`    |
| required       | 是否显示必填项标记                                                                                          | _boolean_                 | `false`    |
| error          | 是否显示为错误状态                                                                                          | _boolean_                 | `false`    |
| readonly       | 是否为只读状态，只读状态下无法输入内容                                                                      | _boolean_                 | `false`    |
| formatter      | 输入内容格式化函数                                                                                          | _(val: string) => string_ | -          |
| format-trigger | 格式化函数触发的时机，可选值为 `onBlur`                                                                     | _string_                  | `onChange` |
| autofocus      | 是否自动聚焦，iOS 系统不支持该属性                                                                          | _boolean_                 | `false`    |
| autosize       | 是否自适应内容高度，只对 textarea 有效，<br>可传入对象,如 { maxHeight: 100, minHeight: 50 }，<br>单位为`px` | _boolean \| object_       | `false`    |
| prefix         | 左侧[图标名称](#/icon)或图片链接                                                                            | _string_                  | -          |
| suffix         | 右侧[图标名称](#/icon)或图片链接                                                                            | _string_                  | -          |
| autocomplete   | input 标签原生的[自动完成属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)   | _string_                  | -          |

### Events

| 事件               | 说明                 | 回调参数                       |
| ------------------ | -------------------- | ------------------------------ |
| update:model-value | 输入框内容变化时触发 | _value: string (当前输入的值)_ |
| change             | 输入框内容变化时触发 | _event: Event_                 |
| focus              | 输入框获得焦点时触发 | _event: Event_                 |
| blur               | 输入框失去焦点时触发 | _event: Event_                 |
| click-prefix       | 点击左侧图标时触发   | _event: MouseEvent_            |
| click-suffix       | 点击右侧图标时触发   | _event: MouseEvent_            |
| click-addon        | 点击尾部按钮时触发   | _event: MouseEvent_            |

### 方法

通过 ref 可以获取到 Input 实例并调用实例方法。

| 方法名 | 说明           | 参数 | 返回值 |
| ------ | -------------- | ---- | ------ |
| focus  | 获取输入框焦点 | -    | -      |
| blur   | 取消输入框焦点 | -    | -      |

### Slots

| 名称   | 说明                 |
| ------ | -------------------- |
| prefix | 自定义输入框头部图标 |
| suffix | 自定义输入框尾部按钮 |
| addon  | 自定义输入框尾部按钮 |
