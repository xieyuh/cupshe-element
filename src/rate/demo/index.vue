<template>
  <demo-block title="基础用法">
    <c-rate v-model="state.value1" readonly allow-half />
  </demo-block>

  <demo-block title="自定义图标">
    <c-rate v-model="state.value2" icon="like_full" void-icon="like" />
  </demo-block>

  <demo-block title="自定义颜色">
    <c-rate v-model="state.value3" color="#333" void-color="#333" />
  </demo-block>

  <demo-block title="自定义大小">
    <div>
      <c-rate v-model="state.value4" size="small" />
    </div>
    <div>
      <c-rate v-model="state.value4" size="normal" />
    </div>
    <div>
      <c-rate v-model="state.value4" size="large" />
    </div>
  </demo-block>

  <demo-block title="半星">
    <c-rate v-model="state.value5" allow-half />
  </demo-block>

  <demo-block title="自定义数量">
    <c-rate v-model="state.value6" :count="6" />
  </demo-block>

  <demo-block title="禁用状态">
    <c-rate v-model="state.value7" disabled />
  </demo-block>

  <demo-block title="只读状态">
    <c-rate v-model="state.value8" readonly />
  </demo-block>

  <demo-block title="只读状态小数显示">
    <c-rate v-model="state.value9" readonly allow-half />
  </demo-block>

  <demo-block title="监听 change 事件">
    <c-rate v-model="state.value10" @change="onChange" />
  </demo-block>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const state = reactive({
  value1: 3,
  value2: 3,
  value3: 3,
  value4: 3,
  value5: 2.5,
  value6: 3,
  value7: 3,
  value8: 2,
  value9: 3.3,
  value10: 3,
});

const onChange = (value: number) => {
  console.log(value);
};
</script>

<style lang="less">
.demo-rate {
  padding-bottom: 20px;
  background-color: #fff;

  .c-rate {
    margin-left: 16px;
  }
}
</style>
