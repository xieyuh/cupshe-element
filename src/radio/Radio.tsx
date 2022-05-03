import { defineComponent } from 'vue';
import { useParent } from '../composables';
import { createNamespace } from '../utils';
import { RADIO_KEY } from '../radio-group/RadioGroup';

import Checker, { checkerProps } from '../checkbox/Checker';

const [name, bem] = createNamespace('radio');

export default defineComponent({
  name,

  props: checkerProps,

  emits: ['update:modelValue'],

  setup(props, { emit, slots }) {
    const { parent } = useParent(RADIO_KEY);

    const checked = () => {
      const value = parent ? parent.props.modelValue : props.modelValue;
      return value === props.name;
    };

    const toggle = () => {
      if (parent) {
        parent.updateValue(props.name);
      } else {
        emit('update:modelValue', props.name);
      }
    };

    const icon = ({ disabled }) => (
      <div class={bem('icon', { checked: checked(), disabled })} />
    );

    return () => (
      <Checker
        v-slots={{ default: slots.default, icon }}
        bem={bem}
        role="radio"
        parent={parent}
        checked={checked()}
        onToggle={toggle}
        {...props}
      />
    );
  },
});
