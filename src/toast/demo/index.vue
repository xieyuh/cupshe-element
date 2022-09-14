<script setup lang="ts">
import { Toast } from '..';

const showSuccessToast = () => {
  Toast.success('Added Successfully Added Successfully Added Successfully');
};

const showFailToast = () => {
  Toast.fail('Number copied Number copied Number copied');
};

const showTopToast = () => {
  Toast({
    message: '顶部展示',
    position: 'top',
  });
};

const showBottomToast = () => {
  Toast({
    message: '底部展示',
    position: 'bottom',
  });
};

const showIconToast = () => {
  Toast({
    message: 'Added Successfully Added Successfully Added Successfully',
    icon: 'like',
  });
};

const showImageToast = () => {
  Toast({
    message: '自定义图片',
    icon:
      'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/cupshe_32x32.png?v=1578467710',
  });
};

const showCustomizedToast = () => {
  const toast = Toast.loading({
    duration: 0,
    forbidClick: true,
    message: `倒计时 ${3} 秒`,
  });

  let second = 3;
  const timer = setInterval(() => {
    second--;
    if (second) {
      toast.message = `倒计时 ${second} 秒`;
    } else {
      clearInterval(timer);
      Toast.clear();
    }
  }, 1000);
};
</script>

<template>
  <demo-block card title="基础用法">
    <c-cell is-link title="文字提示" @click="Toast({ message: '文字提示' })" />
    <c-cell is-link title="成功提示" @click="showSuccessToast" />
    <c-cell is-link title="失败提示" @click="showFailToast" />
  </demo-block>

  <demo-block card title="自定义图标">
    <c-cell is-link title="自定义图标" @click="showIconToast" />
    <c-cell is-link title="自定义图片" @click="showImageToast" />
  </demo-block>

  <demo-block card title="自定义位置">
    <c-cell is-link title="顶部展示" @click="showTopToast" />
    <c-cell is-link title="底部展示" @click="showBottomToast" />
  </demo-block>

  <demo-block card title="动态更新提示">
    <c-cell is-link title="动态更新提示" @click="showCustomizedToast" />
  </demo-block>
</template>
