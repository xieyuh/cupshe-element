import {
  defineComponent,
  computed,
  nextTick,
  onMounted,
  reactive,
  ref,
  CSSProperties,
} from 'vue';
import { addUnit, createNamespace } from '../utils';

const [name, bem] = createNamespace('progress');

export default defineComponent({
  name,

  props: {
    color: String,
    trackColor: String,
    text: String,
    strokeWidth: [Number, String],
    percentage: {
      type: [Number, String],
      required: true,
      validator: (value: number | string) => value >= 0 && value <= 100,
    },
  },

  setup(props, { slots }) {
    const root = ref<HTMLElement>();

    const state = reactive({
      rootWidth: 0,
    });

    const resize = () => {
      nextTick(() => {
        state.rootWidth = root.value ? root.value.offsetWidth : 0;
      });
    };

    onMounted(resize);

    const rootStyle: CSSProperties = {
      background: props.trackColor,
      height: addUnit(props.strokeWidth),
    };

    const portionStyle = computed<CSSProperties>(() => ({
      background: props.color,
      width: (state.rootWidth * +props.percentage) / 100 + 'px',
    }));

    const renderText = () => {
      if (slots.text || props.text) {
        return (
          <span class={bem('text')}>
            {slots.text ? slots.text() : props.text}
          </span>
        );
      }
    };

    const renderPercent = () =>
      slots.percentage ? slots.percentage() : `${props.percentage} %`;

    return () => (
      <div class={bem()}>
        {renderText()}
        <div class={bem('track')} style={rootStyle} ref={root}>
          <span class={bem('portion')} style={portionStyle.value} />
        </div>
        <span class={bem('percentage')}>{renderPercent()}</span>
      </div>
    );
  },
});
