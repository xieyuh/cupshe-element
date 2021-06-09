import { defineComponent, watch, computed } from 'vue';
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
      const { modelValue, pageCount } = props;

      const items: PageItem[] = [];

      const startPage = Math.max(modelValue - 2, 1);

      const endPage = Math.min(modelValue + 2, pageCount);

      for (let number = startPage; number <= endPage; number++) {
        const page = makePage(number, false, number === modelValue);
        items.push(page);
      }

      const prefixItems = [];
      const suffixItems = [];

      if (startPage > 1) {
        prefixItems.push({ number: 1, active: false });
      }

      if (startPage > 2) {
        prefixItems.push({ ellipses: true, active: false });
      }

      if (endPage < pageCount) {
        suffixItems.push({ number: pageCount, active: false });
      }

      if (endPage < pageCount - 1) {
        suffixItems.unshift({ ellipses: true, active: false });
      }

      return prefixItems.concat(items, suffixItems);
    });

    const select = (page: number) => {
      page = Math.min(props.pageCount, Math.max(1, page));

      if (props.modelValue !== page) {
        emit('update:modelValue', page);
        emit('change', page);
      }
    };

    const onSelect = (value: number) => () => {
      if (value) {
        select(value);
      }
    };

    watch(
      () => props.modelValue,
      (modelValueValue) => {
        select(modelValueValue);
      },
      { immediate: true }
    );

    const Prev = () => {
      if (props.modelValue === 1) return;
      return (
        <li class={bem('item')} onClick={onSelect(props.modelValue - 1)}>
          <svg role="presentation" viewBox="0 0 11 18" class={bem('prev')}>
            <path
              d="M9.5 1.5L1.5 9l8 7.5"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="square"
            />
          </svg>
        </li>
      );
    };

    const Next = () => {
      if (props.modelValue === props.pageCount) return;
      return (
        <li class={bem('item')} onClick={onSelect(props.modelValue + 1)}>
          <svg role="presentation" viewBox="0 0 11 18" class={bem('next')}>
            <path
              d="M1.5 1.5l8 7.5-8 7.5"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="square"
            />
          </svg>
        </li>
      );
    };

    return () => {
      return (
        <ul class={bem()}>
          {Prev()}
          {pages.value.map((page) => (
            <li
              class={[
                bem('item', {
                  active: page.active,
                  ellipses: page.ellipses,
                }),
                bem('page'),
              ]}
              onClick={onSelect(page.number)}
            >
              {page.ellipses ? '...' : page.number}
            </li>
          ))}
          {Next()}
        </ul>
      );
    };
  },
});
