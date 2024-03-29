import { defineComponent, computed, CSSProperties, PropType } from 'vue';
import { addUnit, createNamespace } from '../utils';
import { useRefs, useCustomFieldValue } from '../composables';

import { Icon } from '../icon';

type RateStatus = 'full' | 'half' | 'void';

type RateSize = 'large' | 'normal' | 'small';

type RateListItem = {
  value: number;
  status: RateStatus;
};

function getRateStatus(
  value: number,
  index: number,
  allowHalf: boolean
): RateListItem {
  if (value >= index) {
    return { status: 'full', value: 1 };
  }

  if (value >= index - 0.5 && allowHalf) {
    return { status: 'half', value: 0.5 };
  }

  return { status: 'void', value: 0 };
}

const [name, bem] = createNamespace('rate');

export default defineComponent({
  name,

  props: {
    color: String,
    gutter: [Number, String],
    readonly: Boolean,
    disabled: Boolean,
    voidColor: String,
    disabledColor: String,
    allowHalf: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String as PropType<RateSize>,
      default: 'normal',
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

  emits: ['change', 'update:modelValue'],

  setup(props, { emit, slots }) {
    const [itemRefs, setItemRefs] = useRefs();

    const list = computed<RateListItem[]>(() =>
      Array(+props.count)
        .fill('')
        .map((_, i) => getRateStatus(+props.modelValue, i + 1, props.allowHalf))
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

    const renderStar = (item: RateListItem, index: number) => {
      const {
        icon,
        voidColor,
        color,
        voidIcon,
        gutter,
        allowHalf,
        count,
        size,
        disabled,
        disabledColor,
      } = props;

      const score = index + 1;
      const isFull = item.status === 'full';
      const isVoid = item.status === 'void';
      const isHalf = allowHalf && item.value > 0 && item.value < 1;

      const style: CSSProperties = {};
      if (gutter && score !== +count) {
        style.paddingRight = addUnit(gutter);
      }

      const onClickItem = (event: MouseEvent) => {
        updateRanges();
        select(allowHalf ? getScoreByPosition(event.clientX) : score);
      };

      return (
        <div
          key={index}
          style={style}
          ref={setItemRefs(index)}
          class={bem('item')}
          tabindex={0}
          role="radio"
          aria-setsize={+count}
          aria-posinset={score}
          aria-checked={!isVoid}
          onClick={onClickItem}
        >
          {slots.icon ? (
            slots.icon({ isFull, isVoid, isHalf, size, disabled, color })
          ) : (
            <>
              <Icon
                name={isFull ? icon : voidIcon}
                class={bem('icon', [
                  size,
                  {
                    disabled,
                    full: isFull,
                  },
                ])}
                color={disabled ? disabledColor : isFull ? voidColor : color}
              />
              {isHalf && (
                <Icon
                  style={{ width: item.value + 'em' }}
                  name={isVoid ? voidIcon : icon}
                  class={bem('icon', [
                    'half',
                    size,
                    {
                      disabled,
                      full: isVoid,
                    },
                  ])}
                  color={disabled ? disabledColor : isVoid ? voidColor : color}
                />
              )}
            </>
          )}
        </div>
      );
    };

    useCustomFieldValue(() => props.modelValue);

    return () => (
      <div
        role="radiogroup"
        class={bem({ readonly: props.readonly, disabled: props.disabled })}
        tabindex={0}
      >
        {list.value.map(renderStar)}
      </div>
    );
  },
});
