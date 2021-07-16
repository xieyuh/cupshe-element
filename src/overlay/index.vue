<template>
  <transition name="c-fade">
    <div v-show="show" :style="style" :class="[bem(), className]">
      <slot />
    </div>
  </transition>
</template>

<script lang="ts">
import { PropType, CSSProperties } from 'vue';
import {
  createNamespace,
  unknownProp,
  extend,
  getZIndexStyle,
  isDef,
} from '../utils';

const [name, bem] = createNamespace('overlay');

export default {
  name,

  props: {
    show: Boolean,
    zIndex: [String, Number],
    duration: [String, Number],
    className: unknownProp,
    customStyle: Object as PropType<CSSProperties>,
  },

  setup(props) {
    const style: CSSProperties = extend(
      getZIndexStyle(props.zIndex),
      props.customStyle
    );

    if (isDef(props.duration)) {
      style.animationDuration = `${props.duration}s`;
    }

    return { bem, style };
  },
};
</script>
