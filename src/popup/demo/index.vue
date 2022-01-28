<template>
  <demo-block card title="基础用法">
    <c-cell title="展示弹出层" is-link @click="showBasic = true" />
    <c-popup v-model:show="showBasic" :style="{ padding: '30px 50px' }">
      内容
    </c-popup>
  </demo-block>
  <demo-block card title="弹出位置">
    <c-cell title="顶部弹出" is-link @click="showTop = true" />
    <c-cell title="底部弹出" is-link @click="showBottom = true" />
    <c-cell title="左侧弹出" is-link @click="showLeft = true" />
    <c-cell title="右侧弹出" is-link @click="showRight = true" />

    <c-popup v-model:show="showTop" position="top" :style="{ height: '30%' }" />
    <c-popup
      v-model:show="showBottom"
      position="bottom"
      :style="{ height: '30%' }"
    />
    <c-popup
      v-model:show="showLeft"
      position="left"
      :style="{ width: '30%' }"
    />
    <c-popup
      v-model:show="showRight"
      position="right"
      :style="{ width: '30%' }"
    />
  </demo-block>

  <demo-block card title="关闭图标">
    <c-cell title="关闭图标" is-link @click="showCloseIcon = true" />
    <c-cell title="自定义图标" is-link @click="showCustomCloseIcon = true" />
    <c-cell
      title="自定义关闭元素"
      is-link
      @click="showCustomCloseElement = true"
    />
    <c-cell title="图标位置" is-link @click="showCustomIconPosition = true" />

    <c-popup
      v-model:show="showCloseIcon"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
    />
    <c-popup
      v-model:show="showCustomCloseIcon"
      closeable
      close-icon="tick"
      position="bottom"
      :style="{ height: '30%' }"
    />
    <c-popup
      v-model:show="showCustomCloseElement"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <template #icon>
        <span>close</span>
      </template>
    </c-popup>
    <c-popup
      v-model:show="showCustomIconPosition"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '30%' }"
    />
  </demo-block>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import '@cupshe/fonts';

export default {
  setup() {
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

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-popup {
  .c-row {
    margin-bottom: @padding-md;
  }

  .c-button {
    margin-left: @padding-md;
  }
}
</style>
