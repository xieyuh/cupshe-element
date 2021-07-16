<template>
  <demo-block title="基本用法">
    <div class="demo-input-row">
      <c-form
        ref="formRef"
        :model="formModel"
        :rules="formRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <c-form-item name="name" required>
          <template #label>
            <span> 用户名 </span>
          </template>
          <c-input v-model:value="formModel.name"></c-input>
        </c-form-item>
        <c-fom-item>
          <c-button @click="submit">44444</c-button>
        </c-fom-item>
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
        name: '1',
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
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
      },
    });
    const submit = () => {
      formRef.value
        .validate()
        .then(() => {
          alert('校验成功');
        })
        .catch(() => {
          alert('校验失败');
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

.demo-input {
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
