import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { createNamespace } from '../utils';

const [name] = createNamespace('ab-test');

export default defineComponent({
  name,

  props: {
    token: {
      type: String,
    },
  },

  setup(props, { slots }) {
    const show = ref(false);

    const checkToken = () => {
      if (!props.token) {
        show.value = true;
        return;
      }

      if (localStorage.getItem(props.token) === props.token) {
        show.value = true;
      }

      show.value = false;
    };

    onMounted(() => {
      checkToken();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('storage', checkToken);
    });

    return () => show.value && slots.default();
  },
});
