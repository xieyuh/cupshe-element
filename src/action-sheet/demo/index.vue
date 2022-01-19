<script setup lang="ts">
import { ref, computed } from 'vue';
import '@cupshe/fonts';
import CActionSheet, { ActionSheetAction } from '..';
import CCell from '../../cell';
import { Toast } from '../../toast';

const showBasic = ref(false);
const showTitle = ref(false);
const showStatus = ref(false);

const value1 = ref('value1');
const value2 = ref('value1');

const simpleActions = computed<ActionSheetAction[]>(() => [
  { text: 'option1', value: 'value1' },
  { text: 'option2', value: 'value2' },
  { text: 'option3', value: 'value3' },
]);

const statusActions = computed<ActionSheetAction[]>(() => [
  { text: 'options', value: 'value1' },
  { text: 'disabled option', disabled: true, value: 'value2' },
]);

const onSelect = (item: ActionSheetAction) => {
  showBasic.value = false;
  Toast(item.value as string);
};
</script>

<template>
  <demo-block card title="基础用法">
    <c-cell is-link title="基础用法" @click="showBasic = true" />
  </demo-block>

  <demo-block card title="选项状态">
    <c-cell is-link title="选项状态" @click="showStatus = true" />
  </demo-block>

  <demo-block card title="自定义面板">
    <c-cell is-link title="自定义面板" @click="showTitle = true" />
  </demo-block>

  <c-action-sheet
    v-model="value1"
    v-model:show="showBasic"
    :actions="simpleActions"
    @select="onSelect"
  />

  <c-action-sheet
    v-model="value2"
    v-model:show="showStatus"
    close-on-click-action
    :actions="statusActions"
  />

  <c-action-sheet v-model:show="showTitle" title="Title">
    <div class="demo-action-sheet-content">Content</div>
  </c-action-sheet>
</template>

<style lang="less">
.demo-action-sheet {
  &-content {
    padding: 16px 16px 160px;
  }
}
</style>
