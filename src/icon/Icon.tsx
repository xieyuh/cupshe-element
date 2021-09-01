import { defineComponent } from 'vue';
import { createNamespace, addUnit } from '../utils';

const [name, bem] = createNamespace('icon');

function isImage(name?: string) {
  return name?.includes('/');
}

export default defineComponent({
  name,

  props: {
    name: {
      type: String,
      required: true,
    },
    color: String,
    size: [String, Number],
  },

  setup(props) {
    return () => {
      const { name, size, color } = props;

      const isImageIcon = isImage(name);

      return (
        <i
          class={bem([isImageIcon ? '' : name])}
          style={{ color, fontSize: addUnit(size) }}
        >
          {isImageIcon && <img class={bem('image')} src={name} />}
        </i>
      );
    };
  },
});
