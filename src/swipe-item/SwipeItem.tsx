import {
  computed,
  nextTick,
  reactive,
  onMounted,
  defineComponent,
  CSSProperties,
} from 'vue';
import { createNamespace } from '../utils';
import { SWIPE_KEY } from '../swipe/Swipe';
import { useExpose, useParent } from '../composables';

const [name, bem] = createNamespace('swipe-item');

export default defineComponent({
  name,

  setup(_, { slots }) {
    let rendered: boolean;
    const state = reactive({
      offset: 0,
      inited: false,
      mounted: false,
    });

    const { parent, index } = useParent(SWIPE_KEY);

    if (!parent) {
      return;
    }

    const style = computed(() => {
      const style: CSSProperties = {};
      const { vertical } = parent.props;

      if (parent.size.value) {
        style[vertical ? 'height' : 'width'] = `${parent.size.value}px`;
      }

      if (state.offset) {
        style.transform = `translate${vertical ? 'Y' : 'X'}(${state.offset}px)`;
      }

      return style;
    });

    const shouldRender = computed(() => {
      const { loop, lazyRender } = parent.props;

      if (!lazyRender || rendered) {
        return true;
      }

      if (!state.mounted) {
        return false;
      }

      const active = parent.activeIndicator.value;
      const maxActive = parent.count.value - 1;
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

    return () => (
      <div class={bem()} style={style.value}>
        {shouldRender.value ? slots.default?.() : null}
      </div>
    );
  },
});
