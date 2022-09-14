<template>
  <demo-block title="自定义颜色">
    <c-loading color="#1989fa" />
  </demo-block>

  <demo-block title="自定义大小">
    <c-loading size="24" />
  </demo-block>
</template>

<script setup lang="ts"></script>

<style lang="less">
.demo-loading {
  background: #fff;
  color: #333;

  .c-loading {
    display: inline-block;
    margin: 5px 0 5px 20px;
  }
}
</style>
