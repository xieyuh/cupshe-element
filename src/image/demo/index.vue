<template>
  <demo-block title="基础用法">
    <c-row>
      <c-image width="100" height="100" :src="image" />
    </c-row>
  </demo-block>

  <demo-block title="填充模式">
    <c-row gutter="20">
      <c-col v-for="fit in fits" span="8" :key="fit">
        <c-image :fit="fit" width="100%" height="27vw" :src="image" />
        <div class="text">{{ fit }}</div>
      </c-col>
    </c-row>
  </demo-block>

  <demo-block title="圆形图片">
    <c-row gutter="20">
      <c-col v-for="fit in fits" span="8" :key="fit">
        <c-image round :fit="fit" width="100%" height="27vw" :src="image" />
        <div class="text">{{ fit }}</div>
      </c-col>
    </c-row>
  </demo-block>
</template>

<script lang="ts" setup>
import '@cupshe/fonts';

const image = 'https://img.yzcdn.cn/vant/cat.jpeg';
const fits = ['contain', 'cover', 'fill', 'none', 'scale-down'];
</script>

<style lang="less">
.demo-image {
  overflow-x: hidden;
  background-color: #fff;

  .c-row {
    padding: 0 16px;
  }

  .c-col {
    margin-bottom: 20px;
  }

  .text {
    margin-top: 5px;
    color: #646566;
    font-size: 14px;
    text-align: center;
  }
}
</style>
