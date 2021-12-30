<script setup lang="ts">
import CCell from '../../cell';
import { ImagePreview, ImagePreviewOptions } from '..';
import { ref } from 'vue';
import { Toast } from '../../toast';

const CImagePreview = ImagePreview.Component;

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
];

const show = ref(false);
const index = ref(0);

const onClose = () => Toast('关闭');

const beforeClose = () =>
  new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });

const showComponentCall = () => {
  show.value = true;
};

const onChange = (newIndex: number) => {
  index.value = newIndex;
};

const showImagePreview = (options: Partial<ImagePreviewOptions> = {}) => {
  const instance = ImagePreview({
    images,
    ...options,
  });

  if (options.beforeClose) {
    setTimeout(() => {
      instance?.close();
    }, 2000);
  }
};
</script>

<template>
  <demo-block card title="基础用法">
    <c-cell is-link value="预览图片" @click="showImagePreview()" />
  </demo-block>

  <demo-block card title="传入配置项">
    <c-cell
      is-link
      value="指定初始位置"
      @click="showImagePreview({ startPosition: 1 })"
    />
    <c-cell
      is-link
      value="展示关闭按钮"
      @click="showImagePreview({ closeable: true })"
    />
    <c-cell
      is-link
      value="监听关闭事件"
      @click="showImagePreview({ onClose })"
    />
  </demo-block>

  <demo-block card title="异步关闭">
    <c-cell
      is-link
      value="异步关闭"
      @click="showImagePreview({ beforeClose })"
    />
  </demo-block>

  <demo-block card title="组件调用">
    <c-cell is-link value="组件调用" @click="showComponentCall" />
    <c-image-preview v-model:show="show" :images="images" @change="onChange">
      <template #index>{{ `第${index + 1}页` }}</template>
    </c-image-preview>
  </demo-block>
</template>
