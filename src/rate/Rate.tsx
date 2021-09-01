import { defineComponent, computed, CSSProperties, PropType } from 'vue';
import { addUnit, createNamespace } from '../utils';
import { useRefs, useCustomFieldValue } from '../composables';

type RateStatus = 'full' | 'half' | 'void';

type RateSize = 'large' | 'normal' | 'small';

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

export default defineComponent({
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

    const renderStar = (item: RateListItem, index: number) => {
      const score = index + 1;
      const isFull = item.status === 'full';
      const isVoid = item.status === 'void';
      const renderHalf = props.allowHalf && item.value > 0 && item.value < 1;

      const style: CSSProperties = {};
      if (props.gutter && score !== +props.count) {
        style.paddingRight = addUnit(props.gutter);
      }

      const onClickItem = (event: MouseEvent) => {
        updateRanges();
        select(props.allowHalf ? getScoreByPosition(event.clientX) : score);
      };

      return (
        <div
          key={index}
          style={style}
          ref={setItemRefs(index)}
          class={bem('item')}
          tabindex={0}
          role="radio"
          aria-setsize={+props.count}
          aria-posinset={score}
          aria-checked={!isVoid}
          onClick={onClickItem}
        >
          <c-icon
            name={isFull ? props.icon : props.voidIcon}
            class={bem('icon', [
              props.size,
              {
                disabled: props.disabled,
                full: isFull,
              },
            ])}
            color={
              props.disabled
                ? props.disabledColor
                : isFull
                ? props.voidColor
                : props.color
            }
          />
          {renderHalf && (
            <c-icon
              style={{ width: item.value + 'em' }}
              name={isVoid ? props.voidIcon : props.icon}
              class={bem('icon', [
                'half',
                props.size,
                {
                  disabled: props.disabled,
                  full: isVoid,
                },
              ])}
              color={
                props.disabled
                  ? props.disabledColor
                  : isVoid
                  ? props.voidColor
                  : props.color
              }
            />
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
