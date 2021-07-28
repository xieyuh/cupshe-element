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

### 禁用和只读

通过 `readonly` 将输入框设置为只读状态，通过 `disabled` 将输入框设置为禁用状态。

```html
<c-input disabled modelValue="123" /> <c-input readonly modelValue="123" />
```

### 显示图标

通过 `prefix` 和 `suffix` 配置输入框两侧的图标。

```html
<c-input suffix="question" /> <c-input prefix="search" />
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

## API

### Props

| 参数         | 说明                                                                                                      | 类型               | 默认值  |
| ------------ | --------------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| v-model      | 当前输入的值                                                                                              | _number \| string_ | -       |
| maxlength    | 输入的最大字符数                                                                                          | _number \| string_ | -       |
| placeholder  | 输入框占位提示文字                                                                                        | _string_           | -       |
| style        | 自定义容器样式                                                                                            | _object_           | -       |
| disabled     | 是否禁用输入框                                                                                            | _boolean_          | `false` |
| readonly     | 是否为只读状态，只读状态下无法输入内容                                                                    | _boolean_          | `false` |
| autofocus    | 是否自动聚焦，iOS 系统不支持该属性                                                                        | _boolean_          | `false` |
| prefix       | 左侧[图标名称](#/icon)或图片链接                                                                          | _string_           | -       |
| suffix       | 右侧[图标名称](#/icon)或图片链接                                                                          | _string_           | -       |
| autocomplete | input 标签原生的[自动完成属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) | _string_           | -       |

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
