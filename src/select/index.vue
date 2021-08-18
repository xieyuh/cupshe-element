<template>
  <span
    ref="wrapperRef"
    :class="bem({ disabled })"
    @click="onClickWrapper"
    :style="style"
  >
    <slot name="reference">
      <c-input v-bind="inputAttrs" />
    </slot>
  </span>
  <c-popup
    ref="popoverRef"
    position=""
    :overlay="false"
    :lock-scroll="false"
    :duration="0"
    transition=""
    v-model:show="state.popupShow"
  >
    <div :class="bem('content')" :style="popStyle">
      <div
        v-for="(item, index) in options"
        :key="index"
        :class="
          bem('option', {
            disabled: item.disabled,
            selected: modelValue === item.value,
          })
        "
        @click="onClickOption(item, $event)"
      >
        <slot name="option" v-bind="{ item, index }">
          {{ item.text }}
        </slot>
      </div>
    </div>
  </c-popup>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  CSSProperties,
  ref,
} from 'vue';
import {
  createNamespace,
  unknownProp,
  ComponentInstance,
  addUnit,
  extend,
  preventDefault,
} from '../utils';
import { Instance, createPopper, Placement } from '../utils/popper';
import { useClickAway, useRect } from '../composables';
import type { InputSize } from '../input/index.vue';

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

  emits: ['change', 'select', 'update:modelValue'],

  setup(props, { emit }) {
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

      state.popupShow = false;
    };

    const onClickWrapper = () => {
      if (props.disabled) {
        return;
      }
      updateShow(!state.popupShow);
    };

    useClickAway(wrapperRef, onClickAway, { eventName: 'click' });

    const inputAttrs = computed(() => {
      const match = props.options.find(
        (option) => option.value === props.modelValue
      );

      return {
        readonly: true,
        suffix: 'arrow_down',
        class: bem('control'),
        disabled: props.disabled,
        placeholder: props.placeholder,
        modelValue: match ? match.text : props.defaultText,
        size: props.size,
      };
    });

    const popStyle = computed(() =>
      extend(
        {
          width: addUnit(state.popupWidth),
        },
        props.popperStyle
      )
    );

    onMounted(updateLocation);
    onBeforeUnmount(() => {
      if (popper) {
        popper.destroy();
        popper = null;
      }
    });

    return {
      bem,
      wrapperRef,
      popoverRef,
      inputAttrs,
      popStyle,
      onClickWrapper,
      onClickOption,
      state,
    };
  },
});
</script>
