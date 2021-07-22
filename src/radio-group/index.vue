<template>
  <div :class="bem([direction])" role="radiogroup">
    <slot />
  </div>
</template>

<script lang="ts">
import { ExtractPropTypes, InjectionKey, PropType, watch } from 'vue';
import { createNamespace, unknownProp } from '../utils';
import { useChildren, useLinkField } from '../composables';
import type { CheckerDirection } from '../checkbox/checker.vue';

const [name, bem] = createNamespace('radio-group');

const props = {
  disabled: Boolean,
  iconSize: [String, Number],
  direction: String as PropType<CheckerDirection>,
  modelValue: unknownProp,
};

export type RadioGroupProvide = {
  props: ExtractPropTypes<typeof props>;
  updateValue: (value: unknown) => void;
};

export const RADIO_KEY: InjectionKey<RadioGroupProvide> = Symbol(name);

export default {
  name,

  props,

  emits: ['change', 'update:modelValue'],

  setup(props, { emit }) {
    const { linkChildren } = useChildren(RADIO_KEY);

    const updateValue = (value: unknown) => emit('update:modelValue', value);
    watch(
      () => props.modelValue,
      (value) => emit('change', value)
    );

    linkChildren({
      props,
      updateValue,
    });

    useLinkField(() => props.modelValue);

    return {
      bem,
    };
  },
};
</script>
