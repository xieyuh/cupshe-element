<template>
  <demo-block title="基础用法">
    <c-breadcrumb :routes="routes1" />
  </demo-block>

  <demo-block title="使用链接">
    <c-breadcrumb :routes="routes2" />
  </demo-block>

  <demo-block title="自定义渲染">
    <c-breadcrumb :routes="routes1">
      <template #item="{ route, separator }">
        <span class="c-breadcrumb__item">
          <c-icon style="margin-right: 5px" name="like" />
          <span>{{ route.name }}</span>
          <span class="c-breadcrumb__separator">{{ separator }}</span>
        </span>
      </template>
    </c-breadcrumb>
  </demo-block>
</template>

<script lang="ts" setup>
const routes1 = [
  { name: 'Home' },
  { name: 'New In' },
  { name: 'Product name' },
];
const routes2 = [
  { name: 'Home', href: '/' },
  { name: 'New In', href: '/' },
  { name: 'Product name', href: '/' },
];
</script>

<style lang="less">
.demo-breadcrumb {
  background: #fff;

  .c-breadcrumb {
    margin-left: 16px;
  }
}
</style>
