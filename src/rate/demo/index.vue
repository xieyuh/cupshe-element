<template>
  <demo-block title="基础用法">
    <c-rate v-model="value1" />
  </demo-block>

  <demo-block title="评分文案">
    <c-rate v-model="value2">
      <template #text>Write a review</template>
    </c-rate>
  </demo-block>

  <demo-block title="自定义图标">
    <c-rate v-model="value2" icon="like" void-icon="like-o" />
  </demo-block>

  <demo-block title="自定义颜色">
    <c-rate v-model="value9" color="#333" void-color="#333" />
  </demo-block>

  <demo-block title="自定义大小">
    <div>
      <c-rate v-model="value3" />
    </div>
    <div>
      <c-rate v-model="value3" size="large" />
    </div>
  </demo-block>

  <demo-block title="半星">
    <c-rate v-model="value4" allow-half />
  </demo-block>

  <demo-block title="自定义数量">
    <c-rate v-model="value5" :count="6" />
  </demo-block>

  <demo-block title="禁用状态">
    <c-rate v-model="value6" disabled />
  </demo-block>

  <demo-block title="只读状态">
    <c-rate v-model="value6" readonly />
  </demo-block>

  <demo-block title="只读状态小数显示">
    <c-rate v-model="value7" readonly allow-half />
  </demo-block>

  <demo-block title="监听 change 事件">
    <c-rate v-model="value8" @change="onChange" />
  </demo-block>
</template>

<script lang="ts">
import { toRefs, reactive } from 'vue';

export default {
  setup() {
    const state = reactive({
      value1: 3,
      value2: 3,
      value3: 3,
      value4: 2.5,
      value5: 4,
      value6: 3,
      value7: 3.3,
      value8: 2,
      value9: 3,
    });

    const onChange = () => {};

    return {
      ...toRefs(state),
      onChange,
    };
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-rate {
  padding-bottom: 20px;
  background-color: #fff;

  .c-rate {
    margin-left: @padding-md;
  }
}
</style>
