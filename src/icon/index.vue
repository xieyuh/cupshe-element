<template>
  <i :class="bem([name])" :style="style">
    <img v-if="isImageIcon" :src="name" alt="" :class="bem('image')" />
  </i>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { createNamespace, addUnit } from '../utils';

const [name, bem] = createNamespace('icon');

export default defineComponent({
  name,

  props: {
    name: {
      type: String,
      required: true,
    },
    color: String,
    size: [String, Number],
  },

  setup(props) {
    const style = {
      color: props.color,
      fontSize: addUnit(props.size),
    };

    const isImageIcon = computed(() => {
      return props.name?.includes('/');
    });

    return {
      bem,
      style,
      isImageIcon,
    };
  },
});
</script>
