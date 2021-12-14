<template>
  <demo-block title="基础用法">
    <c-select :options="option" v-model="select1" placeholder="请选择" />
    <c-select
      :options="option"
      v-model="select2"
      placeholder="请选择"
      :style="{ width: '280px', marginTop: '20px' }"
    />
  </demo-block>

  <demo-block title="自定义选项内容">
    <c-select :options="option" v-model="select3" placeholder="请选择">
      <template #option="{ index }">
        <c-rate :model-value="index" readonly />
      </template>
    </c-select>
  </demo-block>

  <demo-block title="选择器尺寸">
    <c-select
      :options="option"
      v-model="select4"
      placeholder="请选择"
      size="small"
    />
  </demo-block>

  <demo-block title="自定义控件">
    <c-select
      :options="option"
      v-model="select5"
      placeholder="请选择"
      placement="bottom-start"
      :popper-style="{ width: '178px', marginTop: '10px' }"
    >
      <template #reference="{ match }">
        <span class="select-reference">
          <span>{{ match ? match.text : '请选择' }}</span>
          <c-icon name="arrow_down" />
        </span>
      </template>
    </c-select>
  </demo-block>

  <demo-block title="错误状态">
    <c-select :options="option1" error v-model="select8" placeholder="请选择" />
  </demo-block>

  <demo-block title="选项禁用">
    <c-select :options="option1" v-model="select6" placeholder="请选择" />
  </demo-block>

  <demo-block title="禁用状态">
    <c-select
      disabled
      :options="option"
      v-model="select7"
      placeholder="请选择"
    />
  </demo-block>
</template>

<script>
import { reactive, toRefs } from 'vue';
import '@cupshe/fonts';

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
      select7: '',
      select8: '',
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

  .select-reference {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    width: 131px;
    color: #333;
    border-bottom: 1px solid #333;
    font-family: 'Muli-light', sans-serif;
    font-size: 14px;
  }
}
</style>
