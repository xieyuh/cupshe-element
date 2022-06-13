<template>
  <demo-block card title="基础用法">
    <c-cell title="点击事件" is-link v-track:click="state.event"></c-cell>
    <c-cell title="曝光事件" is-link v-track:view="state.event2"></c-cell>
  </demo-block>

  <demo-block card title="手动触发">
    <c-cell title="手动触发" is-link @click="emit"></c-cell>
  </demo-block>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive } from 'vue';
import Track from '..';
import { Toast } from '../../toast';

const app = getCurrentInstance();
app?.appContext.app.use(Track, { onEvent: Toast });

const state = reactive({
  event: 'click event',
  event2: 'view event',
});

const emit = () => {
  const { $track } = app?.appContext.config.globalProperties as any;

  $track.emit('manual event');
};
</script>
