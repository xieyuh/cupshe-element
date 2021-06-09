import { computed, defineComponent, ref } from 'vue';
import { createNamespace, formatNumber, addUnit } from '../utils';

const [name, bem] = createNamespace('stepper');

function equal(value1?: string | number, value2?: string | number) {
  return String(value1) === String(value2);
}

function add(num1: number, num2: number) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

export default defineComponent({
  name,

  props: {
    modelValue: [Number, String],
    disabled: Boolean,
    inputWidth: [Number, String],
    buttonSize: [Number, String],
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    step: {
      type: Number,
      default: 1,
    },
    defaultValue: {
      type: [Number, String],
      default: 1,
    },
  },

  emits: ['change', 'update:modelValue', 'focus', 'blur', 'plus', 'minus'],

  setup(props, { emit }) {
    const format = (value: string | number): number | string => {
      const { min, max } = props;

      value = formatNumber(String(value));
      value = value === '' ? 0 : +value;
      value = Number.isNaN(value) ? +min : value;
      value = Math.max(Math.min(+max, value), +min);

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
      () => props.disabled || current.value <= +props.min
    );

    const plusDisabled = computed(
      () => props.disabled || current.value >= +props.max
    );

    const check = () => {
      const value = format(current.value);
      if (!equal(value, current.value)) {
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
      const value = format(add(+current.value, diff));
      current.value = value;
      emit(actionType);
    };

    const onInput = (event: Event) => {
      const input = event.target as HTMLInputElement;
      const { value } = input;

      let formatted = formatNumber(String(value));

      input.value = formatted;
      const isNumeric = formatted === String(+formatted);
      current.value = isNumeric ? +formatted : formatted;
    };

    const inputStyle = computed(() => ({
      width: addUnit(props.inputWidth),
      height: addUnit(props.buttonSize),
    }));

    const createListener = (type: 'minus' | 'plus') => {
      return (e: MouseEvent) => {
        e.preventDefault();
        actionType = type;
        onChange();
      };
    };

    const Minus = () => (
      <svg class={bem('icon')} role="presentation" viewBox="0 0 16 2">
        <path
          d="M1,1 L15,1"
          stroke="currentColor"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="square"
        ></path>
      </svg>
    );

    const Plus = () => (
      <svg class={bem('icon')} role="presentation" viewBox="0 0 16 16">
        <g
          stroke="currentColor"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="square"
        >
          <path d="M8,1 L8,15"></path>
          <path d="M1,8 L15,8"></path>
        </g>
      </svg>
    );

    return () => (
      <div class={bem()}>
        <button class={bem('button')} onClick={createListener('minus')}>
          {Minus()}
        </button>
        <input
          class={bem('input')}
          ref={inputRef}
          style={inputStyle.value}
          value={current.value}
          disabled={props.disabled}
          aria-valuemax={+props.max}
          aria-valuemin={+props.min}
          aria-valuenow={+current.value}
          onInput={onInput}
          role="spinbutton"
        />
        <button class={bem('button')} onClick={createListener('plus')}>
          {Plus()}
        </button>
      </div>
    );
  },
});
