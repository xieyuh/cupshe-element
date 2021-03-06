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
    checkedClass: String,
  },

  emits: ['click', 'close', 'update:checked'],

  setup(props, { emit, slots }) {
    const onClose = (event: MouseEvent) => {
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
      const { checkable, checked, checkedClass } = props;

      const classes = [bem({ checkable, checked })];

      if (checked) {
        classes.push(checkedClass!);
      }

      return (
        <span class={classes} onClick={onClick}>
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
