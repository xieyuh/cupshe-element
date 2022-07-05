import {
  defineComponent,
  reactive,
  ref,
  provide,
  computed,
  ExtractPropTypes,
  PropType,
} from 'vue';
import {
  useParent,
  useExpose,
  CUSTOM_FIELD_INJECTION_KEY,
} from '../composables';
import {
  FormRule,
  FormItemExpose,
  FormValidateStatus,
  FormSharedProps,
  FormValidateError,
  FormValidateTrigger,
} from './types';
import { createNamespace, FORM_KEY, toArray, isDef } from '../utils';
import { runSyncRule, getRuleMessage, runRuleValidator } from './utils';

import { Row } from '../row';
import { Col, ColProps } from '../col';

const [name, bem] = createNamespace('form-item');

export const formItemProps = {
  name: String,
  layout: String,
  rules: Array as PropType<FormRule[]>,
  label: String,
  labelAlign: String,
  labelCol: Object as PropType<ColProps>,
  wrapperCol: Object as PropType<ColProps>,
  requireMark: Boolean,
  errorMessage: String,
  colon: {
    type: Boolean,
    default: null,
  },
};

export type FormItemProps = ExtractPropTypes<typeof formItemProps>;

export default defineComponent({
  name,

  props: formItemProps,

  setup(props, { slots }) {
    const state = reactive({
      status: 'unvalidated' as FormValidateStatus,
      validateMessage: '',
    });

    const customValue = ref<() => unknown>();

    const { parent: form } = useParent(FORM_KEY);

    const formValue = computed(() => customValue.value?.());

    const getProp = <T extends FormSharedProps>(key: T) => {
      if (isDef(props[key])) {
        return props[key];
      }

      if (form && isDef(form.props[key])) {
        return form.props[key];
      }
    };

    const runRules = (rules: FormRule[]) =>
      rules.reduce(
        (promise, rule) =>
          promise.then(() => {
            if (state.status === 'failed') {
              return;
            }

            let { value } = formValue;

            if (rule.formatter) {
              value = rule.formatter(value, rule);
            }

            if (!runSyncRule(value, rule)) {
              state.status = 'failed';
              state.validateMessage = getRuleMessage(value, rule);
              return;
            }

            if (rule.validator) {
              return runRuleValidator(value, rule).then((result) => {
                if (result && typeof result === 'string') {
                  state.status = 'failed';
                  state.validateMessage = result;
                } else if (result === false) {
                  state.status = 'failed';
                  state.validateMessage = getRuleMessage(value, rule);
                }
              });
            }
          }),
        Promise.resolve()
      );

    const getValidationStatus = () => state.status;

    const resetValidation = () => {
      state.status = 'unvalidated';
      state.validateMessage = '';
    };

    const validate = (rules = props.rules) =>
      new Promise<FormValidateError | void>((resolve) => {
        resetValidation();
        if (rules) {
          runRules(rules).then(() => {
            if (state.status === 'failed') {
              resolve({
                name: props.name,
                message: state.validateMessage,
              });
            } else {
              state.status = 'passed';
              resolve();
            }
          });
        } else {
          resolve();
        }
      });

    const validateWithTrigger = (trigger: FormValidateTrigger) => {
      if (form && props.rules) {
        const { validateTrigger } = form.props;
        const defaultTrigger = toArray(validateTrigger).includes(trigger);
        const rules = props.rules.filter((rule) => {
          if (rule.trigger) {
            return toArray(rule.trigger).includes(trigger);
          }
          return defaultTrigger;
        });

        if (rules.length) {
          validate(rules);
        }
      }
    };

    const renderMessage = () => {
      if (form && form.props.showErrorMessage === false) {
        return;
      }

      const message = props.errorMessage || state.validateMessage;

      if (message) {
        return <div class={bem('error-message')}>{message}</div>;
      }
    };

    const renderLabel = () => {
      const colon = getProp('colon');
      const labelAlign = getProp('labelAlign');
      const labelCol = getProp('labelCol');
      const layout = getProp('layout');

      let label;

      if (slots.label) {
        label = slots.label();
      }

      if (props.label) {
        label = (
          <label class={bem('label', { mark: props.requireMark, colon })}>
            {props.label}
          </label>
        );
      }

      return (
        <Col
          class={bem('label-col', [layout, `align-${labelAlign}`])}
          {...labelCol}
        >
          {label}
        </Col>
      );
    };

    const renderInput = () => {
      const error = state.status === 'failed';
      const wrapperCol = getProp('wrapperCol');

      return (
        <Col {...wrapperCol}>
          {slots.default?.({ error })}
          {renderMessage()}
        </Col>
      );
    };

    useExpose<FormItemExpose>({
      validate,
      formValue,
      resetValidation,
      getValidationStatus,
    });

    provide(CUSTOM_FIELD_INJECTION_KEY, {
      customValue,
      resetValidation,
      validateWithTrigger,
    });

    return () => {
      const layout = getProp('layout');

      return (
        <Row class={bem([layout])}>
          {renderLabel()}
          {renderInput()}
        </Row>
      );
    };
  },
});
