<template>
  <demo-block card>
    <c-cell center title="基础使用">
      <template #value>
        <c-switch v-model="checked"></c-switch>
      </template>
    </c-cell>
    <c-cell center title="禁用状态">
      <template #value>
        <c-switch v-model="checked2" disabled></c-switch>
      </template>
    </c-cell>
    <c-cell center title="异步控制">
      <template #value>
        <c-switch :model-value="checked3" @update:model-value="onUpdateValue" />
      </template>
    </c-cell>
  </demo-block>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Dialog } from '../../dialog';

const checked = ref(false);
const checked2 = ref(false);
const checked3 = ref(false);

const onUpdateValue = (checked: boolean) => {
  Dialog.confirm({
    title: '标题',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    message: '是否切换开关？',
  }).then(() => {
    checked3.value = checked;
  });
};
</script>
