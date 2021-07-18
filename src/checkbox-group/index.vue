<template>
  <div :class="bem()">
    <slot />
  </div>
</template>

<script lang="ts">
import { PropType, watch, InjectionKey, ExtractPropTypes } from 'vue';
import { CheckerParent } from '../checkbox/checker.vue';
import { createNamespace } from '../utils';
import {
  useChildren,
  useExpose,
  useLinkField,
  useParent,
} from '../composables';

import { FORMITEM_KEY } from '../form-item/index.vue';

const [name, bem] = createNamespace('checkbox-group');

const props = {
  max: [String, Number],
  disabled: Boolean,
  iconSize: [String, Number],
  checkedColor: String,
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

export default {
  name,

  props,

  emits: ['change', 'update:modelValue'],

  setup(props, { emit }) {
    const { children, linkChildren } = useChildren(CHECKBOX_GROUP_KEY);

    // 获取Form item父组件
    const { parent } = useParent(FORMITEM_KEY);

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
          return item.checked.value;
        }
        return checked ?? !item.checked.value;
      });

      const names = checkedChildren.map((item: any) => item.name);
      updateValue(names);
    };

    watch(
      () => props.modelValue,
      (value) => {
        emit('change', value);
        parent && parent.validateWithTrigger('change');
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
};
</script>
