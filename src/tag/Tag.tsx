import { defineComponent, Transition } from 'vue';
import { createNamespace, truthProp } from '../utils';

import { Icon } from '../icon';

const [name, bem] = createNamespace('tag');

export default defineComponent({
  name,

  props: {
    show: truthProp,
    checkable: truthProp,
    checked: {
      type: Boolean,
      default: false,
    },
    closeable: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['click', 'close', 'update:checked'],

  setup(props, { emit, slots }) {
    const onClose = (event: MouseEvent) => {
      console.log(123);
      event.stopPropagation();
      emit('close', event);
    };

    const onClick = (event: MouseEvent) => {
      if (props.checkable) {
        emit('update:checked', !props.checked);
      }

      emit('click', event);
    };

    const renderClose = () => {
      if (props.closeable) {
        return <Icon name="close" class={bem('close')} onClick={onClose} />;
      }
    };

    const renderTag = () => {
      const { checkable, checked } = props;

      return (
        <span class={bem({ checkable, checked })} onClick={onClick}>
          {slots.default?.()}
          {renderClose()}
        </span>
      );
    };

    return () => {
      const { closeable, show } = props;

      return (
        <Transition name={closeable ? 'c-fade' : undefined}>
          {show ? renderTag() : null}
        </Transition>
      );
    };
  },
});
