<template>
  <demo-block title="基础用法">
    <van-row>
      <c-col span="8">span: 8</c-col>
      <c-col span="8">span: 8</c-col>
      <c-col span="8">span: 8</c-col>
    </van-row>

    <van-row>
      <c-col span="4">span: 4</c-col>
      <c-col span="10" offset="4"> offset: 4, span: 10 </c-col>
    </van-row>

    <van-row>
      <c-col offset="12" span="12"> offset: 12, span: 12 </c-col>
    </van-row>
  </demo-block>

  <demo-block title="在列元素之间增加间距">
    <van-row gutter="20">
      <c-col span="8">span: 8</c-col>
      <c-col span="8">span: 8</c-col>
      <c-col span="8">span: 8</c-col>
    </van-row>
  </demo-block>

  <demo-block v-if="!isWeapp" title="对齐方式">
    <van-row justify="center">
      <c-col span="6">span: 6</c-col>
      <c-col span="6">span: 6</c-col>
      <c-col span="6">span: 6</c-col>
    </van-row>

    <van-row justify="end">
      <c-col span="6">span: 6</c-col>
      <c-col span="6">span: 6</c-col>
      <c-col span="6">span: 6</c-col>
    </van-row>

    <van-row justify="space-between">
      <c-col span="6">span: 6</c-col>
      <c-col span="6">span: 6</c-col>
      <c-col span="6">span: 6</c-col>
    </van-row>

    <van-row justify="space-around">
      <c-col span="6">span: 6</c-col>
      <c-col span="6">span: 6</c-col>
      <c-col span="6">span: 6</c-col>
    </van-row>
  </demo-block>
</template>
<style lang="less">
@import '../../style/var';

.demo-col {
  background: @white;

  .van-doc-demo-block {
    padding: 0 @padding-md;
  }

  .van-doc-demo-block__title {
    padding-left: 0;
  }

  .c-col {
    margin-bottom: 10px;
    color: @white;
    font-size: 13px;
    line-height: 30px;
    text-align: center;
    background-clip: content-box;

    &:nth-child(odd) {
      background-color: #39a9ed;
    }

    &:nth-child(even) {
      background-color: #66c6f2;
    }
  }
}
</style>
