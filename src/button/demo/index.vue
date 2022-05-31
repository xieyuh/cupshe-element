<template>
  <demo-block title="按钮类型">
    <div>
      <c-button type="primary">主要按钮</c-button>
      <c-button type="default">默认按钮</c-button>
    </div>
  </demo-block>

  <demo-block title="透明按钮">
    <c-button ghost type="primary">透明按钮</c-button>
  </demo-block>

  <demo-block title="禁用状态">
    <c-button disabled type="primary">禁用状态</c-button>
  </demo-block>

  <demo-block title="加载状态">
    <c-button
      type="primary"
      :loading="state.loading1"
      @click="state.loading1 = true"
    >
      点击加载
    </c-button>
    <c-button :loading="state.loading2" @click="state.loading2 = true">
      点击加载
    </c-button>
  </demo-block>

  <demo-block title="动画效果">
    <c-button type="primary" cover>主要按钮</c-button>
    <c-button cover>默认按钮</c-button>
  </demo-block>

  <demo-block title="图标按钮">
    <c-button type="primary" icon="star" />
    <c-button icon="like">主要按钮</c-button>
    <c-button icon="https://img.yzcdn.cn/vant/user-active.png">按钮</c-button>
  </demo-block>

  <demo-block title="按钮尺寸">
    <c-button type="primary" size="large">大号按钮</c-button>
    <c-button type="primary" size="normal">普通按钮</c-button>
    <c-button type="primary" size="small">小型按钮</c-button>
  </demo-block>

  <demo-block title="块级元素">
    <c-button type="primary" block>块级元素</c-button>
  </demo-block>

  <demo-block title="自定义颜色">
    <c-button color="#7232dd">单色按钮</c-button>
    <c-button ghost color="#7232dd" text-color="#7232dd">单色按钮</c-button>
    <c-button color="linear-gradient(to right, #ff6034, #ee0a24)"
      >渐变色按钮</c-button
    >
  </demo-block>

  <demo-block title="渲染为其他标签">
    <c-button tag="a" url="https://baidu.com" target="_blank"
      >外部链接</c-button
    >
    <c-button tag="a" to="/home">内部路由</c-button>
  </demo-block>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import '@cupshe/fonts';

const state = reactive({
  loading1: false,
  loading2: false,
});
</script>

<style lang="less">
.demo-button {
  background: #fff;

  .c-button {
    &--large,
    &--small,
    &--normal:not(:last-child) {
      margin-right: 4px;
    }
  }

  .van-doc-demo-block {
    padding: 0 16px;
  }

  .van-doc-demo-block__title {
    padding-left: 0;
  }

  &-row {
    margin-bottom: 4px;
  }
}
</style>
