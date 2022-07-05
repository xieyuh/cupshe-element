import {
  computed,
  defineComponent,
  CSSProperties,
  ExtractPropTypes,
} from 'vue';
import { createNamespace, makeNumericProp, numericProp } from '../utils';
import { useParent } from '../composables';
import { ROW_KEY } from '../row/Row';

const [name, bem] = createNamespace('col');

const colProps = {
  span: makeNumericProp(0),
  offset: numericProp,
};

export type ColProps = ExtractPropTypes<typeof colProps>;

export default defineComponent({
  name,

  props: colProps,

  setup(props, { slots }) {
    const { parent, index } = useParent(ROW_KEY);

    const style = computed(() => {
      if (!parent) {
        return {} as CSSProperties;
      }

      const { spaces } = parent;

      if (spaces && spaces.value && spaces.value[index.value]) {
        const { left, right } = spaces.value[index.value];
        return {
          paddingLeft: left ? `${left}px` : '',
          paddingRight: right ? `${right}px` : '',
        } as CSSProperties;
      }
    });

    return () => {
      const { span, offset } = props;

      return (
        <div
          style={style.value}
          class={bem({ [span]: span, [`offset-${offset}`]: offset })}
        >
          {slots.default?.()}
        </div>
      );
    };
  },
});
