import type { ComponentPublicInstance } from 'vue';
import type { FormProps } from './Form';
import type { FormValidateStatus } from '../form-item';

export type FormExpose = {
  submit: () => void;
  validate: (name?: string | string[] | undefined) => Promise<void>;
  getValues: () => Record<string, unknown>;
  scrollToField: (
    name: string,
    options?: boolean | ScrollIntoViewOptions | undefined
  ) => void;
  resetValidation: (name?: string | string[] | undefined) => void;
  getValidationStatus: () => Record<string, FormValidateStatus>;
};

export type FormProvide = {
  props: FormProps;
};

export type FormInstance = ComponentPublicInstance<FormProps, FormExpose>;
