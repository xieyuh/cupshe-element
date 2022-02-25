import { defineComponent, computed, watch, ExtractPropTypes } from 'vue';
import { createNamespace, extend, pick, truthProp } from '../utils';
import { useExpose, useParent, useCustomFieldValue } from '../composables';
import { CHECKBOX_GROUP_KEY } from '../checkbox-group/CheckboxGroup';
import Checker, { checkerProps } from './Checker';
import { CheckboxExpose } from './types';

const [name, bem] = createNamespace('checkbox');

const props = extend({}, checkerProps, {
  bindGroup: truthProp,
});

export type CheckboxProps = ExtractPropTypes<typeof props>;

export default defineComponent({
  name,

  props,

  emits: ['change', 'update:modelValue'],

  setup(props, { emit, slots }) {
    const { parent } = useParent(CHECKBOX_GROUP_KEY);

    const setParentValue = (checked: boolean) => {
      const { name } = props;
      const { max, modelValue } = parent!.props;
      const value = modelValue.slice();

      if (checked) {
        const overlimit = max && value.length >= max;

        if (!overlimit && !value.includes(name)) {
          value.push(name);

          if (props.bindGroup) {
            parent!.updateValue(value);
          }
        }
      } else {
        const index = value.indexOf(name);

        if (index !== -1) {
          value.splice(index, 1);

          if (props.bindGroup) {
            parent!.updateValue(value);
          }
        }
      }
    };

    const checked = computed(() => {
      if (parent && props.bindGroup) {
        return parent.props.modelValue.indexOf(props.name) !== -1;
      }
      return !!props.modelValue;
    });

    const toggle = (newValue = !checked.value) => {
      if (parent && props.bindGroup) {
        setParentValue(newValue);
      } else {
        emit('update:modelValue', newValue);
      }
    };

    watch(
      () => props.modelValue,
      (value) => emit('change', value)
    );

    useExpose<CheckboxExpose>({ toggle, props, checked });
    useCustomFieldValue(() => props.modelValue);

    return () => (
      <Checker
        v-slots={pick(slots, ['default', 'icon'])}
        bem={bem}
        role="checkbox"
        parent={parent}
        checked={checked.value}
        onToggle={toggle}
        {...props}
      />
    );
  },
});
