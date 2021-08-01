<template>
  <demo-block title="基础用法">
    <c-select :options="option0" v-model="select1" placeholder="请选择" />
  </demo-block>

  <demo-block title="自定义选项内容">
    <c-select :options="option1" v-model="select2" placeholder="请选择">
      <template #option="{ index }">
        <c-rate :model-value="index" readonly />
      </template>
    </c-select>
  </demo-block>

  <demo-block title="自定义长度">
    <c-select
      :options="option1"
      v-model="select3"
      placeholder="请选择"
      :style="{ width: '280px' }"
    />
  </demo-block>

  <demo-block title="自定义大小">
    <c-select
      :options="option1"
      v-model="select4"
      placeholder="请选择"
      size="small"
    />
  </demo-block>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      option0: [
        {
          text: '选项 1',
          value: '选项 1',
        },
        {
          text: '选项 2',
          value: '选项 2',
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
        },
        {
          text: '选项 3',
          value: '3',
        },
        {
          text: '选项 4',
          value: '4',
        },
      ],
      select1: '',
      select2: '',
      select3: '',
      select4: '',
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
