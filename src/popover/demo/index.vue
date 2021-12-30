<template>
  <demo-block title="基础用法">
    <c-popover
      v-model:show="show.value0"
      :actions="[{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }]"
      placement="bottom-start"
      @select="onSelect"
    >
      <template #reference>
        <c-button type="primary">Click Me</c-button>
      </template>
    </c-popover>

    <c-popover
      v-model:show="show.value1"
      :actions="[{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }]"
      placement="bottom-start"
      trigger="hover"
      @select="onSelect"
    >
      <template #reference>
        <c-button type="primary">Hover Me</c-button>
      </template>
    </c-popover>
  </demo-block>

  <demo-block title="选项配置">
    <c-popover
      v-model:show="show.showIcon"
      :actions="[
        { text: '选项一', icon: 'plus' },
        { text: '选项二', icon: 'tick' },
        { text: '选项三', icon: 'search' },
      ]"
      placement="bottom-start"
      @select="onSelect"
    >
      <template #reference>
        <c-button type="primary"> 展示图标 </c-button>
      </template>
    </c-popover>

    <c-popover
      v-model:show="show.disableAction"
      :actions="[
        { text: '选项一', disabled: true },
        { text: '选项二', disabled: true },
        { text: '选项三' },
      ]"
      @select="onSelect"
    >
      <template #reference>
        <c-button type="primary"> 禁用选项 </c-button>
      </template>
    </c-popover>
  </demo-block>

  <!-- <demo-block title="自定义内容">
    <c-popover
      v-model:show="show.customContent"
      placement="top-start"
      @select="onSelect"
    >
      <c-grid
        square
        clickable
        :border="false"
        column-num="3"
        style="width: 240px"
      >
        <c-grid-item
          v-for="i in 6"
          :key="i"
          icon="photo-o"
          text="选项"
          @click="show.customContent = false"
        />
      </c-grid>
      <template #reference>
        <c-button type="primary"> 自定义内容 </c-button>
      </template>
    </c-popover>
  </demo-block> -->
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import '@cupshe/fonts';

const placements = [
  'top',
  'top-start',
  'top-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
];

export default {
  setup() {
    const state = reactive({
      show: {
        value0: false,
        value1: false,
        showIcon: false,
        placement: false,
        darkTheme: false,
        lightTheme: false,
        customContent: false,
        disableAction: false,
      },
      showPicker: false,
      currentPlacement: 'top',
    });

    const onPickerChange = (value: string) => {
      setTimeout(() => {
        state.show.placement = true;
        state.currentPlacement = value;
      });
    };

    const onSelect = (action: { text: string }) => console.log(action.text);

    return {
      ...toRefs(state),
      onSelect,
      placements,
      onPickerChange,
    };
  },
};
</script>

<style lang="less">
.demo-popover {
  background: #fff;

  &-refer {
    width: 60px;
    height: 60px;
    background-color: #1989fa;
    border-radius: 8px;
  }

  .c-popover__wrapper {
    margin-left: 16px;
  }

  .c-field {
    width: auto;
    margin: 0 12px;
    overflow: hidden;
    border-radius: 8px;
  }

  &-box {
    display: flex;
    justify-content: center;
    margin: 110px 0;

    .c-popover__wrapper {
      margin-left: 0;
    }
  }
}
</style>
