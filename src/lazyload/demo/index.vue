<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import Lazyload from '..';

const app = getCurrentInstance();
app?.appContext.app.use(Lazyload);

const image =
  'https://cdn-review.cupshe.com/rms-admin/20220125/f43fa5acbf5e44839e81563235afdf8f.jpg';
</script>

<template>
  <demo-block title="基础用法">
    <img v-lazy="image" />
  </demo-block>

  <demo-block title="webp参数">
    <img v-lazy="{ src: image, q: 80, w: 600 }" alt="" />
  </demo-block>

  <demo-block title="立即加载">
    <img v-lazy.now="image" alt="" />
  </demo-block>
</template>

<style lang="less">
.demo-lazyload {
  padding-right: 16px;
  padding-left: 16px;

  img,
  div[lazy] {
    box-sizing: border-box;
    width: 100%;
    height: 250px;
    margin-bottom: 16px;
    padding: 16px;
    background-color: white;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 12px;
    object-fit: cover;
  }

  .van-doc-demo-block__title,
  .van-doc-demo-section__title {
    padding-left: 0;
  }
}
</style>
