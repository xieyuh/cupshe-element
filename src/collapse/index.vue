<template>
  <div :class="bem()">
    <slot />
  </div>
</template>

<script lang="ts">
import { ExtractPropTypes, InjectionKey, PropType } from 'vue';
import { createNamespace } from '../utils';
import { useChildren } from '../composables';

const [name, bem] = createNamespace('collapse');

export type CollapseTheme = 'light' | 'dark';
export type CollapseSize = 'normal' | 'small';

const props = {
  accordion: Boolean,
  border: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<CollapseSize>,
    default: 'normal',
  },
  theme: {
    type: String as PropType<CollapseTheme>,
    default: 'light',
  },
  gutter: {
    type: [String, Number],
    default: 0,
  },
  modelValue: {
    type: [String, Number, Array] as PropType<
      string | number | Array<string | number>
    >,
    default: '',
  },
};

type CollapseProps = ExtractPropTypes<typeof props>;

export type CollapseProvide = {
  props: CollapseProps;
  toggle(name: number | string, expanded: boolean): void;
  isExpanded(name: number | string): boolean;
};

export const COLLAPSE_KEY: InjectionKey<CollapseProvide> = Symbol(name);

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

export default {
  name,

  props,

  emits: ['change', 'update:modelValue'],

  setup(props, { emit }) {
    const { linkChildren } = useChildren(COLLAPSE_KEY);

    const updateName = (name: number | string | Array<number | string>) => {
      emit('update:modelValue', name);
      emit('change', name);
    };

    const toggle = (name: number | string, expanded: boolean) => {
      if (props.accordion) {
        updateName(name === props.modelValue ? '' : name);
      } else if (expanded) {
        updateName((props.modelValue as Array<string | number>).concat(name));
      } else {
        updateName(
          (props.modelValue as Array<string | number>).filter(
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

    linkChildren({ props, toggle, isExpanded });

    return {
      bem,
    };
  },
};
</script>
