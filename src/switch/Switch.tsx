import { defineComponent, ExtractPropTypes } from 'vue';
import { useCustomFieldValue } from '../composables';
import { createNamespace, unknownProp } from '../utils';

const [name, bem] = createNamespace('switch');

const switchProps = {
  disabled: Boolean,
  modelValue: unknownProp,
  activeColor: String,
  inactiveColor: String,
  activeValue: {
    type: unknownProp,
    default: true as unknown,
  },
  inactiveValue: {
    type: unknownProp,
    default: false as unknown,
  },
};

export type SwitchProps = ExtractPropTypes<typeof switchProps>;

export default defineComponent({
  name,

  props: switchProps,

  emits: ['change', 'update:modelValue'],

  setup(props, { emit }) {
    const isChecked = () => props.modelValue === props.activeValue;

    const onClick = () => {
      if (!props.disabled) {
        const newValue = isChecked() ? props.inactiveValue : props.activeValue;
        emit('update:modelValue', newValue);
        emit('change', newValue);
      }
    };

    useCustomFieldValue(() => props.modelValue);

    return () => {
      const { disabled, activeColor, inactiveColor } = props;
      const checked = isChecked();
      const style = {
        backgroundColor: checked ? activeColor : inactiveColor,
      };

      return (
        <div
          role="switch"
          class={bem({
            on: checked,
            disabled,
          })}
          style={style}
          tabindex={disabled ? undefined : 0}
          aria-checked={checked}
          onClick={onClick}
        >
          <div class={bem('node')} />
        </div>
      );
    };
  },
});
