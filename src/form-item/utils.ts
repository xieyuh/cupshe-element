import type { FormRule } from './types';
import { isPromise, isFunction } from '../utils';

function isEmptyValue(value: unknown) {
  if (Array.isArray(value)) {
    return !value.length;
  }
  if (value === 0) {
    return false;
  }
  return !value;
}

export function runSyncRule(value: unknown, rule: FormRule) {
  if (rule.required && isEmptyValue(value)) {
    return false;
  }
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return false;
  }
  return true;
}

export function getRuleMessage(value: unknown, rule: FormRule) {
  const { message } = rule;

  if (isFunction(message)) {
    return message(value, rule);
  }
  return message || '';
}

export function runRuleValidator(value: unknown, rule: FormRule) {
  return new Promise((resolve) => {
    const returnVal = rule.validator!(value, rule);

    if (isPromise(returnVal)) {
      returnVal.then(resolve);
      return;
    }

    resolve(returnVal);
  });
}
