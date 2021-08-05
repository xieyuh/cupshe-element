<template>
  <ul :class="bem()">
    <li
      v-if="modelValue !== 1"
      :class="bem('item')"
      @click="select(modelValue - 1)"
    >
      <c-icon name="arrow_left" :class="bem('prev')" />
    </li>
    <li
      v-for="page in pages"
      :class="[bem('item', { active: page.active, ellipses: page.ellipses })]"
      :key="page.number"
      @click="select(page.number)"
    >
      {{ page.ellipses ? '...' : page.number }}
    </li>
    <li
      v-if="modelValue !== pageCount"
      :class="bem('item')"
      @click="select(modelValue + 1)"
    >
      <c-icon name="arrow_right" :class="bem('next')" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { createNamespace } from '../utils';

const [name, bem] = createNamespace('pagination');

type PageItem = {
  ellipses?: boolean;
  number?: number;
  active?: boolean;
};

function makePage(
  number?: number,
  ellipses?: boolean,
  active?: boolean
): PageItem {
  return { number, ellipses, active };
}

export default defineComponent({
  name,

  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
    pageCount: {
      type: Number,
      default: 1,
    },
  },

  emits: ['change', 'update:modelValue'],

  setup(props, { emit }) {
    const pages = computed(() => {
      const items: PageItem[] = [];

      const startPage = Math.max(props.modelValue - 2, 1);
      const endPage = Math.min(props.modelValue + 2, props.pageCount);

      for (let number = startPage; number <= endPage; number++) {
        const page = makePage(number, false, number === props.modelValue);
        items.push(page);
      }

      const prefixItems: PageItem[] = [];
      const suffixItems: PageItem[] = [];

      if (startPage > 1) {
        prefixItems.push({ number: 1, active: false });
      }

      if (startPage > 2) {
        prefixItems.push({ ellipses: true, active: false });
      }

      if (endPage < props.pageCount) {
        suffixItems.push({ number: props.pageCount, active: false });
      }

      if (endPage < props.pageCount - 1) {
        suffixItems.unshift({ ellipses: true, active: false });
      }

      return prefixItems.concat(items, suffixItems);
    });

    const select = (page: number) => {
      if (!page) return;

      page = Math.min(props.pageCount, Math.max(1, page));

      if (props.modelValue !== page) {
        emit('update:modelValue', page);
        emit('change', page);
      }
    };

    watch(
      () => props.modelValue,
      (value) => select(value),
      { immediate: true }
    );

    return {
      bem,
      pages,
      select,
    };
  },
});
</script>
