import { nextTick, defineComponent, ExtractPropTypes } from 'vue';
import {
  createNamespace,
  extend,
  makeArrayProp,
  pick,
  preventDefault,
  truthProp,
  unknownProp,
} from '../utils';
import { Popup } from '../popup';
import { popupSharedPropKeys, popupSharedProps } from '../popup/shared';

const [name, bem] = createNamespace('action-sheet');

export type ActionSheetAction = {
  text: string;
  value: string | number;
  disabled?: boolean;
};

const actionSheetProps = extend({}, popupSharedProps, {
  title: String,
  actions: makeArrayProp<ActionSheetAction>(),
  modelValue: unknownProp,
  closeOnPopstate: truthProp,
  closeOnClickAction: Boolean,
});

export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>;

const popupInheritKeys = [...popupSharedPropKeys, 'closeOnPopstate'] as const;

export default defineComponent({
  name,

  props: actionSheetProps,

  emits: ['select', 'cancel', 'update:show', 'update:modelValue'],

  setup(props, { emit, slots }) {
    const updateShow = (show: boolean) => emit('update:show', show);

    const onCancel = () => {
      updateShow(false);
      emit('cancel');
    };

    const renderHeader = () => {
      if (props.title) {
        return <div class={bem('header')}>{props.title}</div>;
      }
    };

    const renderActionContent = (action: ActionSheetAction, index: number) => {
      if (slots.action) {
        return slots.action({ action, index });
      }

      return <span class={bem('name')}>{action.text}</span>;
    };

    const onClickAction = (action: ActionSheetAction, event: Event) => {
      if (action.disabled) {
        return preventDefault(event, true);
      }

      nextTick(() => {
        emit('select', action);
        emit('update:modelValue', action.value);
      });

      if (props.closeOnClickAction) {
        updateShow(false);
      }
    };

    const renderAction = (action: ActionSheetAction, index: number) => {
      const { disabled, value } = action;

      return (
        <button
          type="button"
          class={bem('item', { disabled, active: props.modelValue === value })}
          onClick={(event) => onClickAction(action, event)}
        >
          {renderActionContent(action, index)}
        </button>
      );
    };

    return () => (
      <Popup
        class={bem()}
        position="bottom"
        {...pick(props, popupInheritKeys)}
        {...{ 'onUpdate:show': updateShow, onClose: onCancel }}
      >
        {renderHeader()}
        <div class={bem('content')}>
          {props.actions.map(renderAction)}
          {slots.default?.()}
        </div>
      </Popup>
    );
  },
});
