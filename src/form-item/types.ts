/* eslint-disable no-use-before-define */
import type { ComputedRef } from 'vue';

export type FormLayout = 'horizontal' | 'vertical';

export type FormAlign = 'left' | 'right';

export type FormValidateStatus = 'passed' | 'failed' | 'unvalidated';

export type FormSharedProps =
  | 'colon'
  | 'layout'
  | 'labelAlign'
  | 'labelCol'
  | 'wrapperCol';

export type FormValidateTrigger = 'onBlur' | 'onChange' | 'onSubmit';

export type FormValidateError = {
  name?: string;
  message: string;
};

/* eslint-disable no-use-before-define */
export type FormRuleFormatter = (value: any, rule: FormRule) => string;

/* eslint-disable no-use-before-define */
export type FormRuleMessage = string | ((value: any, rule: FormRule) => string);

/* eslint-disable no-use-before-define */
export type FormRuleValidator = (
  value: any,
  rule: FormRule
) => boolean | string | Promise<boolean | string>;

/* eslint-disable no-use-before-define */
export type FormRule = {
  pattern?: RegExp;
  trigger?: FormValidateTrigger | FormValidateTrigger[];
  message?: FormRuleMessage;
  required?: boolean;
  validator?: FormRuleValidator;
  formatter?: FormRuleFormatter;
};

/* eslint-disable no-use-before-define */
export type FormItemExpose = {
  validate: (
    rules?: FormRule[] | undefined
  ) => Promise<void | FormValidateError>;
  resetValidation: () => void;
  getValidationStatus: () => FormValidateStatus;
  /** @private */
  formValue: ComputedRef<unknown>;
};
