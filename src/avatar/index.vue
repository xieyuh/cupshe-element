<template>
  <span :class="bem()" :style="style">
    <span :class="bem('text')" :style="textStyle">{{ transformText }}</span>
    <slot name="badge">
      <span :class="bem('badge')" v-if="badge">
        <c-icon name="success_full" :class="bem('icon')" />
      </span>
    </slot>
  </span>
</template>

<script lang="ts">
import { computed, CSSProperties } from 'vue';
import { createNamespace } from '../utils';

const [name, bem] = createNamespace('avatar');

export default {
  name,

  props: {
    badge: Boolean,
    text: String,
    color: String,
    textColor: String,
  },

  setup(props) {
    const transformText = computed(() => {
      if (typeof props.text !== 'string' || !props.text.length) {
        return '';
      }

      return props.text.charAt(0).toUpperCase();
    });

    const textStyle: CSSProperties = {
      color: props.textColor,
    };

    const style: CSSProperties = {
      backgroundColor: props.color,
    };

    return {
      bem,
      transformText,
      style,
      textStyle,
    };
  },
};
</script>
