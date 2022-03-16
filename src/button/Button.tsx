import { defineComponent, ButtonHTMLAttributes, CSSProperties } from 'vue';
import { routeProps, useRoute } from '../composables';
import {
  createNamespace,
  extend,
  makeStringProp,
  preventDefault,
} from '../utils';

import { Icon } from '../icon';
import { Loading } from '../loading';

const [name, bem] = createNamespace('button');

export type ButtonType = 'primary' | 'default';

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
    loading: Boolean,
    cover: Boolean,
    tag: makeStringProp<keyof HTMLElementTagNameMap>('button'),
    type: makeStringProp<ButtonType>('default'),
    size: makeStringProp<ButtonSize>('normal'),
    nativeType: makeStringProp<NonNullable<ButtonHTMLAttributes['type']>>(
      'button'
    ),
  }),

  emits: ['click'],

  setup(props, { emit, slots }) {
    const route = useRoute();

    const renderLoadingIcon = () => <Loading class={bem('loading')} />;

    const renderIcon = () => {
      if (props.loading) {
        return renderLoadingIcon();
      }

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
      if (props.loading) {
        return;
      }

      if (slots.default) {
        return (
          <span class={bem('text')} style={textStyle()}>
            {slots.default()}
          </span>
        );
      }
    };

    const onClick = (event: MouseEvent) => {
      if (props.loading) {
        preventDefault(event);
      } else if (!props.disabled) {
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
        loading,
        block,
        cover,
        disabled,
        nativeType,
      } = props;

      const classes = [
        bem([
          type,
          size,
          { ghost, block, cover: cover && !disabled, disabled, loading },
        ]),
      ];

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
