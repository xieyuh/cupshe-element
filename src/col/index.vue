<template>
  <div
    :style="style"
    :class="bem({ [span]: span, [`offset-${offset}`]: offset })"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { createNamespace } from '../utils';
import { useParent } from '../composables';
import { ROW_KEY } from '../row/index.vue';

const [name, bem] = createNamespace('col');

export default {
  name,

  props: {
    offset: [String, Number],
    span: {
      type: [String, Number],
      default: 0,
    },
  },

  setup() {
    const { parent, index } = useParent(ROW_KEY);

    const style = computed(() => {
      if (!parent) {
        return {};
      }

      const { spaces } = parent;

      if (spaces && spaces.value && spaces.value[index.value]) {
        const { left, right } = spaces.value[index.value];
        return {
          paddingLeft: left ? `${left}px` : null,
          paddingRight: right ? `${right}px` : null,
        };
      }

      return {};
    });

    return {
      bem,
      style,
    };
  },
};
</script>
