import { defineComponent, ExtractPropTypes, PropType } from 'vue';
import {
  createNamespace,
  preventDefault,
  truthProp,
  FORM_KEY,
  makeStringProp,
} from '../utils';
import { useChildren, useExpose } from '../composables';
import type { FormExpose } from './types';
import type {
  FormValidateError,
  FormValidateStatus,
  FormValidateTrigger,
  FormLayout,
  FormAlign,
} from '../form-item';
import type { ColProps } from '../col';

const [name, bem] = createNamespace('form');

const formProps = {
  colon: Boolean,
  scrollToError: Boolean,
  validateFirst: Boolean,
  showErrorMessage: truthProp,
  layout: makeStringProp<FormLayout>('vertical'),
  labelAlign: makeStringProp<FormAlign>('left'),
  labelCol: Object as PropType<ColProps>,
  wrapperCol: Object as PropType<ColProps>,
  validateTrigger: {
    type: [String, Array] as PropType<
      FormValidateTrigger | FormValidateTrigger[]
    >,
    default: 'onBlur',
  },
};

export type FormProps = ExtractPropTypes<typeof formProps>;

export default defineComponent({
  name,

  props: formProps,

  emits: ['submit', 'failed'],

  setup(props, { slots, emit }) {
    const { children, linkChildren } = useChildren(FORM_KEY);

    const getFieldsByNames = (names?: string[]) => {
      if (names) {
        return children.filter((field) => names.includes(field.name));
      }
      return children.filter((field) => Boolean(field.name));
    };

    const validateSeq = (names?: string[]) =>
      new Promise<void>((resolve, reject) => {
        const errors: FormValidateError[] = [];
        const fields = getFieldsByNames(names);

        fields
          .reduce(
            (promise, field) =>
              promise.then(() => {
                if (!errors.length) {
                  return field.validate().then((error?: FormValidateError) => {
                    if (error) {
                      errors.push(error);
                    }
                  });
                }
              }),
            Promise.resolve()
          )
          .then(() => {
            if (errors.length) {
              reject(errors);
            } else {
              resolve();
            }
          });
      });

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

    const validateField = (name: string) => {
      const matched = children.find((item) => item.name === name);

      if (matched) {
        return new Promise<void>((resolve, reject) => {
          matched.validate().then((error?: FormValidateError) => {
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

    const validate = (name?: string | string[]) => {
      if (typeof name === 'string') {
        return validateField(name);
      }
      return props.validateFirst ? validateSeq(name) : validateAll(name);
    };

    const resetValidation = (name?: string | string[]) => {
      if (typeof name === 'string') {
        name = [name];
      }

      const fields = getFieldsByNames(name);
      fields.forEach((item) => {
        item.resetValidation();
      });
    };

    const getValidationStatus = () =>
      children.reduce<Record<string, FormValidateStatus>>((form, field) => {
        form[field.name] = field.getValidationStatus();
        return form;
      }, {});

    const scrollToField = (
      name: string,
      options?: boolean | ScrollIntoViewOptions
    ) => {
      children.some((item) => {
        if (item.name === name) {
          item.$el.scrollIntoView(options);
          return true;
        }
        return false;
      });
    };

    const getValues = () =>
      children.reduce<Record<string, unknown>>((form, field) => {
        if (field.name) {
          form[field.name] = field.formValue.value;
        }
        return form;
      }, {});

    const submit = () => {
      const values = getValues();

      validate()
        .then(() => emit('submit', values))
        .catch((errors: FormValidateError[]) => {
          emit('failed', { values, errors });

          if (props.scrollToError && errors[0].name) {
            scrollToField(errors[0].name);
          }
        });
    };

    const onSubmit = (event: Event) => {
      preventDefault(event);
      submit();
    };

    linkChildren({ props });
    useExpose<FormExpose>({
      submit,
      validate,
      getValues,
      scrollToField,
      resetValidation,
      getValidationStatus,
    });

    return () => (
      <form class={bem()} onSubmit={onSubmit}>
        {slots.default?.()}
      </form>
    );
  },
});
