<template>
  <div v-if="renderTitle" :class="bem('title', { inset })">
    <slot name="title">
      {{ title }}
    </slot>
  </div>
  <div
    :class="[
      bem({ inset }),
      {
        [BORDER_TOP_BOTTOM]: border && !inset,
      },
    ]"
  >
    <slot />
  </div>
</template>

<script>
import { truthProp, createNamespace } from '../utils';
import { BORDER_TOP_BOTTOM } from '../utils/constant';

const [name, bem] = createNamespace('cell-group');

export default {
  name,

  inheritAttrs: false,

  props: {
    title: String,
    inset: Boolean,
    border: truthProp,
  },

  setup(props, { slots }) {
    const renderTitle = props.title || slots.title;

    return {
      bem,
      renderTitle,
      BORDER_TOP_BOTTOM,
    };
  },
};
</script>
