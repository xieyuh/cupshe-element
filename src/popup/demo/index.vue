<template>
  <demo-block card title="基础用法">
    <c-button @click="showBasic = true">基础用法</c-button>
    <c-popup
      position="right"
      v-model:show="showBasic"
      :style="{ width: '30%', height: '100%' }"
    >
      内容
    </c-popup>
  </demo-block>
</template>
<script>
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      showBasic: false,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
