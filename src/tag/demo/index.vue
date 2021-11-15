<template>
  <demo-block title="基础用法">
    <c-tag v-model:checked="value0">Tag</c-tag>
    <c-tag v-model:checked="value1">
      <c-icon name="star" />
      Tag</c-tag
    >
  </demo-block>

  <demo-block title="不可选中">
    <c-tag :checkable="false">Tag</c-tag>
  </demo-block>

  <demo-block title="自定义样式">
    <c-tag checked-class="checked" v-model:checked="value2">Tag</c-tag>
  </demo-block>

  <demo-block title="可关闭标签">
    <c-tag closeable :show="show" v-model:checked="value3" @close="onClose"
      >标签</c-tag
    >
  </demo-block>
</template>

<script setup>
import { ref } from 'vue';

const value0 = ref(false);
const value1 = ref(false);
const value2 = ref(false);
const value3 = ref(false);
const show = ref(true);

const onClose = () => {
  show.value = false;
};
</script>

<style lang="less">
.demo-tag {
  background: #fff;

  .c-tag {
    margin-left: 20px;
  }

  .checked {
    background: #fff;
    border: 1px solid #000;
    color: #000;
    box-sizing: border-box;
  }
}
</style>
