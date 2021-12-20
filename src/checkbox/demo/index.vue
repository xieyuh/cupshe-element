<template>
  <demo-block title="基础用法">
    <c-checkbox v-model="checkbox1">复选框</c-checkbox>
  </demo-block>

  <demo-block title="水平排列">
    <c-checkbox-group v-model="horizontalResult" direction="horizontal">
      <c-checkbox name="a">复选框</c-checkbox>
      <c-checkbox name="b">复选框</c-checkbox>
    </c-checkbox-group>
  </demo-block>

  <demo-block title="禁用状态">
    <c-checkbox :model-value="false" disabled>复选框</c-checkbox>
    <c-checkbox :model-value="true" disabled>复选框</c-checkbox>
  </demo-block>

  <demo-block title="复选框组">
    <c-checkbox-group v-model="result">
      <c-checkbox name="a">复选框 a</c-checkbox>
      <c-checkbox name="b">复选框 b</c-checkbox>
    </c-checkbox-group>
  </demo-block>

  <demo-block title="限制最大可选数">
    <c-checkbox-group v-model="result2" :max="2">
      <c-checkbox name="a">复选框 a</c-checkbox>
      <c-checkbox name="b">复选框 b</c-checkbox>
      <c-checkbox name="c">复选框 c</c-checkbox>
    </c-checkbox-group>
  </demo-block>

  <demo-block title="全选与反选">
    <c-checkbox-group v-model="checkAllResult" ref="group">
      <c-checkbox name="a">复选框 a</c-checkbox>
      <c-checkbox name="b">复选框 b</c-checkbox>
      <c-checkbox name="c">复选框 c</c-checkbox>
    </c-checkbox-group>

    <div class="demo-checkbox-buttons">
      <c-button type="primary" @click="checkAll">全选</c-button>
      <c-button type="primary" @click="toggleAll">反选</c-button>
    </div>
  </demo-block>
</template>

<script lang="ts">
import '@cupshe/fonts';
import { ref, reactive, toRefs } from 'vue';
import { useRefs } from '../../composables/use-refs';
import { ComponentInstance } from '../../utils';

export default {
  setup() {
    const state = reactive({
      checkbox1: true,
      checkbox2: true,
      checkbox3: true,
      checkbox4: true,
      checkbox5: true,
      checkbox6: true,
      checkboxShape: true,
      checkboxLabel: true,
      checboxIcon: true,
      list: ['a', 'b'],
      result: ['a', 'b'],
      result2: [],
      result3: [],
      checkAllResult: [],
      horizontalResult: [],
    });

    const group = ref<ComponentInstance>();
    const [refs, setRefs] = useRefs<ComponentInstance>();

    const toggle = (index: number) => {
      refs.value[index].toggle();
    };

    const checkAll = () => {
      group.value?.toggleAll(true);
    };

    const toggleAll = () => {
      group.value?.toggleAll();
    };

    return {
      ...toRefs(state),
      group,
      toggle,
      setRefs,
      checkAll,
      toggleAll,
    };
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-checkbox {
  background: @white;

  .c-checkbox {
    margin-left: 20px;
  }

  .van-cell {
    .c-checkbox {
      margin: 0;
    }
  }

  img {
    height: 20px;
  }

  &-buttons {
    margin-top: @padding-md;

    .c-button {
      margin-left: @padding-md;
    }
  }

  .van-doc-demo-block__title {
    margin-top: -8px;
  }
}
</style>
