import {
  ref,
  watch,
  computed,
  onBeforeUnmount,
  defineComponent,
  getCurrentInstance,
  PropType,
  CSSProperties,
} from 'vue';
import {
  isDef,
  addUnit,
  inBrowser,
  createNamespace,
  ComponentInstance,
} from '../utils';

const [name, bem] = createNamespace('image');

export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export default defineComponent({
  name,

  props: {
    src: String,
    alt: String,
    fit: String as PropType<ImageFit>,
    round: Boolean,
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    lazyLoad: Boolean,
  },

  emits: ['load', 'error'],

  setup(props, { emit, slots }) {
    const error = ref(false);
    const loading = ref(true);
    const imageRef = ref<HTMLElement>();

    const { $Lazyload } = getCurrentInstance()!.proxy as ComponentInstance;

    const style = computed(() => {
      const style: CSSProperties = {};

      if (isDef(props.width)) {
        style.width = addUnit(props.width);
      }

      if (isDef(props.height)) {
        style.height = addUnit(props.height);
      }

      if (isDef(props.radius)) {
        style.overflow = 'hidden';
        style.borderRadius = addUnit(props.radius);
      }

      return style;
    });

    watch(
      () => props.src,
      () => {
        error.value = false;
        loading.value = true;
      }
    );

    const onLoad = (event?: Event) => {
      loading.value = false;
      emit('load', event);
    };

    const onError = (event?: Event) => {
      error.value = true;
      loading.value = false;
      emit('error', event);
    };

    const renderImage = () => {
      if (error.value || !props.src) {
        return;
      }

      const attrs = {
        alt: props.alt,
        class: bem('img'),
        style: {
          objectFit: props.fit,
        },
      };

      if (props.lazyLoad) {
        return <img ref={imageRef} v-lazy={props.src} {...attrs} alt="" />;
      }

      return (
        <img
          src={props.src}
          onLoad={onLoad}
          onError={onError}
          {...attrs}
          alt=""
        />
      );
    };

    const onLazyLoaded = ({ el }: { el: HTMLElement }) => {
      if (el === imageRef.value && loading.value) {
        onLoad();
      }
    };

    const onLazyLoadError = ({ el }: { el: HTMLElement }) => {
      if (el === imageRef.value && !error.value) {
        onError();
      }
    };

    if ($Lazyload && inBrowser) {
      $Lazyload.$on('loaded', onLazyLoaded);
      $Lazyload.$on('error', onLazyLoadError);

      onBeforeUnmount(() => {
        $Lazyload.$off('loaded', onLazyLoaded);
        $Lazyload.$off('error', onLazyLoadError);
      });
    }

    return () => (
      <div class={bem({ round: props.round })} style={style.value}>
        {renderImage()}
        {slots.default?.()}
      </div>
    );
  },
});
