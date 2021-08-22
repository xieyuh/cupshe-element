<template>
  <component
    :is="tag"
    :type="nativeType"
    :class="classes"
    :disabled="disabled"
    :style="getStyle"
    @click="onClick"
  >
    <div :class="bem('content')">
      <slot name="icon">
        <c-icon v-if="icon" :name="icon" :class="bem('icon')" />
      </slot>
      <span :class="bem('text')" :style="textStyle" v-if="$slots.default">
        <slot />
      </span>
    </div>
  </component>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ButtonHTMLAttributes,
  CSSProperties,
  computed,
} from 'vue';
import { useRoute, routeProps } from '../composables';
import { createNamespace, extend } from '../utils';

const [name, bem] = createNamespace('button');

export type ButtonType = 'info' | 'primary' | 'default' | 'success' | 'warning';

export type ButtonSize = 'large' | 'normal' | 'small';

export default defineComponent({
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

    const classes = computed(() => [
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
    ]);

    const getStyle = computed(() => {
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
    });

    const textStyle = computed(() => ({
      color: props.textColor,
    }));

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
      textStyle,
      onClick,
    };
  },
});
</script>
