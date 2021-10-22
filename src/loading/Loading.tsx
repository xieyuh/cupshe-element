import { computed, defineComponent } from 'vue';
import { createNamespace, getSizeStyle, extend } from '../utils';

const [name, bem] = createNamespace('loading');

const CircularIcon = (
  <svg class={bem('circular')} viewBox="25 25 50 50">
    <circle cx="50" cy="50" r="20" fill="none" />
  </svg>
);

export default defineComponent({
  name,

  props: {
    size: [Number, String],
    color: String,
  },

  setup(props) {
    const spinnerStyle = computed(() =>
      extend({ color: props.color }, getSizeStyle(props.size))
    );

    return () => (
      <div class={bem()}>
        <span class={bem('spinner')} style={spinnerStyle.value}>
          {CircularIcon}
        </span>
      </div>
    );
  },
});
