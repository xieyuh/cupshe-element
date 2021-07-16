export type FieldValidateTrigger = 'onSubmit' | 'onChange' | 'onBlur';

export type FieldRule = {
  pattern?: RegExp;
  trigger?: FieldValidateTrigger;
  len?: number;
  message?: string | ((value: unknown, rule: FieldRule) => string);
  required?: boolean;
  min?: number;
  max?: number;
  validator?: (value: unknown, rule: FieldRule) => boolean | Promise<boolean>;
};

function isEmptyValue(value: unknown) {
  if (Array.isArray(value)) {
    return !value.length;
  }
  if (value === 0) {
    return false;
  }
  return !value;
}

export function runSyncRule(value: unknown, rule: FieldRule) {
  if (rule.required && isEmptyValue(value)) {
    return false;
  }
  if (rule.min && ('' + value).length < rule.min) {
    return false;
  }
  if (rule.max && ('' + value).length > rule.max) {
    return false;
  }
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return false;
  }
  return true;
}
