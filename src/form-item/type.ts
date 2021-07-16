export type FieldValidateTrigger = 'blur' | 'change' | 'submit';

export type FieldTextAlign = 'left' | 'center' | 'right';

export type FieldValidateError = {
  name?: string;
  message: string;
};

export type FieldRule = {
  pattern?: RegExp;
  trigger?: FieldValidateTrigger;
  message?: string | ((value: any, rule: FieldRule) => string);
  required?: boolean;
  validator?: (
    value: any,
    rule: FieldRule
  ) => boolean | string | Promise<boolean | string>;
  formatter?: (value: any, rule: FieldRule) => string;
};

export type FieldProvide = {
  childFieldValue: Ref<(() => unknown) | undefined>;
  resetValidation: () => void;
  validateWithTrigger: (trigger: FieldValidateTrigger) => void;
};
