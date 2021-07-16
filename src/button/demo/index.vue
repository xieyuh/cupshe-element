<template>
  <demo-block title="按钮类型">
    <div class="demo-button-row">
      <c-button type="primary">主要按钮</c-button>
      <c-button type="default">默认按钮</c-button>
    </div>
    <div class="demo-button-row">
      <c-button type="success">成功按钮</c-button>
      <c-button type="warning">警告按钮</c-button>
    </div>
    <div class="demo-button-row">
      <c-button type="info">信息按钮</c-button>
    </div>
  </demo-block>

  <demo-block title="朴素按钮">
    <c-button ghost type="primary">朴素按钮</c-button>
  </demo-block>

  <demo-block title="禁用状态">
    <c-button disabled type="primary">禁用状态</c-button>
  </demo-block>

  <demo-block title="动画效果">
    <c-button type="primary" cover>主要按钮</c-button>
    <c-button cover>默认按钮</c-button>
  </demo-block>

  <demo-block title="图标按钮">
    <c-button type="primary" icon="star" />
    <c-button ghost type="primary" icon="like">主要按钮</c-button>
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
    <c-button tag="a" url="https://baidu.com">主要按钮</c-button>
    <c-button tag="a" to="/home">回到首页</c-button>
  </demo-block>
</template>

<style lang="less">
@import '../../style/var';

.demo-button {
  background: @white;

  .c-button {
    &--large,
    &--small,
    &--normal:not(:last-child) {
      margin-right: 4px;
    }
  }

  .van-doc-demo-block {
    padding: 0 @padding-md;
  }

  .van-doc-demo-block__title {
    padding-left: 0;
  }

  &-row {
    margin-bottom: 4px;
  }
}
</style>
