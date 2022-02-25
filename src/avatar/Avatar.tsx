import { defineComponent, computed, CSSProperties } from 'vue';
import { Icon } from '../icon';
import { createNamespace } from '../utils';

const [name, bem] = createNamespace('avatar');

export default defineComponent({
  name,

  props: {
    badge: Boolean,
    text: String,
    color: String,
    textColor: String,
  },

  setup(props, { slots }) {
    const alt = computed(() => {
      const { text } = props;

      if (typeof text !== 'string' || !text) {
        return '';
      }

      return text.charAt(0).toUpperCase();
    });

    const style: CSSProperties = {
      backgroundColor: props.color,
    };

    const textStyle: CSSProperties = {
      color: props.textColor,
    };

    const renderBadge = () => {
      if (props.badge) {
        return (
          <span class={bem('badge')}>
            {slots.badge ? (
              slots.badge()
            ) : (
              <Icon class={bem('icon')} name="success_full" />
            )}
          </span>
        );
      }
    };

    return () => (
      <span class={bem()} style={style}>
        <span class={bem('text')} style={textStyle}>
          {alt.value}
        </span>
        {renderBadge()}
      </span>
    );
  },
});
