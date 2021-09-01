import { defineComponent } from 'vue';
import { createNamespace } from '../utils';

const [name, bem] = createNamespace('tag');

export default defineComponent({
  name,

  props: {
    color: String,
    textColor: String,
    checkedClass: String,
    checkable: {
      type: Boolean,
      default: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['click', 'update:checked'],

  setup(props, { emit, slots }) {
    const onClick = (event: MouseEvent) => {
      if (props.checkable) {
        emit('update:checked', !props.checked);
      }

      emit('click', event);
    };

    return () => {
      const { checkable, checked, color, textColor } = props;

      return (
        <span
          class={bem({ checkable, checked })}
          style={{ color: textColor, backgroundColor: color }}
          onClick={onClick}
        >
          {slots.default?.()}
        </span>
      );
    };
  },
});
