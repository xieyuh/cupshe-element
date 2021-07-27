<template>
  <demo-block title="基础用法">
    <div class="demo-input-row">
      <c-input v-model="value0" placeholder="请输入文本" />
      <c-input v-model="value1" style="width: 220px" placeholder="请输入文本" />
    </div>
  </demo-block>

  <demo-block title="禁用和只读">
    <div class="demo-input-row">
      <c-input disabled model-value="123" />
      <c-input readonly model-value="123" />
    </div>
  </demo-block>

  <demo-block title="前缀和后缀">
    <div class="demo-input-row">
      <c-input suffix="question" />
      <c-input prefix="search" />
    </div>
  </demo-block>

  <demo-block title="插入按钮">
    <div class="demo-input-row">
      <c-input>
        <template #addon>
          <c-button type="primary" size="large" icon="copy" />
        </template>
      </c-input>
    </div>
  </demo-block>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      value0: '',
      value1: '',
    });

    const onChange = (value) => {
      console.log(value);
    };

    return {
      ...toRefs(state),
      onChange,
    };
  },
};
</script>

<style lang="less">
.demo-input {
  background: #fff;

  &-row {
    .c-input {
      margin-bottom: 8px;
      margin-left: 20px;
    }
  }

  .van-doc-demo-block__title:not(:first-child) {
    margin-top: -8px;
  }
}
</style>
