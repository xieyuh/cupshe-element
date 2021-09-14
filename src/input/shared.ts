import { CSSProperties, PropType } from 'vue';

export type InputType =
  | 'tel'
  | 'text'
  | 'digit'
  | 'number'
  | 'search'
  | 'password'
  | 'textarea';

type Booleanish = boolean | 'true' | 'false';

export const inputProps = {
  placeholder: String,
  autofocus: String as PropType<Booleanish>,
  autocomplete: String,
  maxlength: [String, Number],
  style: {
    type: Object as PropType<CSSProperties>,
  },
  type: {
    type: String as PropType<InputType>,
    default: 'text',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
};

export const textareaProps = {
  rows: {
    type: [String, Number],
    default: 4,
  },
};

export type InputExpose = {
  focus: () => void;
  blur: () => void;
};

export type InputFormatTrigger = 'onBlur' | 'onChange';
