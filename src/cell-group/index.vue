<template>
  <template v-if="renderTitle">
    <div :class="bem('title', { inset })">
      <template v-if="$slots.title">
        <slot name="title" />
      </template>
      <template v-else>{{ title }}</template>
    </div>
  </template>
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
