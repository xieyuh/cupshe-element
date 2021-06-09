import { defineComponent, PropType, ButtonHTMLAttributes } from 'vue';
import { createNamespace } from '../utils';

const [name, bem] = createNamespace('button');

export type ButtonType = 'default' | 'primary';

export type ButtonShape = 'round' | 'circle' | 'square';

export type ButtonSize = 'large' | 'normal' | 'small' | 'mini';

export default defineComponent({
  name,

  props: {
    text: String,
    ghost: Boolean,
    round: Boolean,
    disabled: Boolean,
    block: Boolean,
    band: Boolean,
    loading: Boolean,
    loadingText: String,
    shape: {
      type: String as PropType<ButtonShape>,
      default: 'square',
    },
    type: {
      type: String as PropType<ButtonType>,
      default: 'default',
    },
    nativeType: {
      type: String as PropType<ButtonHTMLAttributes['type']>,
      default: 'button',
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'normal',
    },
  },

  emits: ['click'],

  setup(props, { emit, slots }) {
    const renderIcon = () => {
      if (slots.icon) {
        return <div class={bem('icon')}>{slots.icon()}</div>;
      }
    };

    const onClick = (e: MouseEvent) => {
      if (props.loading || props.disabled) {
        e.preventDefault();
      } else {
        emit('click', e);
      }
    };

    const renderText = () => {
      let text: any;
      if (props.loading) {
        text = props.loadingText;
      } else {
        text = slots.default ? slots.default() : props.text;
      }

      if (text) {
        return <span class={bem('text')}>{text}</span>;
      }
    };

    return () => {
      const { type, size, ghost, disabled, round, block, band } = props;

      return (
        <button
          type={props.nativeType}
          disabled={props.disabled}
          onClick={onClick}
          class={bem([type, size, { block, round, disabled, ghost, band }])}
        >
          <div class={bem('content')}>{renderText()}</div>
        </button>
      );
    };
  },
});
