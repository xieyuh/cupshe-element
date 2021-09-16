<template>
  <demo-block title="成功">
    <c-alert type="success"> Global success prompt. </c-alert>
    <c-alert type="success">
      Multi-line successful copywriting multi-line successful copywriting.
    </c-alert>
    <c-alert type="success" title="Title">
      Multi-line successful copywriting multi-line successful copywriting.
    </c-alert>
  </demo-block>
  <demo-block title="失败">
    <c-alert type="error"> Incorrect email or password. </c-alert>
    <c-alert type="error">
      Multi-line successful copywriting multi-line successful copywriting.
    </c-alert>
    <c-alert type="error" title="Title">
      Multi-line successful copywriting multi-line successful copywriting.
    </c-alert>
  </demo-block>
  <demo-block title="提示">
    <c-alert type="info"> Global success prompt. </c-alert>
    <c-alert type="info">
      Multi-line successful copywriting multi-line successful copywriting.
    </c-alert>
    <c-alert type="info" title="Title">
      Multi-line successful copywriting multi-line successful copywriting.
    </c-alert>
  </demo-block>
  <demo-block title="释义">
    <c-alert type="default"> Global success prompt. </c-alert>
    <c-alert type="default">
      Multi-line successful copywriting multi-line successful copywriting.
    </c-alert>
    <c-alert type="default" title="Title">
      Multi-line successful copywriting multi-line successful copywriting.
    </c-alert>
  </demo-block>
</template>

<style lang="less">
.demo-alert {
  background: #fff;

  .c-alert {
    margin: 0 16px 16px;
  }
}
</style>
