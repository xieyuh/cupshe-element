<template>
  <Row
    :class="[
      bem(),
      {
        'is-error': validateFailed,
      },
    ]"
  >
    <Col
      :span="labelCol.span"
      :offset="labelCol.offset"
      :class="
        bem('label', {
          required: required,
        })
      "
    >
      <slot name="label">
        <label>{{ label }}</label>
      </slot>
    </Col>
    <!-- 内容区 -->
    <Col
      :span="wrapperCol.span"
      :offset="wrapperCol.offset"
      :class="bem('control')"
    >
      <div :class="bem('control-input')">
        <slot></slot>
      </div>
      <div :class="bem('error')" v-if="validateFailed">
        {{ validateMessage }}
      </div>
    </Col>
  </Row>
</template>

<script lang="ts">
import { PropType, ref, reactive, toRefs, InjectionKey } from 'vue';

import Row from '../row/index.vue';
import Col from '../col/index.vue';
import { useParent, useChildren, useExpose } from '../composables';

import { createNamespace, isPromise, isFunction } from '../utils';

import { runSyncRule } from './utils';

import { FORM_KEY } from '../form/index.vue';

const [name, bem] = createNamespace('form-item');

export type layoutType = 'horizontal' | 'vertical' | 'inline';

export type labelAlignType = 'left' | 'right';

export type ValidateStatusType = 'success' | 'warning' | 'error' | 'validating';

export type FormItemProvide = {
  validateWithTrigger;
};

// 定义组件KEY
export const FORMITEM_KEY: InjectionKey<FormItemProvide> = Symbol(name);

const props = {
  name: String,
  rules: [Object, Array],
  label: String,
  required: Boolean,
  validateStatus: String as PropType<ValidateStatusType>,
  labelAlign: {
    type: String as PropType<labelAlignType>,
    default: 'right',
  },
};

export default {
  name,
  components: {
    Row,
    Col,
  },

  props,

  emits: ['pressEnter', 'change', 'blur', 'update:value'],

  setup(props) {
    const formItemRef = ref<HTMLElement>(null);
    // 获取父组件
    const { parent } = useParent(FORM_KEY);

    const { linkChildren } = useChildren(FORMITEM_KEY);

    const state = reactive({
      focused: false,
      validateFailed: false,
      validateMessage: '',
    });

    // 运行校验器
    const runValidator = (value, rule) =>
      new Promise((resolve) => {
        const returnVal = rule.validator(value, rule);

        if (isPromise(returnVal)) {
          return returnVal.then(resolve);
        }

        resolve(returnVal);
      });
    // 重置校验信息
    const resetValidation = () => {
      state.validateFailed = false;
      state.validateMessage = '';
    };
    const getRuleMessage = (value, rule) => {
      const { message } = rule;

      if (isFunction(message)) {
        return message(value, rule);
      }
      return message;
    };
    // 运行rules
    const runRules = (rules) =>
      rules.reduce(
        (promise, rule) =>
          promise.then(() => {
            // 当前model中的值
            const modelValue = parent.props.model[props.name];

            if (state.validateFailed) {
              return;
            }

            if (!runSyncRule(modelValue, rule)) {
              state.validateFailed = true;
              state.validateMessage = getRuleMessage(modelValue, rule);
              return;
            }

            if (rule.validator) {
              return runValidator(modelValue, rule).then((result) => {
                if (result === false) {
                  state.validateFailed = true;
                  state.validateMessage = getRuleMessage(modelValue, rule);
                }
              });
            }
          }),
        Promise.resolve()
      );
    // formItem 中的rules 或者 form中的rules
    const validate = (rules = props.rules) =>
      new Promise((resolve) => {
        // rule数组
        const rulesMap =
          rules || (parent.props.rules && parent.props.rules[props.name]) || [];

        if (props.required) {
          rulesMap.push({
            required: props.required,
            message: `${props.name} is required`,
          });
        }

        if (!rulesMap) {
          resolve(null);
        }

        resetValidation();

        runRules(rulesMap).then(() => {
          // 校验失败
          if (state.validateFailed) {
            resolve({
              name: props.name,
              message: state.validateMessage,
            });
          } else {
            resolve(null);
          }
        });
      });
    // 校验trigger
    const validateWithTrigger = (trigger) => {
      const newRules =
        props.rules || (parent.props.rules && parent.props.rules[props.name]);
      if (parent && newRules) {
        const defaultTrigger = parent.props.validateTrigger === trigger;
        const rules = newRules.filter((rule) => {
          if (rule.trigger) {
            return rule.trigger === trigger;
          }

          return defaultTrigger;
        });

        validate(rules);
      }
    };

    linkChildren({
      validateWithTrigger,
    });

    useExpose({
      validate,
    });

    return {
      bem,
      formItemRef,
      model: parent.props.model,
      ...toRefs(state),
      labelCol: parent.props.labelCol,
      wrapperCol: parent.props.wrapperCol,
    };
  },
};
</script>
