<template>
  <form
    :class="
      bem({
        [layout]: layout,
      })
    "
    onSubmit="{onSubmit}"
  >
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { PropType, InjectionKey, ExtractPropTypes } from 'vue';

import { useChildren, useExpose } from '../composables';

import { createNamespace } from '../utils';

// Types
import type {
  // FieldTextAlign,
  FieldValidateError,
  FieldValidateTrigger,
} from '../form-item/type';

const [name, bem] = createNamespace('form');

export type layoutType = 'horizontal' | 'vertical' | 'inline';

export type labelAlignType = 'left' | 'right';

const props = {
  model: Object,
  rules: Object,
  layout: {
    type: String as PropType<layoutType>,
    default: 'horizontal',
  },
  labelAlign: {
    type: String as PropType<labelAlignType>,
    default: 'right',
  },
  labelCol: Object,
  wrapperCol: Object,
  name: String,
  validateTrigger: {
    type: String as PropType<FieldValidateTrigger>,
    default: 'blur',
  },
};
export type FormProvide = {
  props: ExtractPropTypes<typeof props>;
};

// 定义组件KEY
export const FORM_KEY: InjectionKey<FormProvide> = Symbol(name);

export default {
  name,

  props,

  emits: ['submit', 'finishFailed'],

  setup(props, { emit }) {
    const { children, linkChildren } = useChildren(FORM_KEY);

    const validateField = (name: string) => {
      const matched = children.find((item) => item.name === name);

      if (matched) {
        return new Promise<void>((resolve, reject) => {
          matched.validate().then((error?: FieldValidateError) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      }

      return Promise.reject();
    };

    const getFieldsByNames = (names?: string[]) => {
      if (names) {
        return children.filter((field) => names.includes(field.name));
      }
      return children;
    };

    const validateAll = (names?: string[]) =>
      new Promise<void>((resolve, reject) => {
        const fields = getFieldsByNames(names);
        Promise.all(fields.map((item) => item.validate())).then((errors) => {
          errors = errors.filter(Boolean);

          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });

    const validate = (name?: string | string[]) => {
      if (typeof name === 'string') {
        return validateField(name);
      }
      return validateAll(name);
    };

    const getValues = () =>
      children.reduce((form, field) => {
        form[field.name] = field.formValue.value;

        return form;
      }, {} as Record<string, unknown>);
    //  提交校验成功
    const submit = () => {
      const values = getValues();

      validate()
        .then(() => emit('submit', values))
        .catch((errors: FieldValidateError[]) => {
          emit('finishFailed', { values, errors });
        });
    };

    const onSubmit = (event: Event) => {
      event.preventDefault();
      submit();
    };

    linkChildren({ props });

    useExpose({
      submit,
      validate,
    });
    return {
      bem,
      onSubmit,
      validate,
    };
  },
};
</script>
