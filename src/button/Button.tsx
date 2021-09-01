import {
  defineComponent,
  PropType,
  ButtonHTMLAttributes,
  CSSProperties,
} from 'vue';
import { routeProps, useRoute } from '../composables';
import { createNamespace, extend } from '../utils';

import { Icon } from '../icon';

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
      type: String as PropType<keyof HTMLElementTagNameMap>,
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

  setup(props, { emit, slots }) {
    const route = useRoute();

    const renderIcon = () => {
      if (slots.icon) {
        return <div class={bem('icon')}>{slots.icon()}</div>;
      }

      if (props.icon) {
        return <Icon name={props.icon} class={bem('icon')} />;
      }
    };

    const getStyle = () => {
      const { color, ghost, textColor } = props;

      if (color) {
        const style: CSSProperties = {
          color: ghost ? textColor : 'white',
        };

        if (!ghost) {
          style.background = color;
        }

        if (color.includes('gradient')) {
          style.border = 0;
        } else {
          style.borderColor = color;
        }

        return style;
      }
    };

    const textStyle = () => ({ color: props.textColor });

    const renderText = () => {
      if (slots.default) {
        return (
          <span class={bem('text')} style={textStyle()}>
            {slots.default()}
          </span>
        );
      }
    };

    const onClick = (event: MouseEvent) => {
      if (!props.disabled) {
        emit('click', event);
        route();
      }
    };

    return () => {
      const {
        tag,
        type,
        size,
        ghost,
        block,
        cover,
        disabled,
        nativeType,
      } = props;

      const classes = [bem([type, size, { ghost, block, cover, disabled }])];

      return (
        <tag
          type={nativeType}
          class={classes}
          style={getStyle()}
          disabled={disabled}
          onClick={onClick}
        >
          <div class={bem('content')}>
            {renderIcon()}
            {renderText()}
          </div>
        </tag>
      );
    };
  },
});
