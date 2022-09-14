<template>
  <demo-block title="基础用法">
    <c-swipe :autoplay="3000" indicator-color="white">
      <c-swipe-item>1</c-swipe-item>
      <c-swipe-item>2</c-swipe-item>
      <c-swipe-item>3</c-swipe-item>
      <c-swipe-item>4</c-swipe-item>
    </c-swipe>
  </demo-block>

  <demo-block title="懒加载">
    <c-swipe :autoplay="3000" lazy-render>
      <c-swipe-item v-for="image in images" :key="image">
        <img :src="image" />
      </c-swipe-item>
    </c-swipe>
  </demo-block>

  <demo-block title="监听 change 事件">
    <c-swipe indicator-color="white" @change="onChange">
      <c-swipe-item>1</c-swipe-item>
      <c-swipe-item>2</c-swipe-item>
      <c-swipe-item>3</c-swipe-item>
      <c-swipe-item>4</c-swipe-item>
    </c-swipe>
  </demo-block>

  <demo-block title="纵向滚动">
    <c-swipe
      vertical
      :autoplay="3000"
      indicator-color="white"
      style="height: 200px"
      class="demo-swipe--vertical"
    >
      <c-swipe-item>1</c-swipe-item>
      <c-swipe-item>2</c-swipe-item>
      <c-swipe-item>3</c-swipe-item>
      <c-swipe-item>4</c-swipe-item>
    </c-swipe>
  </demo-block>

  <demo-block title="自定义滑块大小">
    <c-swipe :width="300" :loop="false" indicator-color="white">
      <c-swipe-item>1</c-swipe-item>
      <c-swipe-item>2</c-swipe-item>
      <c-swipe-item>3</c-swipe-item>
      <c-swipe-item>4</c-swipe-item>
    </c-swipe>
  </demo-block>

  <demo-block title="自定义指示器">
    <c-swipe>
      <c-swipe-item>1</c-swipe-item>
      <c-swipe-item>2</c-swipe-item>
      <c-swipe-item>3</c-swipe-item>
      <c-swipe-item>4</c-swipe-item>
      <template #indicator="{ active }">
        <div class="custom-indicator">{{ active + 1 }}/4</div>
      </template>
    </c-swipe>
  </demo-block>
</template>

<script lang="ts" setup>
const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
];

const onChange = (index: number) => console.log('当前 Swipe 索引：' + index);
</script>

<style lang="less">
.demo-swipe {
  padding-bottom: 30px;

  .c-swipe {
    &-item {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;

      &:nth-child(even) {
        background-color: #39a9ed;
      }

      &:nth-child(odd) {
        background-color: #66c6f2;
      }
    }

    img {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 240px;
      padding: 30px 60px;
      background-color: #fff;
      pointer-events: none;
    }
  }

  &--vertical {
    .c-swipe-item {
      line-height: 200px;
    }
  }

  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    color: #fff;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
