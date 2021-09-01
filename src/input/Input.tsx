import {
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';
import { useExpose, useCustomFieldValue } from '../composables';
import { createNamespace, extend, isDef, formatNumber } from '../utils';
import {
  inputProps,
  textareaProps,
  InputFormatTrigger,
  InputExpose,
} from './shared';
import { endComposing, mapInputType, resizeTextarea } from './utils';

import { Icon } from '../icon';

const [name, bem] = createNamespace('input');

export type InputSize = 'normal' | 'small';

export default defineComponent({
  name,

  props: extend({}, inputProps, textareaProps, {
    name: String,
    addon: String,
    prefix: String,
    suffix: String,
    error: Boolean,
    size: {
      type: String as PropType<InputSize>,
      default: 'normal',
    },
    formatter: Function as PropType<(value: string) => string>,
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
    'click-addon',
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

    const adjustTextareaSize = () => {
      const input = inputRef.value;
      if (props.type === 'textarea' && props.autosize && input) {
        resizeTextarea(input, props.autosize);
      }
    };

    const onClickPrefix = (event: Event) => emit('click-prefix', event);
    const onClickSuffix = (event: Event) => emit('click-suffix', event);
    const onClickAddon = (event: Event) => emit('click-addon', event);

    onMounted(() => {
      nextTick(adjustTextareaSize);
    });

    watch(
      () => props.modelValue,
      () => {
        updateValue(getModelValue());
        nextTick(adjustTextareaSize);
      }
    );

    const renderInput = () => {
      const controlClass = bem('control', [props.type]);

      const inputAttrs = {
        ref: inputRef,
        name: props.name,
        rows: isDef(props.rows) ? +props.rows : undefined,
        class: controlClass,
        value: props.modelValue,
        disabled: props.disabled,
        readonly: props.readonly,
        autofocus: props.autofocus,
        placeholder: props.placeholder,
        autocomplete: props.autocomplete,
        maxlength: props.maxlength,
        onBlur,
        onFocus,
        onInput,
        onChange: endComposing,
      };

      if (props.type === 'textarea') {
        return <textarea autofocus {...inputAttrs} />;
      }

      return <input {...inputAttrs} {...mapInputType(props.type)} />;
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

    const renderSuffix = () => {
      if (slots.suffix || props.suffix) {
        return (
          <div class={bem('suffix')} onClick={onClickSuffix}>
            {slots.suffix ? slots.suffix() : <Icon name={props.suffix} />}
          </div>
        );
      }
    };

    const renderAddon = () => {
      if (slots.addon) {
        return (
          <div class={bem('addon')} onClick={onClickAddon}>
            {slots.addon()}
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
      const { style, size, disabled, readonly, error } = props;

      return (
        <span class={bem()} style={style}>
          <span
            class={bem('wrapper', [
              size,
              {
                focused: focused.value,
                disabled,
                readonly,
                error,
                'with-addon': !!slots.addon,
              },
            ])}
            onClick={focus}
          >
            {renderPrefix()}
            {renderInput()}
            {renderSuffix()}
          </span>
          {renderAddon()}
        </span>
      );
    };
  },
});
