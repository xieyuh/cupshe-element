<template>
  <span
    :class="[
      bem({ checkable, checked: isChecked }),
      { [checkedClass]: isChecked },
    ]"
    @click="onClick"
    :style="style"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent, CSSProperties, ref, watch } from 'vue';
import { createNamespace } from '../utils';

const [name, bem] = createNamespace('tag');

export default defineComponent({
  name,

  props: {
    color: String,
    textColor: String,
    checkedClass: String,
    checkable: {
      type: Boolean,
      default: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    const isChecked = ref(false);

    const onClick = (event: MouseEvent) => {
      emit('click', event);

      if (props.checkable) {
        isChecked.value = !isChecked.value;
      }
    };

    watch(
      () => props.checked,
      (value) => {
        isChecked.value = value;
      },
      { immediate: true }
    );

    const style: CSSProperties = {
      color: props.textColor,
      backgroundColor: props.color,
    };

    return {
      bem,
      style,
      isChecked,
      onClick,
    };
  },
});
</script>
