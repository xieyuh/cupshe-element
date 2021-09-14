import { defineComponent, PropType } from 'vue';
import { createNamespace } from '../utils';

const [name, bem] = createNamespace('alert');

export type AlertType = 'success' | 'error' | 'info' | 'warning';

export default defineComponent({
  name,

  props: {
    title: String,
    type: {
      type: String as PropType<AlertType>,
      default: '',
    },
  },

  setup(props, { slots }) {
    const renderTitle = () => {
      if (props.title || slots.title) {
        return (
          <div class={bem('title')}>
            {slots.title ? slots.title : props.title}
          </div>
        );
      }
    };

    return () => (
        <div class={bem([props.type])}>
          {renderTitle()}
          <div class={bem('content')}>{slots.default?.()}</div>
        </div>
      );
  },
});
