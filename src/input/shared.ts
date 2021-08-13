import { CSSProperties, PropType } from 'vue';

export type InputType =
  | 'tel'
  | 'text'
  | 'digit'
  | 'number'
  | 'search'
  | 'password'
  | 'textarea';

export type AutoSizeConfig = {
  maxHeight?: number;
  minHeight?: number;
};

export const inputProps = {
  placeholder: String,
  autofocus: Boolean,
  autocomplete: Boolean,
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
  rows: [String, Number],
  autosize: [Boolean, Object] as PropType<boolean | AutoSizeConfig>,
};

export type InputExpose = {
  focus: () => void;
  blur: () => void;
};

export type InputFormatTrigger = 'onBlur' | 'onChange';
