<template>
  <demo-block :title="t('basicUsage')">
    <c-button
      type="primary"
      :text="t('showOverlay')"
      style="margin-left: 16px"
      @click="show = true"
    />
    <c-overlay :show="show" @click="show = false" />
  </demo-block>

  <demo-block :title="t('embeddedContent')">
    <c-button
      type="primary"
      :text="t('embeddedContent')"
      style="margin-left: 16px"
      @click="showEmbedded = true"
    />
    <c-overlay :show="showEmbedded" @click="showEmbedded = false">
      <div class="wrapper">
        <div class="block" />
      </div>
    </c-overlay>
  </demo-block>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';

const t = (m: string) => {
  const map = {
    showOverlay: '显示遮罩层',
    embeddedContent: '嵌入内容',
  };
  return map[m];
};

export default {
  setup() {
    const state = reactive({
      show: false,
      showEmbedded: false,
    });

    return {
      ...toRefs(state),
      t,
    };
  },
};
</script>

<style lang="less" scoped>
@import '../../style/var';
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
</style>
