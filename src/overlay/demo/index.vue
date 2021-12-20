<template>
  <demo-block title="基础用法">
    <c-button type="primary" style="margin-left: 16px" @click="show = true"
      >显示遮罩层</c-button
    >
    <c-overlay :show="show" @click="show = false" />
  </demo-block>

  <demo-block title="嵌入内容">
    <c-button
      type="primary"
      style="margin-left: 16px"
      @click="showEmbedded = true"
      >嵌入内容</c-button
    >
    <c-overlay :show="showEmbedded" @click="showEmbedded = false">
      <div class="wrapper">
        <div class="block" />
      </div>
    </c-overlay>
  </demo-block>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import '@cupshe/fonts';

export default {
  setup() {
    const state = reactive({
      show: false,
      showEmbedded: false,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-overlay {
  background: @white;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: @white;
    border-radius: 4px;
  }
}
</style>
