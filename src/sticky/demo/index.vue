<template>
  <demo-block title="基础用法">
    <c-sticky>
      <c-button type="primary" style="margin-left: 15px"> 基础用法 </c-button>
    </c-sticky>
  </demo-block>

  <demo-block title="吸顶距离">
    <c-sticky :offset-top="50">
      <c-button type="primary" style="margin-left: 115px"> 吸顶距离 </c-button>
    </c-sticky>
  </demo-block>

  <demo-block title="指定容器">
    <div ref="container" style="height: 150px; background-color: #fff">
      <c-sticky :container="container">
        <c-button type="warning" style="margin-left: 215px">
          指定容器
        </c-button>
      </c-sticky>
    </div>
  </demo-block>

  <demo-block title="吸底距离">
    <div style="height: 200px"></div>
    <c-sticky :offset-bottom="50" position="bottom">
      <c-button type="primary" style="margin-left: 15px"> 吸底距离 </c-button>
    </c-sticky>
  </demo-block>
</template>

<script setup>
import '@cupshe/fonts';
</script>

<style lang="less">
.demo-sticky {
  height: 200vh;

  .c-button {
    margin-left: 16px;
  }
}
</style>
