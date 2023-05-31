import {
  PropType,
  CSSProperties,
  defineComponent,
  ExtractPropTypes,
  ref,
  reactive,
  onMounted,
  watch,
  nextTick,
} from 'vue';
import {
  createNamespace,
  truthProp,
  makeArrayProp,
  makeNumericProp,
  unknownProp,
  makeStringProp,
  Interceptor,
  callInterceptor,
  windowWidth,
  windowHeight,
  pick,
} from '../utils';
import { useRect, useExpose } from '../composables';
import { Icon } from '../icon';
import { Swipe, SwipeInstance, SwipeToOptions } from '../swipe';
import { Popup, PopupCloseIconPosition } from '../popup';
import ImagePreviewItem from './ImagePreviewItem';

import { ImagePreviewScaleEventParams } from './types';

const [name, bem] = createNamespace('image-preview');

const popupProps = [
  'show',
  'transition',
  'overlayStyle',
  'closeOnPopstate',
] as const;

const imagePreviewProps = {
  show: Boolean,
  loop: truthProp,
  images: makeArrayProp<string>(),
  minZoom: makeNumericProp(1 / 3),
  maxZoom: makeNumericProp(3),
  overlay: truthProp,
  closeable: Boolean,
  showIndex: truthProp,
  className: unknownProp,
  closeIcon: makeStringProp('clear'),
  transition: String,
  beforeClose: Function as PropType<Interceptor>,
  overlayClass: unknownProp,
  overlayStyle: Object as PropType<CSSProperties>,
  swipeDuration: makeNumericProp(300),
  startPosition: makeNumericProp(0),
  showIndicators: Boolean,
  closeOnPopstate: truthProp,
  closeIconPosition: makeStringProp<PopupCloseIconPosition>('top-right'),
};

export type ImagePreviewProps = ExtractPropTypes<typeof imagePreviewProps>;

export default defineComponent({
  name,

  props: imagePreviewProps,

  emits: ['scale', 'close', 'closed', 'change', 'update:show'],

  setup(props, { emit, slots }) {
    const swipeRef = ref<SwipeInstance>();

    const state = reactive({
      active: 0,
      rootWidth: 0,
      rootHeight: 0,
    });

    const resize = () => {
      if (swipeRef.value) {
        const rect = useRect(swipeRef.value.$el);
        state.rootWidth = rect.width;
        state.rootHeight = rect.height;
        swipeRef.value.resize();
      }
    };

    const emitScale = (args: ImagePreviewScaleEventParams) =>
      emit('scale', args);

    const updateShow = (show: boolean) => emit('update:show', show);

    const emitClose = () => {
      callInterceptor(props.beforeClose, {
        args: [state.active],
        done: () => updateShow(false),
      });
    };

    const setActive = (active: number) => {
      if (active !== state.active) {
        state.active = active;
        emit('change', active);
      }
    };

    const renderIndex = () => {
      if (props.showIndex) {
        return (
          <div class={bem('index')}>
            {state.active + 1} / {props.images.length}
          </div>
        );
      }
    };

    const renderCover = () => {
      if (slots.cover) {
        return <div class={bem('cover')}>{slots.cover()}</div>;
      }
    };

    const renderImages = () => (
      <Swipe
        ref={swipeRef}
        lazyRender
        loop={props.loop}
        class={bem('swipe')}
        duration={props.swipeDuration}
        initialSwipe={props.startPosition}
        showIndicators={props.showIndicators}
        indicatorColor="white"
        onChange={setActive}
      >
        {props.images.map((image) => (
          <ImagePreviewItem
            src={image}
            show={props.show}
            active={state.active}
            maxZoom={props.maxZoom}
            minZoom={props.minZoom}
            rootWidth={state.rootWidth}
            rootHeight={state.rootHeight}
            onScale={emitScale}
            onClose={emitClose}
          />
        ))}
      </Swipe>
    );

    const renderClose = () => {
      if (props.closeable) {
        return (
          <Icon
            name="close"
            onClick={emitClose}
            class={bem('close-icon', props.closeIconPosition)}
          />
        );
      }
    };

    const onClosed = () => emit('closed');

    const swipeTo = (index: number, options?: SwipeToOptions) =>
      swipeRef.value?.swipeTo(index, options);

    useExpose({ swipeTo });

    onMounted(resize);

    watch([windowWidth, windowHeight], resize);

    watch(
      () => props.startPosition,
      (value) => setActive(+value)
    );
    watch(
      () => props,
      (value) => {
        if (value.startPosition !== state.active) {
          setActive(+value.startPosition);
        }
      },
      { deep: true }
    );

    watch(
      () => props.show,
      (value) => {
        const { images, startPosition } = props;
        if (value) {
          setActive(+startPosition);
          nextTick(() => {
            resize();
            swipeTo(+startPosition, { immediate: true });
          });
        } else {
          emit('close', {
            index: state.active,
            url: images[state.active],
          });
          setActive(0);
        }
      }
    );

    return () => (
      <Popup
        class={[bem(), props.className]}
        overlayClass={[bem('overlay'), props.overlayClass]}
        onClosed={onClosed}
        {...{ 'onUpdate:show': updateShow }}
        {...pick(props, popupProps)}
      >
        {renderClose()}
        {renderImages()}
        {renderIndex()}
        {renderCover()}
      </Popup>
    );
  },
});
