import {
  defineComponent,
  reactive,
  PropType,
  CSSProperties,
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from 'vue';
import {
  createNamespace,
  unknownProp,
  ComponentInstance,
  preventDefault,
  extend,
  addUnit,
} from '../utils';
import { Placement, Instance, createPopper } from '../utils/popper';
import { useRect, useClickAway } from '../composables';

import Input, { InputSize } from '../input';
import { Popup } from '../popup';
import { Icon } from '../icon';

const [name, bem] = createNamespace('select');

type SelectOption = {
  text: string;
  value: string | number;
  disabled?: boolean;
};

export default defineComponent({
  name,

  props: {
    modelValue: unknownProp,
    placeholder: String,
    disabled: Boolean,
    defaultText: String,
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom',
    },
    size: {
      type: String as PropType<InputSize>,
      default: 'normal',
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    },
    style: {
      type: Object as PropType<CSSProperties>,
    },
    popperStyle: {
      type: Object as PropType<CSSProperties>,
    },
  },

  emits: ['change', 'select', 'click', 'update:modelValue'],

  setup(props, { emit, slots }) {
    let popper: Instance | null;

    const state = reactive({
      popupShow: false,
      popupWidth: 0,
    });

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
        ],
      });

    const updateLocation = () => {
      nextTick(() => {
        if (!state.popupShow) {
          return;
        }

        state.popupWidth = useRect(wrapperRef).width;

        if (!popper) {
          popper = createPopperInstance();
        } else {
          popper.setOptions({});
        }
      });
    };

    const onClickAway = () => {
      state.popupShow = false;
      updateLocation();
    };

    const updateShow = (value: boolean) => {
      state.popupShow = value;
      updateLocation();
    };

    const onClickOption = (option: SelectOption, event: Event) => {
      if (option.disabled) {
        return preventDefault(event, true);
      }

      emit('select', option);

      if (option.value !== props.modelValue) {
        emit('change', option);
        emit('update:modelValue', option.value);
      }
    };

    const onClickWrapper = (event: MouseEvent) => {
      if (props.disabled) {
        return;
      }
      emit('click', event);
      updateShow(!state.popupShow);
    };

    onMounted(updateLocation);
    onBeforeUnmount(() => {
      if (popper) {
        popper.destroy();
        popper = null;
      }
    });

    useClickAway(wrapperRef, onClickAway, { eventName: 'click' });

    return () => {
      const {
        disabled,
        style,
        size,
        popperStyle,
        options,
        modelValue,
        placeholder,
        defaultText,
      } = props;

      const match = props.options.find(
        (option) => option.value === props.modelValue
      );

      const popStyle = extend(
        {
          width: addUnit(state.popupWidth),
        },
        popperStyle
      );

      const renderReference = () => {
        if (slots.reference) {
          return slots.reference({ match });
        }

        const inputSlot = {
          suffix: () => (
            <Icon
              name="arrow_down"
              class={bem('arrow', { active: state.popupShow })}
            />
          ),
        };

        return (
          <Input
            readonly
            disabled={disabled}
            v-slots={inputSlot}
            class={bem('control')}
            placeholder={placeholder}
            modelValue={match ? match.text : defaultText}
            size={size}
          />
        );
      };

      const renderOption = (options: SelectOption[]) =>
        options.map((item, index) => (
          <div
            key={index}
            onClick={(event) => onClickOption(item, event)}
            class={bem('option', {
              disabled: item.disabled,
              selected: modelValue === item.value,
            })}
          >
            {slots.option ? slots.option({ item, index }) : item.text}
          </div>
        ));

      return (
        <span
          ref={wrapperRef}
          class={bem({ disabled })}
          onClick={onClickWrapper}
          style={style}
        >
          {renderReference()}
          <Popup
            v-model={[state.popupShow, 'show']}
            duration={0}
            position=""
            lockScroll={false}
            ref={popoverRef}
            overlay={false}
          >
            <div class={bem('content')} style={popStyle}>
              {renderOption(options)}
            </div>
          </Popup>
        </span>
      );
    };
  },
});
