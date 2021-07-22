<template>
  <div
    role="radiogroup"
    :class="
      bem({
        readonly,
        disabled,
      })
    "
    tabindex="0"
  >
    <div
      v-for="item in list.map(renderStar)"
      :key="item.index"
      :ref="item.ref"
      role="radio"
      :style="item.style"
      :class="bem('item')"
      tabindex="0"
      :aria-setsize="+count"
      :aria-posinset="item.score"
      :aria-checked="!item.isVoid"
      @click="item.onClickItem"
    >
      <c-icon
        :name="item.isFull ? icon : voidIcon"
        :class="bem('icon', [size, { disabled, full: item.isFull }])"
        :color="disabled ? disabledColor : item.isFull ? color : voidColor"
      />
      <c-icon
        v-if="item.renderHalf"
        :style="{ width: item.value + 'em' }"
        :name="item.isVoid ? voidIcon : icon"
        :class="bem('icon', ['half', size, { disabled, full: !item.isVoid }])"
        :color="disabled ? disabledColor : item.isVoid ? voidColor : color"
      />
    </div>
    <span v-if="$slots.text" :class="bem('text')" @click="onTextClick">
      <slot name="text" />
    </span>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, PropType } from 'vue';
import { addUnit, createNamespace } from '../utils';
import { useRefs, useLinkField } from '../composables';

type RateStatus = 'full' | 'half' | 'void';

type RateSize = 'small' | 'middle' | 'large';

type RateListItem = {
  value: number;
  status: RateStatus;
};

function getRateStatus(
  value: number,
  index: number,
  allowHalf: boolean,
  readonly: boolean
): RateListItem {
  if (value >= index) {
    return { status: 'full', value: 1 };
  }

  if (value + 0.5 >= index && allowHalf && !readonly) {
    return { status: 'half', value: 0.5 };
  }

  if (value + 1 >= index && allowHalf && readonly) {
    const cardinal = 10 ** 10;
    return {
      status: 'half',
      value: Math.round((value - index + 1) * cardinal) / cardinal,
    };
  }

  return { status: 'void', value: 0 };
}

const [name, bem] = createNamespace('rate');

export default {
  name,

  props: {
    color: String,
    gutter: [Number, String],
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    voidColor: String,
    disabledColor: String,
    size: {
      type: String as PropType<RateSize>,
      default: 'middle',
    },
    modelValue: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: 'star_full',
    },
    voidIcon: {
      type: String,
      default: 'star',
    },
    count: {
      type: [String, Number],
      default: 5,
    },
  },

  emits: ['change', 'update:modelValue', 'click-text'],

  setup(props, { emit }) {
    const [itemRefs, setItemRefs] = useRefs();

    const list = computed<RateListItem[]>(() =>
      Array(props.count)
        .fill('')
        .map((_, i) =>
          getRateStatus(
            props.modelValue,
            i + 1,
            props.allowHalf,
            props.readonly
          )
        )
    );

    let ranges: Array<{ left: number; score: number }>;

    const updateRanges = () => {
      const rects = itemRefs.value.map((item) => item.getBoundingClientRect());

      ranges = [];
      rects.forEach((rect, index) => {
        if (props.allowHalf) {
          ranges.push(
            { score: index + 0.5, left: rect.left },
            { score: index + 1, left: rect.left + rect.width / 2 }
          );
        } else {
          ranges.push({ score: index + 1, left: rect.left });
        }
      });
    };

    const getScoreByPosition = (x: number) => {
      for (let i = ranges.length - 1; i > 0; i--) {
        if (x > ranges[i].left) {
          return ranges[i].score;
        }
      }
      return props.allowHalf ? 0.5 : 1;
    };

    const select = (index: number) => {
      if (!props.disabled && !props.readonly && index !== props.modelValue) {
        emit('update:modelValue', index);
        emit('change', index);
      }
    };

    const onTextClick = (e: MouseEvent) => emit('click-text', e);

    const renderStar = (item: RateListItem, index: number) => {
      const score = index + 1;
      const isFull = item.status === 'full';
      const isVoid = item.status === 'void';
      const renderHalf = props.allowHalf && item.value > 0 && item.value < 1;

      let style: CSSProperties;
      if (props.gutter && score !== +props.count) {
        style = { paddingRight: addUnit(props.gutter) };
      }

      const onClickItem = (event: MouseEvent) => {
        updateRanges();
        select(props.allowHalf ? getScoreByPosition(event.clientX) : score);
      };

      return {
        index,
        style,
        score,
        isVoid,
        isFull,
        renderHalf,
        value: item.value,
        onClickItem,
        ref: setItemRefs(index),
      };
    };

    useLinkField(() => props.modelValue);

    return {
      bem,
      list,
      renderStar,
      onTextClick,
    };
  },
};
</script>
