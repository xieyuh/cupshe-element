import {
  defineComponent,
  ref,
  nextTick,
  watch,
  onMounted,
  onUpdated,
  PropType,
  ExtractPropTypes,
} from 'vue';
import { createNamespace, truthProp, isHidden } from '../utils';
import {
  useScrollParent,
  useTabStatus,
  useRect,
  useExpose,
  useEventListener,
} from '../composables';
import type { ListDirection, ListExpose } from './types';

const [name, bem] = createNamespace('list');

const props = {
  error: Boolean,
  loading: Boolean,
  finished: Boolean,
  errorText: String,
  loadingText: String,
  finishedText: String,
  immediateCheck: truthProp,
  offset: {
    type: [Number, String],
    default: 300,
  },
  direction: {
    type: String as PropType<ListDirection>,
    default: 'down',
  },
};

export type ListProps = ExtractPropTypes<typeof props>;

export default defineComponent({
  name,

  props,

  emits: ['load', 'update:loading', 'update:error'],

  setup(props, { emit, slots }) {
    const loading = ref(false);
    const root = ref<HTMLDivElement>();
    const placeholder = ref<HTMLDivElement>();
    const tabStatus = useTabStatus();
    const scrollParent = useScrollParent(root);

    const check = () => {
      nextTick(() => {
        if (
          loading.value ||
          props.finished ||
          props.error ||
          tabStatus?.value === false
        ) {
          return;
        }

        const { offset, direction } = props;
        const scrollParentRect = useRect(scrollParent);

        if (!scrollParentRect.height || isHidden(root)) {
          return;
        }

        let isReachEdge = false;
        const placeholderRect = useRect(placeholder);

        if (direction === 'up') {
          isReachEdge = scrollParentRect.top - placeholderRect.top <= offset;
        } else {
          isReachEdge =
            placeholderRect.bottom - scrollParentRect.bottom <= offset;
        }

        if (isReachEdge) {
          loading.value = true;
          emit('update:loading', true);
          emit('load');
        }
      });
    };

    const renderFinishedText = () => {
      if (props.finished) {
        const text = slots.finished ? slots.finished() : props.finishedText;
        if (text) {
          return <div class={bem('finished-text')}>{text}</div>;
        }
      }
    };

    const clickErrorText = () => {
      emit('update:error', false);
      check();
    };

    const renderErrorText = () => {
      if (props.error) {
        const text = slots.error ? slots.error() : props.errorText;
        if (text) {
          return (
            <div class={bem('error-text')} onClick={clickErrorText}>
              {text}
            </div>
          );
        }
      }
    };

    const renderLoading = () => {
      if (loading.value && !props.finished) {
        return <div class={bem('loading')}>{slots.loading?.()}</div>;
      }
    };

    watch(
      [() => props.loading, () => props.finished, () => props.error],
      check
    );

    if (tabStatus) {
      watch(tabStatus, (tabActive) => {
        if (tabActive) {
          check();
        }
      });
    }

    onUpdated(() => {
      loading.value = props.loading!;
    });

    onMounted(() => {
      if (props.immediateCheck) {
        check();
      }
    });

    useExpose<ListExpose>({ check });

    useEventListener('scroll', check, { target: scrollParent });

    return () => {
      const Content = slots.default?.();
      const Placeholder = <div ref={placeholder} class={bem('placeholder')} />;

      return (
        <div ref={root} role="feed" class={bem()} aria-busy={loading.value}>
          {props.direction === 'down' ? Content : Placeholder}
          {renderLoading()}
          {renderFinishedText()}
          {renderErrorText()}
          {props.direction === 'up' ? Content : Placeholder}
        </div>
      );
    };
  },
});
