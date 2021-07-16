<template>
  <div
    :class="
      bem({
        [`align-${align}`]: align,
        [`justify-${justify}`]: justify,
        nowrap: !wrap,
      })
    "
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, InjectionKey, PropType } from 'vue';
import { createNamespace, truthProp } from '../utils';
import { useChildren } from '../composables';

const [name, bem] = createNamespace('row');

type RowSpaces = { left?: number; right: number }[];

export type RowProvide = { spaces: ComputedRef<RowSpaces> };

export const ROW_KEY: InjectionKey<RowProvide> = Symbol(name);

type RowAlign = 'top' | 'center' | 'bottom';

type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

export default {
  name,

  props: {
    wrap: truthProp,
    align: String as PropType<RowAlign>,
    justify: String as PropType<RowJustify>,
    gutter: {
      type: [String, Number],
      default: 0,
    },
  },

  setup(props) {
    const { children, linkChildren } = useChildren(ROW_KEY);

    const groups = computed(() => {
      const groups: number[][] = [[]];

      let totalSpan = 0;

      children.forEach((child, index) => {
        totalSpan += Number(child.span);

        if (totalSpan > 24) {
          groups.push([index]);
          totalSpan -= 24;
        } else {
          groups[groups.length - 1].push(index);
        }
      });

      return groups;
    });

    const spaces = computed(() => {
      const gutter = Number(props.gutter);
      const spaces: RowSpaces = [];

      if (!gutter) {
        return spaces;
      }

      groups.value.forEach((group) => {
        const averagePadding = (gutter * (group.length - 1)) / group.length;

        group.forEach((item, index) => {
          if (index === 0) {
            spaces.push({ right: averagePadding });
          } else {
            const left = gutter - spaces[item - 1].right;
            const right = averagePadding - left;
            spaces.push({ left, right });
          }
        });
      });

      return spaces;
    });

    linkChildren({ spaces });

    return {
      bem,
    };
  },
};
</script>
