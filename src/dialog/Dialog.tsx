import { PropType, defineComponent } from 'vue';
import {
  createNamespace,
  extend,
  truthProp,
  unknownProp,
  pick,
  addUnit,
  callInterceptor,
  isFunction,
} from '../utils';
import { popupSharedPropKeys, popupSharedProps } from '../popup/shared';

import { Popup } from '../popup';
import { Button } from '../button';

const [name, bem] = createNamespace('dialog');
export type DialogAction = 'confirm' | 'cancel';

export type DialogMessage = string | (() => JSX.Element);

const popupKeys = [
  ...popupSharedPropKeys,
  'transition',
  'closeOnPopstate',
] as const;

export default defineComponent({
  name,

  props: extend({}, popupSharedProps, {
    title: String,
    width: [Number, String],
    closeable: Boolean,
    message: [String, Function] as PropType<DialogMessage>,
    callback: Function as PropType<(action?: DialogAction) => void>,
    allowHtml: Boolean,
    className: unknownProp,
    closeOnPopstate: truthProp,
    showCancelButton: Boolean,
    showConfirmButton: truthProp,
    closeOnClickOverlay: Boolean,
    cancelButtonText: {
      type: String,
      default: 'CANCEL',
    },
    confirmButtonText: {
      type: String,
      default: 'CONFIRM',
    },
    transition: {
      type: String,
      default: 'c-dialog-bounce',
    },
  }),

  emits: ['confirm', 'cancel', 'update:show'],

  setup(props, { emit, slots }) {
    const updateShow = (value: boolean) => emit('update:show', value);

    const close = (action: DialogAction) => {
      updateShow(false);

      if (props.callback) {
        props.callback(action);
      }
    };

    const getActionHandler = (action: DialogAction) => () => {
      if (!props.show) {
        return;
      }

      emit(action);

      if (props.beforeClose) {
        callInterceptor(props.beforeClose, {
          args: [action],
          done() {
            close(action);
          },
        });
      } else {
        close(action);
      }
    };

    const onCancel = getActionHandler('cancel');
    const onConfirm = getActionHandler('confirm');

    const renderTitle = () => {
      const title = slots.title ? slots.title() : props.title;

      if (title) {
        return <div class={bem('title')}>{title}</div>;
      }
    };

    const renderText = () => {
      const { message, allowHtml } = props;
      const classNames = bem('text');

      const content = isFunction(message) ? message() : message;

      if (allowHtml && typeof content === 'string') {
        return <div class={classNames} innerHTML={content}></div>;
      }

      return <div class={classNames}>{content}</div>;
    };

    const renderMessage = () => {
      const { title, message, allowHtml } = props;
      const hasTitle = !!(title || slots.title);

      if (slots.default) {
        return (
          <div class={bem('message', { 'has-title': hasTitle })}>
            {slots.default()}
          </div>
        );
      }

      if (message) {
        return (
          <div
            key={allowHtml ? 1 : 0}
            class={bem('message', { 'has-title': hasTitle })}
          >
            {renderText()}
          </div>
        );
      }
    };

    const renderButtons = () => (
      <div class={bem('footer')}>
        {props.showCancelButton && (
          <Button ghost class={bem('cancel')} onClick={onCancel}>
            {props.cancelButtonText}
          </Button>
        )}
        {props.showConfirmButton && (
          <Button class={bem('confirm')} type="primary" onClick={onConfirm}>
            {props.confirmButtonText}
          </Button>
        )}
      </div>
    );

    return () => {
      const { closeable, width, className } = props;

      return (
        <Popup
          class={[bem(), className]}
          style={{ width: addUnit(width) }}
          closeable={closeable}
          {...pick(props, popupKeys)}
          {...{ 'onUpdate:show': updateShow }}
        >
          <div class={bem('content')}>
            {renderTitle()}
            {renderMessage()}
            {renderButtons()}
          </div>
        </Popup>
      );
    };
  },
});
