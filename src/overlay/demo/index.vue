<template>
  <demo-block title="基础用法">
    <c-button
      type="primary"
      style="margin-left: 16px"
      @click="state.show = true"
    >
      显示遮罩层
    </c-button>
    <c-overlay :show="state.show" @click="state.show = false" />
  </demo-block>

  <demo-block title="嵌入内容">
    <c-button
      type="primary"
      style="margin-left: 16px"
      @click="state.showEmbedded = true"
    >
      嵌入内容
    </c-button>
    <c-overlay :show="state.showEmbedded" @click="state.showEmbedded = false">
      <div class="wrapper">
        <div class="block" />
      </div>
    </c-overlay>
  </demo-block>

  <demo-block title="自定义动画">
    <c-button
      type="primary"
      style="margin-left: 16px"
      @click="state.showTransiton = true"
    >
      自定义动画
    </c-button>
    <c-overlay
      transition="c-slide-up"
      :show="state.showTransiton"
      @click="state.showTransiton = false"
    >
      <div class="wrapper">
        <div class="block" />
      </div>
    </c-overlay>
  </demo-block>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const state = reactive({
  show: false,
  showEmbedded: false,
  showTransiton: false,
});
</script>

<style lang="less">
.demo-overlay {
  background: #fff;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
    border-radius: 4px;
  }
}
</style>
