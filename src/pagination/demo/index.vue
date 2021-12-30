<template>
  <demo-block title="基础用法">
    <c-pagination v-model="state.current1" :page-count="5" />
  </demo-block>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import '@cupshe/fonts';

const state = reactive({
  current1: 1,
  current2: 1,
});
</script>

<style>
.demo-pagination {
  background: #fff;
}
</style>
