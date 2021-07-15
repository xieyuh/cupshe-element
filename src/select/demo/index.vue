<template>
  <demo-block title="基本用法">
    <div class="demo-input-row">
      <c-select
        v-model:value="value"
        placeholder="please select"
        :options="option"
      ></c-select>
    </div>
  </demo-block>
  <demo-block title="斑马线风格">
    <div class="demo-input-row">
      <c-select
        v-model:value="value"
        placeholder="please select"
        :options="option"
        type="zebra"
      ></c-select>
    </div>
  </demo-block>
</template>
<script>
import { toRefs, reactive } from '@vue/reactivity';

export default {
  setup() {
    const state = reactive({
      value: '',
      option: [
        {
          label: 111,
          value: 1,
        },
        {
          label: 222,
          value: 2,
        },
      ],
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
