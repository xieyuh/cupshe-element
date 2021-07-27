<template>
  <span ref="wrapperRef" :class="bem('wrapper')" @click="onClickWrapper">
    <slot name="reference" />
  </span>
  <c-popup
    ref="popoverRef"
    :class="bem([theme])"
    :lock-scroll="false"
    position=""
    transition="c-popover-zoom"
    @touchstart="onTouchstart"
    v-bind="attrs"
    :show="show"
    @update:show="updateShow"
  >
    <div :class="bem('arrow')" />
    <div role="menu" :class="bem('content')">
      <slot>
        <div
          role="menuitem"
          :class="[
            bem('action', {
              disabled: item.disabled,
              'with-icon': item.icon,
            }),
            item.className,
          ]"
          :style="{ color: item.color }"
          v-for="(item, index) in actions"
          :key="index"
          @click="onClickAction(item, index)"
        >
          <c-icon
            v-if="item.icon"
            :name="item.icon"
            :class="bem('action-icon')"
          />
          <div :class="[bem('action-text'), BORDER_BOTTOM]">
            {{ item.text }}
          </div>
        </div>
      </slot>
    </div>
  </c-popup>
</template>

<script lang="ts">
import {
  nextTick,
  onMounted,
  onBeforeUnmount,
  PropType,
  TeleportProps,
  CSSProperties,
  ref,
  watch,
} from 'vue';
import { Instance, createPopper, offsetModifier } from '../utils/popper';
import {
  createNamespace,
  truthProp,
  unknownProp,
  ComponentInstance,
  extend,
  pick,
} from '../utils';
import { useClickAway } from '../composables';
import { BORDER_BOTTOM } from '../utils/constant';

const [name, bem] = createNamespace('popover');

const popupProps = [
  'overlay',
  'duration',
  'teleport',
  'overlayStyle',
  'overlayClass',
  'closeOnClickOverlay',
] as const;

export type PopoverTheme = 'light' | 'dark';
export type PopoverTrigger = 'manual' | 'click';
export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';

export type PopoverAction = {
  text: string;
  icon?: string;
  color?: string;
  disabled?: boolean;
  className?: string;
};

export default {
  name,

  props: {
    show: Boolean,
    overlay: Boolean,
    duration: [Number, String],
    overlayClass: unknownProp,
    overlayStyle: Object as PropType<CSSProperties>,
    closeOnClickAction: truthProp,
    closeOnClickOverlay: truthProp,
    closeOnClickOutside: truthProp,
    offset: {
      type: (Array as unknown) as PropType<[number, number]>,
      default: () => [0, 8],
    },
    theme: {
      type: String as PropType<PopoverTheme>,
      default: 'light',
    },
    trigger: {
      type: String as PropType<PopoverTrigger>,
      default: 'click',
    },
    actions: {
      type: Array as PropType<PopoverAction[]>,
      default: () => [],
    },
    placement: {
      type: String as PropType<PopoverPlacement>,
      default: 'bottom',
    },
    teleport: {
      type: [String, Object] as PropType<TeleportProps['to']>,
      default: 'body',
    },
  },

  emits: ['select', 'touchstart', 'update:show'],

  setup(props, { emit, attrs }) {
    let popper: Instance | null;

    const wrapperRef = ref<HTMLElement>();
    const popoverRef = ref<ComponentInstance>();

    const createPopperInstance = () => {
      return createPopper(wrapperRef.value!, popoverRef.value!.popupRef, {
        placement: props.placement,
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              adaptive: false,
              gpuAcceleration: false,
            },
          },
          extend({}, offsetModifier, {
            options: {
              offset: props.offset,
            },
          }),
        ],
      });
    };

    const updateLocation = () => {
      nextTick(() => {
        if (!props.show) {
          return;
        }

        if (!popper) {
          popper = createPopperInstance();
        } else {
          popper.setOptions({
            placement: props.placement,
          });
        }
      });
    };

    const updateShow = (value: boolean) => emit('update:show', value);

    const onClickWrapper = () => {
      if (props.trigger === 'click') {
        updateShow(!props.show);
      }
    };

    const onTouchstart = (event: TouchEvent) => {
      event.stopPropagation();
      emit('touchstart', event);
    };

    const onClickAction = (action: PopoverAction, index: number) => {
      if (action.disabled) {
        return;
      }

      emit('select', action, index);

      if (props.closeOnClickAction) {
        updateShow(false);
      }
    };

    const onClickAway = () => {
      if (
        props.closeOnClickOutside &&
        (!props.overlay || props.closeOnClickOverlay)
      ) {
        updateShow(false);
      }
    };

    onMounted(updateLocation);
    onBeforeUnmount(() => {
      if (popper) {
        popper.destroy();
        popper = null;
      }
    });

    watch(() => [props.show, props.placement], updateLocation);

    useClickAway(wrapperRef, onClickAway, { eventName: 'touchstart' });

    return {
      bem,
      wrapperRef,
      popoverRef,
      onClickWrapper,
      onTouchstart,
      updateShow,
      attrs: { ...attrs, ...pick(props, popupProps) },
      onClickAction,
      BORDER_BOTTOM,
    };
  },
};
</script>
