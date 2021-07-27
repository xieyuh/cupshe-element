import { CSSProperties, PropType } from 'vue';

export type InputType = 'text' | 'password' | 'textarea';

export const inputProps = {
  placeholder: String,
  autofocus: Boolean,
  autocomplete: Boolean,
  maxlength: [String, Number],
  defaultValue: [String, Number],
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
