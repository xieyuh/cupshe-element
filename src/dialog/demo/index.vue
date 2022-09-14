<script setup lang="ts">
import { ref } from 'vue';
import CCell from '../../cell';
import { Dialog } from '..';
import type { DialogAction } from '../Dialog';

const CDialog = Dialog.Component;

const show = ref(false);
const image = 'https://img.yzcdn.cn/vant/apple-3.jpg';

const onClickAlert = () => {
  Dialog.alert({
    title: 'TITLE',
    message: 'Get 5 points for every $1 you spend in our store',
  });
};

const onClickAlert2 = () => {
  Dialog.alert({
    message:
      'Several items in your wishlist are out of stock. Do you want to remove all?  ',
  });
};

const onClickConfirm = () => {
  Dialog.confirm({
    title: 'TITLE',
    message: 'Get 5 points for every $1 you spend in our store',
  });
};

const onClickCloseable = () => {
  Dialog.confirm({
    title: 'TITLE',
    message: 'Get 5 points for every $1 you spend in our store',
    closeable: true,
  });
};

const onClickBeforeClose = () => {
  const beforeClose = (action: DialogAction) =>
    new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(action === 'confirm'), 1000);
    });

  Dialog.confirm({
    title: 'TITLE',
    message: 'Get 5 points for every $1 you spend in our store',
    beforeClose,
  });
};
</script>

<template>
  <demo-block card title="基础用法">
    <c-cell is-link title="提示弹窗" @click="onClickAlert" />
    <c-cell is-link title="提示弹窗（无标题）" @click="onClickAlert2" />
    <c-cell is-link title="确认" @click="onClickConfirm" />
    <c-cell is-link title="关闭按钮" @click="onClickCloseable" />
  </demo-block>

  <demo-block card title="异步关闭">
    <c-cell is-link title="异步关闭" @click="onClickBeforeClose" />
  </demo-block>

  <demo-block card title="组件调用">
    <c-cell is-link title="组件调用" @click="show = true" />
    <c-dialog v-model:show="show" show-cancel-button :lazy-render="false">
      <img :src="image" />
    </c-dialog>
  </demo-block>
</template>

<style lang="less">
.demo-dialog {
  img {
    display: block;
    box-sizing: border-box;
    width: 260px;
    height: 275px;
    padding: 25px 20px 0;
    margin: 0 auto;
  }
}
</style>
