<template>
  <demo-block title="基础用法">
    <c-select :options="option" v-model="select1" placeholder="请选择" />
  </demo-block>

  <demo-block title="自定义选项内容">
    <c-select :options="option" v-model="select2" placeholder="请选择">
      <template #option="{ index }">
        <c-rate :model-value="index" readonly />
      </template>
    </c-select>
  </demo-block>

  <demo-block title="自定义长度">
    <c-select
      :options="option"
      v-model="select3"
      placeholder="请选择"
      :style="{ width: '280px' }"
    />
  </demo-block>

  <demo-block title="自定义大小">
    <c-select
      :options="option"
      v-model="select4"
      placeholder="请选择"
      size="small"
    />
  </demo-block>

  <demo-block title="禁用状态">
    <c-select
      disabled
      :options="option"
      v-model="select5"
      placeholder="请选择"
    />
  </demo-block>

  <demo-block title="选项禁用">
    <c-select :options="option1" v-model="select6" placeholder="请选择" />
  </demo-block>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      option: [
        {
          text: '选项 1',
          value: '1',
        },
        {
          text: '选项 2',
          value: '2',
        },
        {
          text: '选项 3',
          value: '3',
        },
      ],
      option1: [
        {
          text: '选项 1',
          value: '1',
        },
        {
          text: '选项 2',
          value: '2',
          disabled: true,
        },
        {
          text: '选项 3',
          value: '3',
        },
      ],
      select1: '',
      select2: '',
      select3: '',
      select4: '',
      select5: '',
      select6: '',
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less">
.demo-select {
  background: #fff;

  .c-select {
    margin-left: 20px;
  }
}
</style>
