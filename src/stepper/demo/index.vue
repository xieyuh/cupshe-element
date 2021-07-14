<template>
  <demo-block card>
    <c-cell center title="基础使用">
      <template #value>
        <c-stepper v-model="stepper1" />
      </template>
    </c-cell>

    <c-cell center title="步长设置">
      <template #value>
        <c-stepper v-model="stepper2" step="2" />
      </template>
    </c-cell>

    <c-cell center title="限制输入范围">
      <template #value>
        <c-stepper v-model="stepper3" :min="5" :max="8" />
      </template>
    </c-cell>

    <c-cell center title="禁用状态">
      <template #value>
        <c-stepper v-model="stepper5" disabled />
      </template>
    </c-cell>

    <c-cell center title="禁用输入框">
      <template #value>
        <c-stepper v-model="disabledInput" disable-input />
      </template>
    </c-cell>

    <c-cell center title="异步变更">
      <template #value>
        <c-stepper v-model="stepper6" :before-change="beforeChange" />
      </template>
    </c-cell>
  </demo-block>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      stepper1: 1,
      stepper2: 1,
      stepper3: 1,
      stepper4: 1,
      stepper5: 1,
      stepper6: 1,
      stepper7: 1,
      stepper8: 1,
      stepperRound: 1,
      disabledInput: 1,
    });

    const beforeChange = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
    };

    return {
      ...toRefs(state),
      beforeChange,
    };
  },
};
</script>
