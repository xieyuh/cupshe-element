<template>
  <demo-block title="基本用法">
    <div class="demo-input-row">
      <c-input
        v-model="value"
        placeholder="your name"
        :maxlength="10"
      ></c-input>
    </div>
  </demo-block>
  <demo-block title="多行文本">
    <div class="demo-input-row">
      <c-input
        v-model="value1"
        type="textarea"
        placeholder="your name"
        :rows="3"
        :cols="3"
      ></c-input>
    </div>
  </demo-block>
  <demo-block title="禁用输入框">
    <div class="demo-input-row">
      <c-input default-value="禁用" disabled></c-input>
    </div>
    <div class="demo-input-row">
      <c-input default-value="只读" readonly></c-input>
    </div>
  </demo-block>
</template>
<script>
import { toRefs, reactive } from '@vue/reactivity';

export default {
  setup() {
    const state = reactive({
      value: '',
      value1: '',
    });
    return {
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
