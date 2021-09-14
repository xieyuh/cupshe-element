import { defineComponent, PropType, ref, watch } from 'vue';
import { useExpose, useCustomFieldValue } from '../composables';
import { createNamespace, extend, isDef, formatNumber } from '../utils';
import {
  inputProps,
  textareaProps,
  InputFormatTrigger,
  InputExpose,
} from './shared';
import { endComposing, mapInputType } from './utils';

import { Icon } from '../icon';

const [name, bem] = createNamespace('input');

export type InputSize = 'normal' | 'small';

export default defineComponent({
  name,

  props: extend({}, inputProps, textareaProps, {
    name: String,
    prefix: String,
    suffix: String,
    error: Boolean,
    required: Boolean,
    showWordLimit: Boolean,
    formatter: Function as PropType<(value: string) => string>,
    size: {
      type: String as PropType<InputSize>,
      default: 'normal',
    },
    formatTrigger: {
      type: String as PropType<InputFormatTrigger>,
      default: 'onChange',
    },
  }),

  emits: [
    'update:modelValue',
    'change',
    'focus',
    'blur',
    'click-prefix',
    'click-suffix',
  ],

  setup(props, { emit, slots }) {
    const inputRef = ref<HTMLInputElement>();
    const focused = ref(false);

    const getModelValue = () => String(props.modelValue);

    const focus = () => inputRef.value?.focus();
    const blur = () => inputRef.value?.blur();

    const limitValueLength = (value: string) => {
      const { maxlength } = props;
      if (isDef(maxlength) && value.length > maxlength) {
        const modelValue = getModelValue();
        if (modelValue && modelValue.length === +maxlength) {
          return modelValue;
        }
        return value.slice(0, +maxlength);
      }
      return value;
    };

    const updateValue = (
      value: string,
      trigger: InputFormatTrigger = 'onChange'
    ) => {
      const { type, formatter, formatTrigger, modelValue } = props;

      value = limitValueLength(value);

      if (type === 'number' || type === 'digit') {
        const isNumber = type === 'number';
        value = formatNumber(value, isNumber, isNumber);
      }

      if (formatter && trigger === formatTrigger) {
        value = formatter(value);
      }

      if (inputRef.value && inputRef.value.value !== value) {
        value = String(value);
        inputRef.value.value = value;
      }

      if (value !== modelValue) {
        emit('update:modelValue', value);
      }
    };

    const onFocus = (event: Event) => {
      focused.value = true;
      emit('focus', event);
      if (props.readonly) {
        blur();
      }
    };

    const onBlur = (event: Event) => {
      focused.value = false;
      updateValue(getModelValue(), 'onBlur');
      emit('blur', event);
    };

    const onInput = (event: Event) => {
      updateValue((event.target as HTMLInputElement).value);
      emit('change', event);
    };

    const onClickPrefix = (event: Event) => emit('click-prefix', event);
    const onClickSuffix = (event: Event) => emit('click-suffix', event);

    watch(
      () => props.modelValue,
      () => {
        updateValue(getModelValue());
      }
    );

    const renderInput = () => {
      const {
        name,
        type,
        rows,
        modelValue,
        disabled,
        readonly,
        autofocus,
        placeholder,
        autocomplete,
        maxlength,
      } = props;

      const inputAttrs = {
        ref: inputRef,
        value: modelValue,
        rows: isDef(rows) ? +rows : undefined,
        class: bem('control', [type]),
        name,
        disabled,
        readonly,
        autofocus,
        placeholder,
        autocomplete,
        maxlength,
        onBlur,
        onFocus,
        onInput,
        onChange: endComposing,
      };

      if (props.type === 'textarea') {
        return <textarea {...inputAttrs} />;
      }

      return <input {...inputAttrs} {...mapInputType(type)} />;
    };

    const renderPrefix = () => {
      if (slots.prefix || props.prefix) {
        return (
          <div class={bem('prefix')} onClick={onClickPrefix}>
            {slots.prefix ? slots.prefix() : <Icon name={props.prefix} />}
          </div>
        );
      }
    };

    const renderRequireMark = () => {
      if (props.required) {
        return <span class={bem('mark')}>*</span>;
      }
    };

    const renderSuffix = () => {
      if (slots.suffix || props.suffix) {
        return (
          <div class={bem('suffix')} onClick={onClickSuffix}>
            {slots.suffix ? slots.suffix() : <Icon name={props.suffix} />}
          </div>
        );
      }
    };

    const hasWordLimit =
      props.showWordLimit && props.maxlength && props.type === 'textarea';

    const renderWordLimit = () => {
      if (hasWordLimit) {
        const count = getModelValue().length;
        return (
          <div class={bem('word-limit')}>
            <span class={bem('word-num')}>{count}</span>/{props.maxlength}
          </div>
        );
      }
    };

    useExpose<InputExpose>({
      focus,
      blur,
    });
    useCustomFieldValue(() => props.modelValue);

    return () => {
      const { disabled, readonly, error, style, size } = props;

      return (
        <div
          class={bem({
            focused: focused.value,
            disabled,
            readonly,
            error,
          })}
          style={style}
        >
          <div
            class={bem('body', [size, { 'word-limit': hasWordLimit }])}
            onClick={focus}
          >
            {renderPrefix()}
            {renderRequireMark()}
            {renderInput()}
            {renderSuffix()}
          </div>
          {renderWordLimit()}
        </div>
      );
    };
  },
});
