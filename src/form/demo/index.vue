<template>
  <demo-block title="基本用法">
    <div class="demo-form-row">
      <c-form
        ref="formRef"
        :model="formModel"
        :rules="formRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <c-form-item name="name" label="Activity name" required>
          <c-input v-model="formModel.name"></c-input>
        </c-form-item>
        <c-form-item name="region" label="Activity zone">
          <c-select
            v-model="formModel.region"
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
    </div>
  </demo-block>
</template>
<script>
import { toRefs, reactive, ref } from '@vue/reactivity';

export default {
  setup() {
    const formRef = ref(null);
    const state = reactive({
      formModel: {
        name: '',
        region: '',
        type: '',
      },
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      selectOption: [
        {
          label: 'zone 1',
          value: 'shanghai',
        },
        {
          label: 'zone 2',
          value: 'beijing',
        },
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
          },
        ],
        type: [
          {
            required: true,
            message: '必填',
            trigger: 'change',
          },
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
<style lang="less">
@import '../../style/var';

.demo-form {
  background: @white;

  .van-doc-demo-block {
    padding: 0 @padding-md;
  }

  .van-doc-demo-block__title {
    padding-left: 0;
  }

  &-row {
    margin-bottom: 4px;
  }
}
</style>
