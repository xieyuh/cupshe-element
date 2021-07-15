<template>
  <div :class="[bem(), { [BORDER_TOP_BOTTOM]: border }]">
    <slot />
  </div>
</template>

<script lang="ts">
import { InjectionKey, PropType } from 'vue';
import { useChildren } from '../composables/use-children';
import { BORDER_TOP_BOTTOM } from '../utils/constant';
import { createNamespace, truthProp } from '../utils';

function validateModelValue(
  modelValue: string | number | Array<string | number>,
  accordion: boolean
) {
  if (accordion && Array.isArray(modelValue)) {
    return false;
  }
  if (!accordion && !Array.isArray(modelValue)) {
    return false;
  }
  return true;
}

export type CollapseProvide = {
  toggle: (name: number | string, expanded: boolean) => void;
  isExpanded: (name: number | string) => boolean;
};

const [name, bem] = createNamespace('collapse');

export const COLLAPSE_KEY: InjectionKey<CollapseProvide> = Symbol(name);

export default {
  name,

  props: {
    border: truthProp,
    accordion: Boolean,
    modelValue: {
      type: [String, Number, Array] as PropType<
        string | number | Array<string | number>
      >,
      default: '',
    },
  },

  emits: ['change', 'update:modelValue'],

  setup(props, { emit }) {
    const { linkChildren } = useChildren(COLLAPSE_KEY);

    const updateName = (name: number | string | Array<string | number>) => {
      emit('change', name);
      emit('update:modelValue', name);
    };

    const toggle = (name: number | string, expanded: boolean) => {
      if (props.accordion) {
        updateName(name === props.modelValue ? '' : name);
      } else if (expanded) {
        updateName((props.modelValue as Array<number | string>).concat(name));
      } else {
        updateName(
          (props.modelValue as Array<number | string>).filter(
            (activeName) => activeName !== name
          )
        );
      }
    };

    const isExpanded = (name: number | string) => {
      if (!validateModelValue(props.modelValue, props.accordion)) {
        return false;
      }

      return props.accordion
        ? props.modelValue === name
        : (props.modelValue as Array<number | string>).includes(name);
    };

    linkChildren({ toggle, isExpanded });

    return {
      bem,
      BORDER_TOP_BOTTOM,
    };
  },
};
</script>
