<template>
  <c-overlay
    v-if="overlay"
    :show="show"
    :class="overlayClass"
    :z-index="zIndex"
    :duration="duration"
    :custom-style="overlayStyle"
    @click="onClickOverlay"
  >
    <slot name="overlay-content" />
  </c-overlay>
  <transition
    :name="transition || transiionName"
    :appear="transitionAppear"
    @after-enter="onOpened"
    @after-leave="onClosed"
  >
    <div
      v-bind="attrs"
      v-show="show"
      ref="popupRef"
      :style="style"
      :class="
        bem({
          [position]: position,
        })
      "
      @click="onClick"
    >
      <slot />
      <c-icon
        v-if="closeable"
        role="button"
        tabindex="0"
        :name="closeIcon"
        :class="bem('close-icon', closeIconPosition)"
        @click="onClickCloseIcon"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  CSSProperties,
  onActivated,
  onDeactivated,
  onMounted,
  PropType,
  provide,
  ref,
  watch,
} from 'vue';
import { popupSharedProps } from './shared';
import { createNamespace, extend, isDef } from '../utils';
import { callInterceptor } from '../utils/interceptor';
import {
  useEventListener,
  useExpose,
  useLockScroll,
  POPUP_TOGGLE_KEY,
} from '../composables';

const [name, bem] = createNamespace('popup');

export type PopupPosition = 'top' | 'left' | 'bottom' | 'right' | 'center' | '';

export type PopupCloseIconPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

let globalZIndex = 2000;

export default {
  name,

  inheritAttrs: false,

  props: extend({}, popupSharedProps, {
    closeable: Boolean,
    transition: String,
    closeOnPopstate: Boolean,
    position: {
      type: String as PropType<PopupPosition>,
      default: 'center',
    },
    closeIcon: {
      type: String,
      default: 'close',
    },
    closeIconPosition: {
      type: String as PropType<PopupCloseIconPosition>,
      default: 'top-right',
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
    'click-close-icon',
  ],

  setup(props, { emit, attrs }) {
    let opened: boolean;
    let shouldReopen: boolean;

    const zIndex = ref<number>();
    const popupRef = ref<HTMLElement>();

    const style = computed(() => {
      const s: CSSProperties = {
        zIndex: zIndex.value,
      };

      if (isDef(props.duration)) {
        const key =
          props.position === 'center'
            ? 'animationDuration'
            : 'transitionDuration';
        s[key] = `${props.duration}s`;
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

        emit('open');
      }
    };

    const triggerClose = () => {
      opened = false;
      emit('close');
      emit('update:show', false);
    };

    const close = () => {
      if (opened) {
        callInterceptor({
          interceptor: props.beforeClose,
          done: triggerClose,
        });
      }
    };

    const onClickOverlay = (event: MouseEvent) => {
      emit('click-overlay', event);

      if (props.closeOnClickOverlay) {
        close();
      }
    };

    const onClickCloseIcon = (event: MouseEvent) => {
      emit('click-close-icon', event);
      close();
    };

    const onClick = (event: MouseEvent) => emit('click', event);
    const onOpened = () => emit('opened');
    const onClosed = () => emit('closed');

    watch(
      () => props.show,
      (value) => {
        if (value) {
          open();
        } else {
          close();
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

    const transiionName =
      props.position === 'center'
        ? 'c-fade'
        : `c-popup-slide-${props.position}`;

    return {
      bem,
      zIndex,
      transiionName,
      popupRef,
      style,
      onClickOverlay,
      onClick,
      onOpened,
      onClosed,
      onClickCloseIcon,
      attrs,
    };
  },
};
</script>
