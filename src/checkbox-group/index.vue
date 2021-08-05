<template>
  <div :class="bem([direction])">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  watch,
  InjectionKey,
  ExtractPropTypes,
} from 'vue';
import { CheckerParent, CheckerDirection } from '../checkbox/checker.vue';
import { createNamespace } from '../utils';
import { useChildren, useExpose, useLinkField } from '../composables';

const [name, bem] = createNamespace('checkbox-group');

const props = {
  max: [String, Number],
  disabled: Boolean,
  direction: String as PropType<CheckerDirection>,
  iconSize: [String, Number],
  modelValue: {
    type: Array as PropType<unknown[]>,
    default: () => [],
  },
};

export type CheckboxGroupToggleAllOptions =
  | boolean
  | {
      checked?: boolean;
      skipDisabled?: boolean;
    };

export type CheckboxGroupProvide = CheckerParent & {
  props: ExtractPropTypes<typeof props>;
  updateValue: (value: unknown[]) => void;
};

export const CHECKBOX_GROUP_KEY: InjectionKey<CheckboxGroupProvide> = Symbol(
  name
);

export default defineComponent({
  name,

  props,

  emits: ['change', 'update:modelValue'],

  setup(props, { emit }) {
    const { children, linkChildren } = useChildren(CHECKBOX_GROUP_KEY);

    const updateValue = (value: unknown[]) => emit('update:modelValue', value);

    const toggleAll = (options: CheckboxGroupToggleAllOptions = {}) => {
      if (typeof options === 'boolean') {
        options = { checked: options };
      }

      const { checked, skipDisabled } = options;

      const checkedChildren = children.filter((item: any) => {
        if (!item.props.bindGroup) {
          return false;
        }
        if (item.props.disabled && skipDisabled) {
          return item.checked;
        }
        return checked ?? !item.checked;
      });

      const names = checkedChildren.map((item: any) => item.name);
      updateValue(names);
    };

    watch(
      () => props.modelValue,
      (value) => {
        emit('change', value);
      }
    );

    useExpose({ toggleAll });
    useLinkField(() => props.modelValue);
    linkChildren({
      props,
      updateValue,
    });

    return {
      bem,
    };
  },
});
</script>
