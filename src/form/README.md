# Form 表单

### 介绍

高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。[PC 端预览](/mobile.html#/form)

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Form, FormItem } from 'cupshe-element';

const app = createApp();
app.use(Form);
app.use(FormItem);
```

## 代码演示

### 基础用法

基本的表单数据域控制展示，包含布局、初始化、验证、提交。

```html
<c-form
  ref="formRef"
  :model="formModel"
  :rules="formRules"
  :label-col="labelCol"
  :wrapper-col="wrapperCol"
>
  <c-form-item name="name" label="Activity name" required>
    <c-input v-model:value="formModel.name"></c-input>
  </c-form-item>
  <c-form-item name="region" label="Activity zone">
    <c-select
      v-model:value="formModel.region"
      placeholder="please select your zone"
      :options="selectOption"
    ></c-select>
  </c-form-item>
  <c-form-item name="type" label="Activity type">
    <c-checkbox-group v-model="formModel.type">
      <c-checkbox name="1">Online</c-checkbox>
      <c-checkbox name="2">Promotion</c-checkbox>
      <c-checkbox name="3">Offline</c-checkbox>
    </c-checkbox-group>
  </c-form-item>
  <c-form-item :wrapper-col="{ span: 12, offset: 5 }">
    <c-button small type="primary" @click="submit">submit</c-button>
  </c-form-item>
</c-form>
```

```js
<script>
import { toRefs, reactive, ref } from '@vue/reactivity';

export default {
  setup() {
    const formRef = ref(null);
    const state = reactive({
      formModel: {
        name: '',
        region: '',
        type: ''
      },
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      selectOption:[
        {
          label: 'zone 1',
          value: 'shanghai',
        },
        {
          label: 'zone 2',
          value: 'beijing',
        }
      ],
      formRules: {
        name: [
          {
            required: true,
            message: '必填',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 5,
            message: '必须3-5之间',
            trigger: 'blur',
          },
        ],
        region: [
          {
            required: true,
            message: '必填',
            trigger: 'change',
          }
        ],
        type: [
          {
            required: true,
            message: '必填',
            trigger: 'change',
          }
        ],
      },
    });
    const submit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('校验成功');
        })
        .catch(() => {
          console.log('校验失败');
        });
    };
    return {
      submit,
      formRef,
      ...toRefs(state),
    };
  },
};
</script>

```
