<template>
  <demo-block title="基础用法">
    <c-pagination
      style="margin-left: 15px"
      :page-count="18"
      v-model="current"
    ></c-pagination>
  </demo-block>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const current = ref(1);

    return {
      current,
    };
  },
};
</script>
