import { defineComponent, ref, computed, watch, nextTick, PropType } from 'vue';
import { Icon } from '../icon';
import {
  createNamespace,
  formatNumber,
  addNumber,
  addUnit,
  getSizeStyle,
  Interceptor,
  callInterceptor,
} from '../utils';

function equal(value1?: string | number, value2?: string | number) {
  return String(value1) === String(value2);
}

const [name, bem] = createNamespace('stepper');

export default defineComponent({
  name,

  props: {
    modelValue: [String, Number],
    inputWidth: [String, Number],
    buttonSize: [String, Number],
    disabled: Boolean,
    disablePlus: Boolean,
    disableMinus: Boolean,
    disableInput: Boolean,
    placeholder: String,
    beforeChange: Function as PropType<Interceptor>,
    name: {
      type: [String, Number],
      default: '',
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    step: {
      type: [String, Number],
      default: 1,
    },
    defaultValue: {
      type: [String, Number],
      default: 1,
    },
  },

  emits: [
    'change',
    'update:modelValue',
    'blur',
    'plus',
    'minus',
    'overlimit',
    'focus',
  ],

  setup(props, { emit }) {
    const format = (value: string | number): string | number => {
      value = formatNumber(String(value));
      value = value === '' ? 0 : +value;
      value = Number.isNaN(value) ? +props.min : value;
      value = Math.max(Math.min(+props.max, value), +props.min);
      return value;
    };

    const getInitialValue = () => {
      const defaultValue = props.modelValue ?? props.defaultValue;

      const value = format(defaultValue);

      if (!equal(value, props.modelValue)) {
        emit('update:modelValue', value);
      }

      return value;
    };

    let actionType: 'plus' | 'minus';
    const inputRef = ref<HTMLInputElement>();
    const current = ref(getInitialValue());

    const minusDisabled = computed(
      () => props.disabled || props.disableMinus || current.value <= +props.min
    );

    const plusDisabled = computed(
      () => props.disabled || props.disablePlus || current.value >= +props.max
    );

    const check = () => {
      const value = format(current.value);
      if (!equal(value, current.value)) {
        current.value = value;
      }
    };

    const setValue = (value: string | number) => {
      if (props.beforeChange) {
        callInterceptor(props.beforeChange, {
          args: [value],
          done() {
            current.value = value;
          },
        });
      } else {
        current.value = value;
      }
    };

    const onChange = () => {
      if (
        (actionType === 'plus' && plusDisabled.value) ||
        (actionType === 'minus' && minusDisabled.value)
      ) {
        return;
      }

      const diff = actionType === 'minus' ? -props.step : +props.step;
      const value = format(addNumber(+current.value, diff));

      setValue(value);
      emit(actionType);
    };

    const onInput = (event: Event) => {
      const input = event.target as HTMLInputElement;
      const { value } = input;

      const formatted = formatNumber(String(value));

      if (props.beforeChange) {
        input.value = String(current.value);
      } else if (!equal(value, formatted)) {
        input.value = formatted;
      }

      input.value = formatted;
      const isNumeric = formatted === String(+formatted);
      setValue(isNumeric ? +formatted : formatted);
    };

    const createListener = (type: 'minus' | 'plus', event: MouseEvent) => {
      event.preventDefault();
      actionType = type;
      onChange();
    };

    watch([() => props.max, () => props.min], check);

    watch(
      () => props.modelValue,
      (value) => {
        if (!equal(value, current.value)) {
          current.value = format(value as string | number);
        }
      }
    );

    watch(current, (value) => {
      emit('update:modelValue', value);
      emit('change', value, { name: props.name });
    });

    const onFocus = (event: Event) => {
      if (props.disableInput) {
        inputRef.value?.blur();
      } else {
        emit('focus', event);
      }
    };

    const onBlur = (event: Event) => {
      const input = event.target as HTMLInputElement;
      const value = format(input.value);
      input.value = String(value);
      current.value = value;
      nextTick().then(() => {
        emit('blur', event);
      });
    };

    const inputStyle = computed(() => ({
      width: addUnit(props.inputWidth),
      height: addUnit(props.buttonSize),
    }));

    const buttonStyle = computed(() => getSizeStyle(props.buttonSize));

    return () => (
      <div class={bem()}>
        <button
          type="button"
          class={bem('button', { disabled: minusDisabled.value })}
          onClick={(event) => createListener('minus', event)}
          style={buttonStyle.value}
          aria-disabled={minusDisabled.value || undefined}
        >
          <Icon class={bem('icon')} name="minus" />
        </button>
        <input
          class={bem('input', { disabled: props.disabled })}
          style={inputStyle.value}
          value={current.value}
          disabled={props.disabled}
          readonly={props.disableInput}
          aria-valuemax={props.max}
          aria-valuemin={props.min}
          aria-valuenow={current.value}
          placeholder={props.placeholder}
          onInput={onInput}
          onBlur={onBlur}
          onFocus={onFocus}
          role="spinbutton"
          ref={inputRef}
          type="number"
        />
        <button
          type="button"
          class={bem('button', { disabled: plusDisabled.value })}
          onClick={(event) => createListener('plus', event)}
          style={buttonStyle.value}
          aria-disabled={plusDisabled.value || undefined}
        >
          <Icon class={bem('icon')} name="plus" />
        </button>
      </div>
    );
  },
});
