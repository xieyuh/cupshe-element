<template>
  <span
    ref="wrapperRef"
    :class="bem({ disabled })"
    :style="style"
    @click="onClickWrapper"
  >
    <c-input v-bind="inputAttrs" />
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
    <div :class="bem('content')" :style="contentStyle">
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
  preventDefault,
} from '../utils';
import { Instance, createPopper } from '../utils/popper';
import { useClickAway, useRect } from '../composables';
import { InputSize } from '../input/index.vue';

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
    size: {
      type: String as PropType<InputSize>,
      default: 'normal',
    },
    style: {
      type: Object as PropType<CSSProperties>,
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    },
  },

  emits: ['change', 'update:modelValue'],

  setup(props, { emit }) {
    let popper: Instance | null;

    const state = reactive({
      popupShow: false,
      popupWidth: 0,
    });

    const wrapperRef = ref<HTMLElement>();
    const popoverRef = ref<ComponentInstance>();

    const createPopperInstance = () => {
      return createPopper(wrapperRef.value!, popoverRef.value!.popupRef.value, {
        placement: 'bottom',
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
    };

    const updateLocation = () => {
      nextTick(() => {
        if (!state.popupShow) {
          return;
        }

        state.popupWidth = useRect(wrapperRef).width;

        if (!popper) {
          popper = createPopperInstance();
        } else {
          popper.setOptions({ placement: 'bottom' });
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

      emit('change', option);
      emit('update:modelValue', option.value);
      state.popupShow = false;
    };

    const onClickWrapper = () => {
      if (props.disabled) {
        return;
      }
      updateShow(true);
    };

    useClickAway(wrapperRef, onClickAway, { eventName: 'click' });

    const inputAttrs = computed(() => ({
      readonly: true,
      suffix: 'arrow_down',
      class: bem('control'),
      disabled: props.disabled,
      placeholder: props.placeholder,
      modelValue: props.modelValue,
      size: props.size,
    }));

    const contentStyle = computed(() => ({
      width: addUnit(state.popupWidth),
    }));

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
      contentStyle,
      onClickWrapper,
      onClickOption,
      state,
    };
  },
});
</script>
