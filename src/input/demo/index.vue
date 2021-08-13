<template>
  <demo-block title="基础用法">
    <div class="demo-input-row">
      <c-input v-model="value0" placeholder="请输入文本" />
      <c-input v-model="value1" style="width: 220px" placeholder="自定义长度" />
    </div>
  </demo-block>

  <demo-block title="禁用和只读">
    <div class="demo-input-row">
      <c-input disabled model-value="123" />
      <c-input readonly model-value="123" />
    </div>
  </demo-block>

  <demo-block title="格式化内容">
    <div class="demo-input-row">
      <c-input
        v-model="value2"
        :formatter="formatter"
        placeholder="在输入时执行格式化"
      />
      <c-input
        v-model="value3"
        :formatter="formatter"
        placeholder="在失焦时执行格式化"
        format-trigger="onBlur"
      />
    </div>
  </demo-block>

  <demo-block title="显示图标">
    <div class="demo-input-row">
      <c-input v-model="value4" suffix="question" />
      <c-input v-model="value5" prefix="search" />
    </div>
  </demo-block>

  <demo-block title="多行文本">
    <div class="demo-input-row">
      <c-input v-model="value6" rows="2" type="textarea" autosize />
    </div>
  </demo-block>

  <demo-block title="插入按钮">
    <div class="demo-input-row">
      <c-input v-model="value7">
        <template #addon>
          <c-button type="primary" size="large" icon="copy" />
        </template>
      </c-input>
    </div>
  </demo-block>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      value0: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
    });

    const onChange = (value) => {
      console.log(value);
    };

    const formatter = (value: string) => value.replace(/\d/g, '');

    return {
      ...toRefs(state),
      formatter,
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
