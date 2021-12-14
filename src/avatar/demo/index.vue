<template>
  <demo-block title="基础用法">
    <c-avatar text="User" />
  </demo-block>

  <demo-block title="徽标提示">
    <c-avatar text="User" badge />
  </demo-block>

  <demo-block title="自定义样式">
    <c-avatar text="User" color="#52c41a" text-color="#fff" />
    <c-avatar text="User" color="#188ffe" text-color="#fff" />
  </demo-block>
</template>

<script setup>
import '@cupshe/fonts';
</script>

<style lang="less">
.demo-avatar {
  .c-avatar {
    margin-left: 20px;
  }
}
</style>
