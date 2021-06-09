<template>
  <demo-block card>
    <van-cell center title="基础用法">
      <c-stepper v-model="stepper"></c-stepper>
    </van-cell>
  </demo-block>
</template>
<script>
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      stepper: 1,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
