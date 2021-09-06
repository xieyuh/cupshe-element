<template>
  <demo-block title="基础用法">
    <c-radio-group v-model="radio1" class="demo-radio-group">
      <c-radio name="1">单选框 1</c-radio>
      <c-radio name="2">单选框 2</c-radio>
    </c-radio-group>
  </demo-block>

  <demo-block title="水平排列">
    <c-radio-group
      v-model="radioHorizontal"
      class="demo-radio-group"
      direction="horizontal"
    >
      <c-radio name="1">单选框 1</c-radio>
      <c-radio name="2">单选框 2</c-radio>
    </c-radio-group>
  </demo-block>

  <demo-block title="禁用状态">
    <c-radio-group v-model="radio2" class="demo-radio-group" disabled>
      <c-radio name="1">单选框 1</c-radio>
      <c-radio name="2">单选框 2</c-radio>
    </c-radio-group>
  </demo-block>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      radio1: '1',
      radio2: '2',
      radio3: '1',
      radio4: '1',
      radio5: '1',
      radioLabel: '1',
      radioShape: '1',
      radioIconSize: '1',
      radioHorizontal: '1',
    });

    const onChange = (value: string) => {
      console.log(value);
    };

    return {
      ...toRefs(state),
      onChange,
    };
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-radio {
  background: @white;

  &-group {
    padding: 0 16px;
  }

  .c-doc-demo-block__title {
    margin-top: -8px;
  }
}
</style>
