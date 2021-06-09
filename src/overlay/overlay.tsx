import { PropType, Transition, CSSProperties, defineComponent } from 'vue';
import {
  isDef,
  extend,
  truthProp,
  unknownProp,
  createNamespace,
  getZIndexStyle,
} from '../utils';
import { useLazyRender } from '../composables/use-lazy-render';

const [name, bem] = createNamespace('overlay');

export default defineComponent({
  name,

  props: {
    show: Boolean,
    zIndex: [Number, String],
    duration: [Number, String],
    className: unknownProp,
    customStyle: Object as PropType<CSSProperties>,
  },

  setup(props, { slots }) {
    const lazyRender = useLazyRender(() => props.show);

    const renderOverlay = lazyRender(() => {
      const style: CSSProperties = extend(
        getZIndexStyle(props.zIndex),
        props.customStyle
      );

      if (isDef(props.duration)) {
        style.animationDuration = `${props.duration}s`;
      }

      return (
        <div v-show={props.show} style={style} class={[bem(), props.className]}>
          {slots.default?.()}
        </div>
      );
    });

    return () => <Transition name="c-fade">{renderOverlay()}</Transition>;
  },
});
