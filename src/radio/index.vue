<template>
  <Checker
    :bem="bem"
    role="radio"
    :parent="parent"
    :checked="checked"
    @toggle="toggle"
    v-bind="props"
  >
    <slot />
    <template #icon="prop">
      <slot name="icon" v-bind="prop" />
    </template>
  </Checker>
</template>

<script lang="ts">
import { computed } from 'vue';
import { createNamespace } from '../utils';
import { RADIO_KEY } from '../radio-group/index.vue';
import { useParent } from '../composables';
import Checker, { checkerProps } from '../checkbox/checker.vue';

const [name, bem] = createNamespace('radio');

export default {
  name,

  components: { Checker },

  props: checkerProps,

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const { parent } = useParent(RADIO_KEY);

    const checked = computed(() => {
      const value = parent ? parent.props.modelValue : props.modelValue;
      return value === props.name;
    });

    const toggle = () => {
      if (parent) {
        parent.updateValue(props.name);
      } else {
        emit('update:modelValue', props.name);
      }
    };

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
