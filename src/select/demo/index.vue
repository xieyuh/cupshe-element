<template>
  <demo-block title="基础用法">
    <c-select :options="option" v-model="select1" placeholder="124" />
  </demo-block>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      option: [
        {
          text: 1,
          value: 1,
        },
        {
          text: 2,
          value: 2,
        },
      ],
      select1: '',
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less">
.demo-select {
  .c-select {
    margin-left: 20px;
  }
}
</style>
