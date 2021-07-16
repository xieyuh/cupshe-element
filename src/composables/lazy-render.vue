<template>
  <template v-if="inited">
    <slot />
  </template>
</template>

<script lang="ts">
import { ref, watch } from 'vue';

export default {
  props: {
    show: [Boolean, undefined],
  },

  setup(props) {
    const inited = ref(false);

    watch(
      () => props.show,
      (value) => {
        if (value) {
          inited.value = value;
        }
      },
      { immediate: true }
    );

    return { inited };
  },
};
</script>
