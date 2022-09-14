<template>
  <demo-block title="内置字体">
    <div class="c-muli">AaBbCc</div>
    <div class="c-muli-semibold">AaBbCc</div>
    <div class="c-muli-bold">AaBbCc</div>
    <div class="c-muli-extrabold">AaBbCc</div>
  </demo-block>

  <demo-block title="文字省略">
    <div class="c-ellipsis">这是一段最多显示一行的文字，后面的内容会省略</div>
    <div class="c-multi-ellipsis--l2">
      这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略
    </div>
  </demo-block>

  <demo-block card title="动画">
    <c-cell is-link title="Fade" @click="animate('c-fade')" />
    <c-cell is-link title="Slide Up" @click="animate('c-slide-up')" />
    <c-cell is-link title="Slide Down" @click="animate('c-slide-down')" />
    <c-cell is-link title="Slide Left" @click="animate('c-slide-left')" />
    <c-cell is-link title="Slide Right" @click="animate('c-slide-right')" />
  </demo-block>

  <transition :name="state.transitionName">
    <div v-show="state.show" class="demo-animate-block" />
  </transition>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const state = reactive({
  show: false,
  transitionName: '',
});

const animate = (transitionName: string) => {
  state.show = true;
  state.transitionName = transitionName;

  setTimeout(() => {
    state.show = false;
  }, 500);
};
</script>

<style lang="less">
@import '../../style/font';

.demo-style {
  background: #fff;

  *[class*='c-muli'],
  .c-ellipsis,
  .c-multi-ellipsis--l2 {
    max-width: 300px;
    margin-left: 16px;
    font-size: 14px;
    line-height: 18px;
  }

  .c-ellipsis {
    margin-bottom: 16px;
  }

  .c-hairline--top {
    height: 30px;
    background-color: #fff;

    &::after {
      top: 5px;
    }
  }

  .demo-animate-block {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    margin: -50px 0 0 -50px;
    background-color: #1989fa;
    border-radius: 8px;
  }
}
</style>
