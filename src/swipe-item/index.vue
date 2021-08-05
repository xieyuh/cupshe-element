<template>
  <div :class="bem()" :style="style">
    <slot v-if="shouldRender" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  CSSProperties,
  nextTick,
  onMounted,
  reactive,
} from 'vue';
import { createNamespace } from '../utils';
import { useParent, useExpose } from '../composables';
import { SWIPE_KEY } from '../swipe/index.vue';

const [name, bem] = createNamespace('swipe-item');

export default defineComponent({
  name,

  setup() {
    let rendered: boolean;

    const state = reactive({
      offset: 0,
      inited: false,
      mounted: false,
    });

    const { parent, index } = useParent(SWIPE_KEY);

    const style = computed(() => {
      const s: CSSProperties = {};
      const { vertical } = parent!.props;

      if (parent!.size.value) {
        s[vertical ? 'height' : 'width'] = `${parent!.size.value}px`;
      }

      if (state.offset) {
        s.transform = `translate${vertical ? 'Y' : 'X'}(${state.offset}px)`;
      }

      return s;
    });

    const shouldRender = computed(() => {
      const { loop, lazyRender } = parent!.props;

      if (!lazyRender || rendered) {
        return true;
      }

      if (!state.mounted) {
        return false;
      }

      const active = parent!.activeIndicator.value;
      const maxActive = parent!.count.value - 1;
      const prevActive = active === 0 && loop ? maxActive : active - 1;
      const nextActive = active === maxActive && loop ? 0 : active + 1;
      rendered =
        index.value === active ||
        index.value === prevActive ||
        index.value === nextActive;

      return rendered;
    });

    const setOffset = (offset: number) => {
      state.offset = offset;
    };

    onMounted(() => {
      nextTick(() => {
        state.mounted = true;
      });
    });

    useExpose({ setOffset });

    return {
      bem,
      style,
      shouldRender,
    };
  },
});
</script>
