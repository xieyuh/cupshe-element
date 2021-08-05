<template>
  <div
    :class="bem(classes)"
    :role="isClickable ? 'button' : undefined"
    :tabindex="isClickable ? 0 : undefined"
    @click="route"
  >
    <slot name="icon">
      <c-icon v-if="icon" :name="icon" :class="bem('left-icon')" />
    </slot>
    <div
      v-if="showTitle"
      :class="[bem('title'), titleClass]"
      :style="titleStyle"
    >
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
      <div v-if="showLabel" :class="[bem('label'), labelClass]">
        <slot name="label">
          {{ label }}
        </slot>
      </div>
    </div>
    <div
      v-if="hasValue"
      :class="[bem('value', { alone: !hasTitle }), valueClass]"
    >
      <slot name="value">
        <slot>
          <span>{{ value }}</span>
        </slot>
      </slot>
    </div>
    <slot name="right-icon">
      <c-icon
        v-if="isLink"
        :class="bem('right-icon')"
        :name="arrowDirection ? `arrow_${arrowDirection}` : `arrow_right`"
      ></c-icon>
    </slot>
    <slot name="extra" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, CSSProperties } from 'vue';
import { useRoute, routeProps } from '../composables';
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

export default defineComponent({
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
});
</script>
