<template>
  <div :class="bem()">
    <template v-if="$slots.text || text">
      <span :class="bem('text')">
        <slot name="text">{{ text }}</slot>
      </span>
    </template>
    <div :class="bem('track')" :style="rootStyle" ref="root">
      <span :class="bem('portion')" :style="portionStyle" />
    </div>
    <span :class="bem('percentage')">
      <slot name="percentage">{{ percentage }}%</slot>
    </span>
  </div>
</template>

<script lang="ts">
import {
  computed,
  CSSProperties,
  nextTick,
  onMounted,
  reactive,
  ref,
} from 'vue';
import { addUnit, createNamespace } from '../utils';

const [name, bem] = createNamespace('progress');

export default {
  name,

  props: {
    color: String,
    trackColor: String,
    text: String,
    strokeWidth: [Number, String],
    percentage: {
      type: [Number, String],
      required: true,
      validator: (value: number | string) => value >= 0 && value <= 100,
    },
  },

  setup(props) {
    const root = ref<HTMLElement>();

    const state = reactive({
      rootWidth: 0,
    });

    const resize = () => {
      nextTick(() => {
        state.rootWidth = root.value ? root.value.offsetWidth : 0;
      });
    };

    onMounted(() => resize());

    const rootStyle: CSSProperties = {
      background: props.trackColor,
      height: addUnit(props.strokeWidth),
    };

    const portionStyle = computed<CSSProperties>(() => {
      return {
        background: props.color,
        width: (state.rootWidth * +props.percentage) / 100 + 'px',
      };
    });

    return {
      bem,
      root,
      rootStyle,
      portionStyle,
    };
  },
};
</script>
