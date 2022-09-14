<template>
  <demo-block card title="基础用法">
    <c-cell title="展示弹出层" is-link @click="state.showBasic = true" />
    <c-popup v-model:show="state.showBasic" :style="{ padding: '30px 50px' }">
      内容
    </c-popup>
  </demo-block>
  <demo-block card title="弹出位置">
    <c-cell title="顶部弹出" is-link @click="state.showTop = true" />
    <c-cell title="底部弹出" is-link @click="state.showBottom = true" />
    <c-cell title="左侧弹出" is-link @click="state.showLeft = true" />
    <c-cell title="右侧弹出" is-link @click="state.showRight = true" />

    <c-popup
      v-model:show="state.showTop"
      position="top"
      :style="{ height: '30%' }"
    />
    <c-popup
      v-model:show="state.showBottom"
      position="bottom"
      :style="{ height: '30%' }"
    />
    <c-popup
      v-model:show="state.showLeft"
      position="left"
      :style="{ width: '30%' }"
    />
    <c-popup
      v-model:show="state.showRight"
      position="right"
      :style="{ width: '30%' }"
    />
  </demo-block>

  <demo-block card title="关闭图标">
    <c-cell title="关闭图标" is-link @click="state.showCloseIcon = true" />
    <c-cell
      title="自定义图标"
      is-link
      @click="state.showCustomCloseIcon = true"
    />
    <c-cell
      title="自定义关闭元素"
      is-link
      @click="state.showCustomCloseElement = true"
    />
    <c-cell
      title="图标位置"
      is-link
      @click="state.showCustomIconPosition = true"
    />

    <c-popup
      v-model:show="state.showCloseIcon"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
    />
    <c-popup
      v-model:show="state.showCustomCloseIcon"
      closeable
      close-icon="tick"
      position="bottom"
      :style="{ height: '30%' }"
    />
    <c-popup
      v-model:show="state.showCustomCloseElement"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <template #icon>
        <span>close</span>
      </template>
    </c-popup>
    <c-popup
      v-model:show="state.showCustomIconPosition"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '30%' }"
    />
  </demo-block>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const state = reactive({
  showBasic: false,
  showTop: false,
  showBottom: false,
  showLeft: false,
  showRight: false,
  showCloseIcon: false,
  showCustomCloseElement: false,
  showRoundCorner: false,
  showGetContainer: false,
  showCustomCloseIcon: false,
  showCustomIconPosition: false,
});
</script>

<style lang="less">
.demo-popup {
  .c-row {
    margin-bottom: 16px;
  }

  .c-button {
    margin-left: 16px;
  }
}
</style>
