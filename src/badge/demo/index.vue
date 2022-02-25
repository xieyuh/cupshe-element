<script setup lang="ts">
import '@cupshe/fonts';
import CBadge from '..';
</script>

<template>
  <demo-block title="基础用法">
    <c-badge content="5">
      <div class="child" />
    </c-badge>
    <c-badge content="10">
      <div class="child" />
    </c-badge>
    <c-badge content="Hot">
      <div class="child" />
    </c-badge>
    <c-badge dot>
      <div class="child" />
    </c-badge>
  </demo-block>

  <demo-block title="最大值">
    <c-badge content="20" max="9">
      <div class="child" />
    </c-badge>
    <c-badge content="50" max="20">
      <div class="child" />
    </c-badge>
    <c-badge content="200" max="99">
      <div class="child" />
    </c-badge>
  </demo-block>

  <demo-block title="自定义颜色">
    <c-badge content="5" color="#1989fa">
      <div class="child" />
    </c-badge>
    <c-badge content="10" color="#1989fa">
      <div class="child" />
    </c-badge>
    <c-badge dot color="#1989fa">
      <div class="child" />
    </c-badge>
  </demo-block>

  <demo-block title="自定义徽标内容">
    <c-badge>
      <div class="child" />
      <template #content>!</template>
    </c-badge>
    <c-badge>
      <div class="child" />
      <template #content>?</template>
    </c-badge>
  </demo-block>

  <demo-block title="自定义徽标位置">
    <c-badge content="10" position="top-left">
      <div class="child" />
    </c-badge>
    <c-badge content="10" position="bottom-left">
      <div class="child" />
    </c-badge>
    <c-badge content="10" position="bottom-right">
      <div class="child" />
    </c-badge>
  </demo-block>

  <demo-block title="独立展示">
    <c-badge content="20" style="margin-left: 16px" />
    <c-badge content="200" max="99" style="margin-left: 16px" />
  </demo-block>
</template>

<style lang="less">
.demo-badge {
  background-color: #fafafa;

  .c-badge__wrapper {
    margin-left: 16px;
  }

  .child {
    width: 40px;
    height: 40px;
    background: #f2f3f5;
    border-radius: 4px;
  }

  .badge-icon {
    display: block;
    margin-left: 0;
    font-size: 10px;
    line-height: 16px;
  }
}
</style>
