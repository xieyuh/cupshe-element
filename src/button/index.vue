<template>
  <component
    :is="tag"
    :type="nativeType"
    :class="classes"
    :disabled="disabled"
    :style="getStyle()"
    @click="onClick"
  >
    <div :class="bem('content')">
      <template v-if="$slots.icon">
        <slot name="icon" />
      </template>
      <template v-else-if="icon">
        <c-icon :name="icon" :class="bem('icon')"></c-icon>
      </template>
      <span :class="bem('text')" :style="getTextStyle()" v-if="$slots.default">
        <slot />
      </span>
    </div>
  </component>
</template>

<script lang="ts">
import { PropType, ButtonHTMLAttributes, CSSProperties } from 'vue';
import { useRoute, routeProps } from '../composables';
import { createNamespace, extend } from '../utils';

const [name, bem] = createNamespace('button');

export type ButtonType = 'info' | 'primary' | 'default' | 'success' | 'warning';

export type ButtonSize = 'large' | 'normal' | 'small';

export default {
  name,

  props: extend({}, routeProps, {
    icon: String,
    color: String,
    textColor: String,
    block: Boolean,
    ghost: Boolean,
    disabled: Boolean,
    cover: Boolean,
    tag: {
      type: String,
      default: 'button',
    },
    type: {
      type: String as PropType<ButtonType>,
      default: 'default',
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'normal',
    },
    nativeType: {
      type: String as PropType<ButtonHTMLAttributes['type']>,
      default: 'button',
    },
  }),

  emits: ['click'],

  setup(props, { emit }) {
    const route = useRoute();

    const classes = [
      bem([
        props.type,
        props.size,
        {
          ghost: props.ghost,
          block: props.block,
          cover: props.cover,
          disabled: props.disabled,
        },
      ]),
    ];

    const getStyle = () => {
      if (props.color) {
        const style: CSSProperties = {
          color: props.ghost ? props.textColor : 'white',
        };

        if (!props.ghost) {
          style.background = props.color;
        }

        if (props.color.includes('gradient')) {
          style.border = 0;
        } else {
          style.borderColor = props.color;
        }

        return style;
      }
    };

    const getTextStyle = () => {
      return {
        color: props.textColor,
      };
    };

    const onClick = (event: MouseEvent) => {
      if (!props.disabled) {
        emit('click', event);
        route();
      }
    };

    return {
      bem,
      classes,
      getStyle,
      getTextStyle,
      onClick,
    };
  },
};
</script>
