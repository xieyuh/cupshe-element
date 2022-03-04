<template>
  <demo-block title="基础用法">
    <c-progress :percentage="50" text="progress1" />
  </demo-block>

  <demo-block title="线条粗细">
    <c-progress :percentage="50" stroke-width="12" text="progress2" />
  </demo-block>

  <demo-block title="样式定制">
    <c-progress color="#ee0a24" :percentage="50" text="progress4" />
    <c-progress
      :percentage="75"
      color="linear-gradient(to right, #be99ff, #7232dd)"
      text="progress5"
    />
  </demo-block>

  <demo-block title="自定义内容">
    <c-progress :percentage="100" text="progres6">
      <template #text>
        <c-icon name="star" />
      </template>
    </c-progress>
    <c-progress :percentage="75" text="progress7">
      <template #percentage>cool!</template>
    </c-progress>
  </demo-block>
</template>

<script setup lang="ts">
import '@cupshe/fonts';
</script>

<style lang="less">
.demo-progress {
  background: #fff;

  .c-progress {
    margin: 20px;

    &:first-of-type {
      margin-top: 5px;
    }
  }
}
</style>
