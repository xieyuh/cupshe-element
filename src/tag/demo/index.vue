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

  <demo-block title="可关闭标签">
    <c-tag closeable :show="value3" @close="onClose">标签</c-tag>
  </demo-block>
</template>

<script setup>
import { ref } from 'vue';

const value0 = ref(false);
const value1 = ref(false);
const value3 = ref(true);

const onClose = () => {
  value3.value = false;
};
</script>

<style lang="less">
.demo-tag {
  background: #fff;

  .c-tag {
    margin-left: 20px;
  }

  .checked {
    color: #fff;
    background-color: #000;
  }
}
</style>
