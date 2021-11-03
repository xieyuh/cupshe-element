import { defineComponent, PropType } from 'vue';
import { createNamespace } from '../utils';

const [name] = createNamespace('ab-test');

export type ABTestMode = 'positive' | 'negative';

export default defineComponent({
  name,

  props: {
    token: {
      type: String,
    },
    mode: {
      type: String as PropType<ABTestMode>,
      default: 'positive',
    },
  },

  setup(props, { slots }) {
    return () => {
      let show = props.mode === 'positive';

      if (localStorage.getItem(props.token) !== props.token) {
        show = !show;
      }

      return show && slots.default?.();
    };
  },
});
