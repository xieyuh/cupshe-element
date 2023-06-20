import { defineComponent, PropType, Transition, CSSProperties } from 'vue';
import {
  noop,
  isDef,
  extend,
  truthProp,
  unknownProp,
  preventDefault,
  createNamespace,
  getZIndexStyle,
} from '../utils';
import { useLazyRender } from '../composables';

const [name, bem] = createNamespace('overlay');

export default defineComponent({
  name,

  props: {
    show: Boolean,
    zIndex: [Number, String],
    duration: [Number, String],
    className: unknownProp,
    lockScroll: truthProp,
    customStyle: Object as PropType<CSSProperties>,
    transition: { type: String, default: 'c-fade' },
  },

  setup(props, { slots }) {
    const lazyRender = useLazyRender(() => props.show);

    const preventTouchMove = (event: TouchEvent) => {
      preventDefault(event, true);
    };

    const renderOverlay = lazyRender(() => {
      const style: CSSProperties = extend(
        getZIndexStyle(props.zIndex),
        props.customStyle
      );

      if (isDef(props.duration)) {
        style.animationDuration = `${props.duration}s`;
      }

      return (
        <div
          v-show={props.show}
          style={style}
          class={[bem(), props.className]}
          onTouchmove={props.lockScroll ? preventTouchMove : noop}
        >
          {slots.default?.()}
        </div>
      );
    });

    return () => (
      <Transition name={props.transition}>{renderOverlay()}</Transition>
    );
  },
});
