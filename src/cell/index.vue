<template>
  <div
    :class="bem(classes)"
    :role="isClickable ? 'button' : undefined"
    :tabindex="isClickable ? 0 : undefined"
    @click="route"
  >
    <template v-if="$slots.icon">
      <slot name="icon" />
    </template>
    <template v-else-if="icon">
      <c-icon name="icon" :class="bem('left-icon')" />
    </template>
    <template v-if="showTitle">
      <div :class="[bem('title'), titleClass]" :style="titleStyle">
        <template v-if="$slots.title">
          <slot name="title" />
        </template>
        <span v-else>{{ title }}</span>
        <template v-if="showLabel">
          <div :class="[bem('label'), labelClass]">
            <template v-if="$slots.label">
              <slot name="label" />
            </template>
            <template v-else>{{ label }}</template>
          </div>
        </template>
      </div>
    </template>
    <template v-if="hasValue">
      <div :class="[bem('value', { alone: !hasTitle }), valueClass]">
        <template v-if="$slots.value">
          <slot name="value" />
        </template>
        <template v-else-if="$slots.default">
          <slot />
        </template>
        <template v-else>
          <span>{{ value }}</span>
        </template>
      </div>
    </template>
    <slot name="extra" />
  </div>
</template>

<script lang="ts">
import { PropType, CSSProperties } from 'vue';
import { useRoute, routeProps } from '../composables/use-route';
import {
  createNamespace,
  extend,
  isDef,
  truthProp,
  unknownProp,
} from '../utils';

const [name, bem] = createNamespace('cell');

export type CellArrowDirection = 'up' | 'down' | 'left' | 'right';

export const cellProps = {
  icon: String,
  size: String as PropType<'large'>,
  title: [Number, String],
  value: [Number, String],
  label: [Number, String],
  center: Boolean,
  isLink: Boolean,
  border: truthProp,
  required: Boolean,
  iconPrefix: String,
  valueClass: unknownProp,
  labelClass: unknownProp,
  titleClass: unknownProp,
  titleStyle: (null as unknown) as PropType<string | CSSProperties>,
  arrowDirection: String as PropType<CellArrowDirection>,
  clickable: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
};

export default {
  name,

  props: extend({}, cellProps, routeProps),

  setup(props, { slots }) {
    const route = useRoute();

    const showLabel = slots.label || isDef(props.label);

    const showTitle = slots.title || isDef(props.title);

    const slot = slots.value || slots.default;

    const hasValue = slot || isDef(props.value);

    const hasTitle = slots.title || isDef(props.title);

    const isClickable = props.clickable ?? props.isLink;

    const classes: Record<string, boolean | undefined> = {
      center: props.center,
      required: props.required,
      clickable: isClickable,
      borderless: !props.border,
    };

    if (props.size) {
      classes[props.size] = !!props.size;
    }

    return {
      bem,
      route,
      showTitle,
      showLabel,
      hasValue,
      hasTitle,
      classes,
      isClickable,
    };
  },
};
</script>
