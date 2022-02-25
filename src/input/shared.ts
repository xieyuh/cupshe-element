import { CSSProperties, PropType } from 'vue';

export type InputSize = 'normal' | 'small';

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
  min: [String, Number],
  max: [String, Number],
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

export type AutoSizeConfig = {
  maxHeight?: number;
  minHeight?: number;
};

export const textareaProps = {
  rows: [String, Number],
  autosize: [Boolean, Object] as PropType<boolean | AutoSizeConfig>,
};

export type InputExpose = {
  focus: () => void;
  blur: () => void;
};

export type InputFormatTrigger = 'onBlur' | 'onChange';

declare global {
  interface EventTarget {
    composing?: boolean;
  }
}
