<template>
  <demo-block title="基础用法">
    <c-pagination v-model="current1" :page-count="5" />
  </demo-block>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      current1: 1,
      current2: 1,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
