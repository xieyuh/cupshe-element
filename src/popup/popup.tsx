import {
  computed,
  CSSProperties,
  defineComponent,
  onActivated,
  onDeactivated,
  onMounted,
  PropType,
  provide,
  ref,
  Teleport,
  Transition,
  watch,
} from 'vue';
import { Overlay } from '../overlay';
import { popupSharedProps } from './shared';
import { useEventListener } from '../composables/use-event-listener';
import { useExpose } from '../composables/use-expose';
import { useLockScroll } from '../composables/use-lock-scroll';
import { useLazyRender } from '../composables/use-lazy-render';
import { POPUP_TOGGLE_KEY } from '../composables/on-popup-reopen';
import { createNamespace, extend, isDef } from '../utils';

export type PopupPosition = 'top' | 'left' | 'bottom' | 'right' | 'center';

const [name, bem] = createNamespace('popup');

let globalZIndex = 2000;

export default defineComponent({
  name,

  inheritAttrs: false,

  props: extend({}, popupSharedProps, {
    transition: String,
    closeOnPopstate: Boolean,
    position: {
      type: String as PropType<PopupPosition>,
      default: 'right',
    },
  }),

  emits: [
    'open',
    'close',
    'click',
    'opened',
    'closed',
    'update:show',
    'click-overlay',
  ],

  setup(props, { emit, attrs, slots }) {
    let opened: boolean;
    let shouldReopen: boolean;

    const zIndex = ref<number>();
    const popupRef = ref<HTMLElement>();

    const lazyRender = useLazyRender(() => props.show);

    const style = computed(() => {
      const s: CSSProperties = {
        zIndex: zIndex.value,
      };

      if (isDef(props.duration)) {
        const key =
          props.position === 'center'
            ? 'animationDuration'
            : 'transitionDuration';
        style[key] = `${props.duration}s`;
      }

      return s;
    });

    const open = () => {
      if (!opened) {
        if (props.zIndex !== undefined) {
          globalZIndex = +props.zIndex;
        }

        opened = true;
        zIndex.value = ++globalZIndex;
      }
    };

    const close = () => {
      if (opened) {
        opened = false;
        emit('update:show', false);
      }
    };

    const onClickOverlay = (event: MouseEvent) => {
      emit('click-overlay', event);

      if (props.closeOnClickOverlay) {
        close();
      }
    };

    const renderOverlay = () => {
      if (props.overlay) {
        return (
          <Overlay
            v-slots={{ default: slots['overlay-content'] }}
            show={props.show}
            class={props.overlayClass}
            zIndex={zIndex.value}
            duration={props.duration}
            customStyle={props.overlayStyle}
            onClick={onClickOverlay}
          />
        );
      }
    };

    const onClick = (event: MouseEvent) => emit('click', event);
    const onOpened = () => emit('opened');
    const onClosed = () => emit('closed');

    const renderPopup = lazyRender(() => {
      return (
        <div
          v-show={props.show}
          ref={popupRef}
          style={style.value}
          class={bem({ [props.position]: props.position })}
          onClick={onClick}
          {...attrs}
        >
          {slots.default?.()}
        </div>
      );
    });

    const renderTransition = () => {
      const { transitionAppear, transition, position } = props;

      const name =
        position === 'center' ? 'c-fade' : `c-popup-slide-${position}`;

      return (
        <Transition
          name={transition || name}
          appear={transitionAppear}
          onAfterEnter={onOpened}
          onAfterLeave={onClosed}
        >
          {renderPopup()}
        </Transition>
      );
    };

    watch(
      () => props.show,
      (value) => {
        if (value) {
          open();
          emit('open');
        } else {
          close();
          emit('close');
        }
      }
    );

    useExpose({ popupRef });

    useLockScroll(popupRef, () => props.show && props.lockScroll);

    useEventListener('popstate', () => {
      if (props.closeOnPopstate) {
        close();
        shouldReopen = false;
      }
    });

    onMounted(() => {
      if (props.show) {
        open();
      }
    });

    onActivated(() => {
      if (shouldReopen) {
        emit('update:show', true);
        shouldReopen = false;
      }
    });

    onDeactivated(() => {
      if (props.show) {
        close();
        shouldReopen = true;
      }
    });

    provide(POPUP_TOGGLE_KEY, () => props.show);

    return () => {
      if (props.teleport) {
        return (
          <Teleport to={props.teleport}>
            {renderOverlay()}
            {renderTransition()}
          </Teleport>
        );
      }

      return (
        <>
          {renderOverlay()}
          {renderTransition()}
        </>
      );
    };
  },
});
