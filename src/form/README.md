# Form 表单

### 介绍

用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型。[PC 端预览](/mobile.html#/form)

### 引入

通过以下方式来全局注册组件。

```js
import { createApp } from 'vue';
import { Form, FormItem } from 'cupshe-element';

const app = createApp();
app.use(Form);
app.use(FormItem);
```

## 代码演示

### 基础用法

在表单中，每个 `FormItem` 组件代表一个表单项，使用 FormItem 的 `rules` 属性定义校验规则。

```html
<c-form @submit="onSubmit">
  <c-form-item
    name="username"
    :rules="[{ required: true, message: 'username is required' }]"
  >
    <c-input v-model="state.username" placeholder="Username" />
  </c-form-item>
  <c-form-item
    name="password"
    :rules="[{ required: true, message: 'password is required' }]"
  >
    <c-input v-model="state.password" placeholder="Password" />
  </c-form-item>
  <c-form-item
    name="gender"
    :rules="[{ required: true, message: 'gender is required' }]"
  >
    <c-select
      v-model="state.gender"
      placeholder="Gender"
      style="width: 100%"
      :options="[
            {
              text: 'male',
              value: 'male',
            },
            {
              text: 'female',
              value: 'female',
            },
          ]"
    />
  </c-form-item>
  <c-button type="primary" native-type="submit" block size="larget">
    SUBMIT
  </c-button>
</c-form>
```

```js
import { reactive } from 'vue';

export default {
  setup() {
    const state = reactive({
      username: '',
      password: '',
      gender: '',
    });

    const onSubmit = (value) => {
      console.log(value);
    };

    return {
      state,
      onSubmit,
    };
  },
};
```

### 表单布局

表单提供 `horizontal` 和 `vertical` 两种布局模式。

```html
<c-form
  :layout="state.layout"
  :label-align="state.align"
  :label-col="{ span: 6 }"
  :wrapper-col="{ span: 18 }"
  colon
>
  <c-form-item name="layout" label="layout">
    <c-radio-group direction="horizontal" v-model="state.layout">
      <c-radio name="horizontal">horizontal</c-radio>
      <c-radio name="vertical">vertical</c-radio>
    </c-radio-group>
  </c-form-item>
  <c-form-item name="align" label="align">
    <c-radio-group direction="horizontal" v-model="state.align">
      <c-radio name="left">left</c-radio>
      <c-radio name="right">right</c-radio>
    </c-radio-group>
  </c-form-item>
  <c-form-item name="username" label="username">
    <c-input v-model="state.username" placeholder="Username" />
  </c-form-item>
</c-form>
```

```js
import { reactive } from 'vue';

export default {
  setup() {
    const state = reactive({
      layout: 'horizontal',
      align: 'left',
      username: '',
    });

    return {
      state,
    };
  },
};
```

### 实例调用

通过 `ref` 保存组件实例，可以在适当的时候调用实例上的方法。

```html
<c-form ref="form">
  <c-form-item
    name="username"
    :rules="[{ required: true, message: 'username is required' }]"
  >
    <c-input
      v-model="state.username"
      style="width: 100%"
      placeholder="Username"
    />
  </c-form-item>
  <c-form-item
    name="password"
    :rules="[{ required: true, message: 'username is required' }]"
  >
    <c-input
      v-model="state.password"
      style="width: 100%"
      placeholder="Password"
    />
  </c-form-item>
  <c-button block type="primary" @click="onSubmit">SUBMIT</c-button>
</c-form>
```

```js
import { reactive, ref } from 'vue';

export default {
  setup() {
    const form = ref();

    const state = reactive({
      username: '',
      password: '',
    });

    const onSubmit = () => {
      form.value
        .validate()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      form,
      state,
      onSubmit,
    };
  },
};
```

## API

### Props

| 参数               | 说明                                                                                              | 类型                 | 默认值     |
| ------------------ | ------------------------------------------------------------------------------------------------- | -------------------- | ---------- |
| label-align        | 表单项 label 对齐方式，可选值为 `right`                                                           | _string_             | `left`     |
| validate-trigger   | 表单校验触发时机，可选值为 `onChange`、`onSubmit`，支持通过数组同时设置多个值，具体用法见下方表格 | _string \| string[]_ | `onBlur`   |
| colon              | 是否在 label 后面添加冒号                                                                         | _boolean_            | `false`    |
| validate-first     | 是否在某一项校验不通过时停止校验                                                                  | _boolean_            | `false`    |
| scroll-to-error    | 是否在提交表单且校验不通过时滚动至错误的表单项                                                    | _boolean_            | `false`    |
| show-error-message | 是否在校验不通过时在输入框下方展示错误提示                                                        | _boolean_            | `true`     |
| layout             | 表单项布局方式，可选值为 `horizontal`                                                             | _string_             | `vertical` |
| label-col          | label 标签布局方式，同 `<c-col>` 组件                                                             | _Object_             | -          |
| wrapper-col        | 输入控件布局方式，用法同 label-col                                                                | _Object_             | -          |

### FormItem Props

| 参数          | 说明                                    | 类型      | 默认值     |
| ------------- | --------------------------------------- | --------- | ---------- |
| name          | 名称，作为提交表单时的标识符            | _string_  | -          |
| colon         | 是否在 label 后面添加冒号               | _boolean_ | `false`    |
| label         | 表单项标签文案                          | _string_  | -          |
| label-align   | 表单项 label 对齐方式，可选值为 `right` | _string_  | `left`     |
| rules         | 表单校验规则                            | _Rule[]_  | -          |
| require-mark  | 是否展示必填标记                        | _boolean_ | `false`    |
| error-message | 表单项错误文案                          | _string_  | -          |
| layout        | 表单项布局方式，可选值为 `horizontal`   | _string_  | `vertical` |
| label-col     | label 标签布局方式，同 `<c-col>` 组件   | _Object_  | -          |
| wrapper-col   | 输入控件布局方式，用法同 label-col      | _Object_  | -          |

### Rule 数据结构

使用 FormItem 的`rules`属性可以定义校验规则，可选属性如下:

| 键名      | 说明                                                                       | 类型                                            |
| --------- | -------------------------------------------------------------------------- | ----------------------------------------------- |
| required  | 是否为必选字段，当值为空字符串、空数组、`undefined`、`null` 时，校验不通过 | _boolean_                                       |
| message   | 错误提示文案                                                               | _string \| (value, rule) => string_             |
| validator | 通过函数进行校验                                                           | _(value, rule) => boolean \| string \| Promise_ |
| pattern   | 通过正则表达式进行校验                                                     | _RegExp_                                        |
| trigger   | 本项规则的触发时机，可选值为 `onChange`、`onBlur`                          | _string_                                        |
| formatter | 格式化函数，将表单项的值转换后进行校验                                     | _(value, rule) => any_                          |

### validate-trigger 可选值

通过 `validate-trigger` 属性可以自定义表单校验的触发时机。

| 值       | 描述                                 |
| -------- | ------------------------------------ |
| onSubmit | 仅在提交表单时触发校验               |
| onBlur   | 在提交表单和输入框失焦时触发校验     |
| onChange | 在提交表单和输入框内容变化时触发校验 |

### Events

| 事件名 | 说明                       | 回调参数                                          |
| ------ | -------------------------- | ------------------------------------------------- |
| submit | 提交表单且验证通过后触发   | _values: object_                                  |
| failed | 提交表单且验证不通过后触发 | _errorInfo: { values: object, errors: object[] }_ |

### 方法

通过 ref 可以获取到 Form 实例并调用实例方法。

| 方法名              | 说明                                                                                                       | 参数                                | 返回值                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------- | ----------------------------------------- |
| submit              | 提交表单，与点击提交按钮的效果等价                                                                         | -                                   | -                                         |
| getValues           | 获取所有表单项当前的值                                                                                     | -                                   | _Record<string, unknown>_                 |
| validate            | 验证表单，支持传入一个或多个 `name` 来验证单个或部分表单项，不传入 `name` 时，会验证所有表单项             | _name?: string \| string[]_         | _Promise\<void\>_                         |
| resetValidation     | 重置表单项的验证提示，支持传入一个或多个 `name` 来重置单个或部分表单项，不传入 `name` 时，会重置所有表单项 | _name?: string \| string[]_         | -                                         |
| getValidationStatus | 获取所有表单项的校验状态，状态包括 `passed`、`failed`、`unvalidated`                                       | -                                   | _Record\<string, FieldValidationStatus\>_ |
| scrollToField       | 滚动到对应表单项的位置，默认滚动到顶部，第二个参数传 false 可滚动至底部                                    | _name: string, alignToTop: boolean_ | -                                         |

### 类型定义

组件导出以下类型定义：

```ts
import type { FormProps, FormInstance } from 'cupshe-element';
```

`FormInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue';
import type { FormInstance } from 'cupshe-element';

const formRef = ref<FormInstance>();

formRef.value?.submit();
```

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 表单内容 |
