<template>
  <demo-block card title="弹出位置">
    <c-button style="margin-right: 15px" @click="showTop = true">顶部弹出</c-button>
    <c-button style="margin-right: 15px" @click="showBottom = true">底部弹出</c-button>
    <c-button style="margin-right: 15px" @click="showLeft = true">左侧弹出</c-button>
    <c-button @click="showRight = true">右侧弹出</c-button>
    <c-popup
      position="top"
      v-model:show="showTop"
      :style="{ width: '100%', height: '30%' }"
    >
      内容
    </c-popup>
    <c-popup
      position="bottom"
      v-model:show="showBottom"
      :style="{ width: '100%', height: '30%' }"
    >
      内容
    </c-popup>
    <c-popup
      position="left"
      v-model:show="showLeft"
      :style="{ width: '30%', height: '100%' }"
    >
      内容
    </c-popup>
    <c-popup
      position="right"
      v-model:show="showRight"
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
      showTop: false,
      showBottom: false,
      showLeft: false,
      showRight: false,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
