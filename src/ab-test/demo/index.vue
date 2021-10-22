<template>
  <demo-block title="基础用法">
    <div class="ab-test">
      <c-ab-test>测试内容</c-ab-test>
      <c-ab-test token="test-1">测试内容</c-ab-test>
    </div>
  </demo-block>

  <demo-block title="监听变化">
    <div class="ab-test">
      <c-ab-test :token="token1" hot>测试内容</c-ab-test>
      <c-button @click="toggle" type="primary">切换显示</c-button>
    </div>
  </demo-block>
</template>

<script setup>
const token1 = 'token1';

const toggle = () => {
  const value = localStorage.getItem(token1);
  if (value === token1) {
    localStorage.removeItem(token1);
  } else {
    localStorage.setItem(token1, token1);
  }
};
</script>

<style lang="less">
.demo-ab-test {
  background: #fff;

  .ab-test {
    padding-left: 20px;
  }
}
</style>
