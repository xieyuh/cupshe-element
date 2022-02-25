import { defineComponent, computed, watch } from 'vue';
import { createNamespace } from '../utils';

import { Icon } from '../icon';

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
      const { modelValue, pageCount } = props;

      const items: PageItem[] = [];

      const start = Math.max(modelValue - 2, 1);
      const end = Math.min(modelValue + 2, pageCount);

      for (let number = start; number <= end; number++) {
        const page = makePage(number, false, number === modelValue);
        items.push(page);
      }

      const prefixItems: PageItem[] = [];
      const suffixItems: PageItem[] = [];

      if (start > 1) {
        prefixItems.push({ number: 1, active: false });
      }

      if (start > 2) {
        prefixItems.push({ ellipses: true, active: false });
      }

      if (end < pageCount) {
        suffixItems.push({ number: pageCount, active: false });
      }

      if (end < pageCount - 1) {
        suffixItems.unshift({ ellipses: true, active: false });
      }

      return prefixItems.concat(items, suffixItems);
    });

    const select = (page: number) => () => {
      const { modelValue, pageCount } = props;

      if (!page) return;

      page = Math.min(pageCount, Math.max(1, page));

      if (page < 1 || page > pageCount) {
        return;
      }

      if (modelValue !== page) {
        emit('update:modelValue', page);
        emit('change', page);
      }
    };

    watch(
      () => props.modelValue,
      (value) => select(value),
      { immediate: true }
    );

    const renderPages = () =>
      pages.value.map((page) => (
        <li
          key={page.number}
          onClick={select(page.number!)}
          class={bem('item', { active: page.active, ellipses: page.ellipses })}
        >
          {page.ellipses ? '···' : page.number}
        </li>
      ));

    return () => {
      const { modelValue, pageCount } = props;

      return (
        <ul class={bem()}>
          <li
            class={bem('item', { disabled: modelValue === 1 })}
            onClick={select(modelValue - 1)}
          >
            <Icon name="arrow_left" class={bem('prev')} />
          </li>
          {renderPages()}
          <li
            class={bem('item', { disabled: modelValue === pageCount })}
            onClick={select(modelValue + 1)}
          >
            <Icon name="arrow_right" class={bem('next')} />
          </li>
        </ul>
      );
    };
  },
});
