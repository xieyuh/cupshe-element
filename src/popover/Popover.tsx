import {
  ref,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  PropType,
  CSSProperties,
  TeleportProps,
} from 'vue';
import { Instance, createPopper, offsetModifier } from '../utils/popper';
import {
  pick,
  extend,
  truthProp,
  unknownProp,
  createNamespace,
  ComponentInstance,
  stopPropagation,
  BORDER_BOTTOM,
} from '../utils';
import { useClickAway } from '../composables';
import { Icon } from '../icon';
import { Popup } from '../popup';

const [name, bem] = createNamespace('popover');

const popupProps = [
  'show',
  'overlay',
  'duration',
  'teleport',
  'overlayStyle',
  'overlayClass',
  'closeOnClickOverlay',
] as const;

export type PopoverTrigger = 'manual' | 'click' | 'hover';
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

export default defineComponent({
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
    mouseDelay: {
      type: Number,
      default: 100,
    },
    offset: {
      type: (Array as unknown) as PropType<[number, number]>,
      default: () => [0, 8],
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

  emits: ['select', 'update:show'],

  setup(props, { emit, slots, attrs }) {
    let popper: Instance | null;
    let timer: NodeJS.Timeout | undefined;
    const wrapperRef = ref<HTMLElement>();
    const popoverRef = ref<ComponentInstance>();

    const createPopperInstance = () =>
      createPopper(wrapperRef.value!, popoverRef.value!.popupRef.value, {
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

    const clearDelayTimer = () => {
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
    };

    const delayUpdateShow = (show: boolean, delay: number) => {
      if (!delay) {
        updateShow(show);
        return;
      }

      clearDelayTimer();
      timer = setTimeout(() => {
        updateShow(show);
        clearDelayTimer();
      }, delay);
    };

    const onClickWrapper = () => {
      if (props.trigger === 'click') {
        updateShow(!props.show);
      }
    };

    const createHoverHandler = (type: 'mouseover' | 'mouseleave') => () => {
      if (props.trigger === 'hover') {
        delayUpdateShow(type === 'mouseover', props.mouseDelay);
      }
    };

    const onClickAction = (
      action: PopoverAction,
      index: number,
      event: MouseEvent
    ) => {
      stopPropagation(event);

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

    const renderAction = (action: PopoverAction, index: number) => {
      const { icon, text, color, disabled, className } = action;
      return (
        <div
          role="menuitem"
          class={[bem('action', { disabled, 'with-icon': icon }), className]}
          style={{ color }}
          onClick={(e) => onClickAction(action, index, e)}
        >
          {icon && <Icon name={icon} class={bem('action-icon')} />}
          <div class={[bem('action-text'), BORDER_BOTTOM]}>{text}</div>
        </div>
      );
    };

    onMounted(updateLocation);
    onBeforeUnmount(() => {
      if (popper) {
        popper.destroy();
        popper = null;
      }
    });

    watch(() => [props.show, props.placement], updateLocation);

    useClickAway(wrapperRef, onClickAway, { eventName: 'click' });

    return () => (
      <>
        <span
          ref={wrapperRef}
          class={bem('wrapper')}
          onClick={onClickWrapper}
          onMouseover={createHoverHandler('mouseover')}
          onMouseleave={createHoverHandler('mouseleave')}
        >
          {slots.reference?.()}
        </span>
        <Popup
          ref={popoverRef}
          class={bem()}
          position={''}
          transition="c-popover-zoom"
          lockScroll={false}
          {...attrs}
          {...pick(props, popupProps)}
          {...{ 'onUpdate:show': updateShow }}
        >
          <div class={bem('arrow')} />
          <div
            role="menu"
            class={bem('content')}
            onMouseover={createHoverHandler('mouseover')}
            onMouseleave={createHoverHandler('mouseleave')}
            onClick={stopPropagation}
          >
            {slots.default ? slots.default() : props.actions.map(renderAction)}
          </div>
        </Popup>
      </>
    );
  },
});
