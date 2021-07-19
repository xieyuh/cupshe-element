<template>
  <Checker
    :bem="bem"
    role="checkbox"
    :parent="parent"
    :checked="checked"
    @toggle="toggle"
    v-bind="props"
  >
    <template #default>
      <slot />
    </template>
  </Checker>
</template>

<script lang="ts">
import { computed, watch } from 'vue';
import { createNamespace, extend, truthProp } from '../utils';
import { useParent } from '../composables/use-parent';
import { useExpose } from '../composables/use-expose';
import { useLinkField } from '../composables/use-link-field';
import { CHECKBOX_GROUP_KEY } from '../checkbox-group/index.vue';
import Checker, { checkerProps } from './checker.vue';

const [name, bem] = createNamespace('checkbox');

export default {
  name,

  components: { Checker },

  props: extend({}, checkerProps, {
    bindGroup: truthProp,
  }),

  emits: ['change', 'update:modelValue'],

  setup(props, { emit }) {
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

    useExpose({ toggle, props, checked });
    useLinkField(() => props.modelValue);

    return {
      bem,
      parent,
      checked,
      toggle,
      props,
    };
  },
};
</script>
