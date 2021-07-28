<template>
  <span ref="wrapperRef" :class="bem()">
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
    <div :class="bem('content')">
      <div
        v-for="(item, index) in options"
        :key="index"
        :class="bem('option', { selected: modelValue === item.value })"
        @click="onClickOption(item)"
      >
        <slot name="option" v-bind="{ item }">
          {{ item.text }}
        </slot>
      </div>
    </div>
  </c-popup>
</template>

<script lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  ref,
} from 'vue';
import {
  createNamespace,
  unknownProp,
  ComponentInstance,
  extend,
} from '../utils';
import { Instance, createPopper, offsetModifier } from '../utils/popper';
import { useClickAway } from '../composables';

const [name, bem] = createNamespace('select');

type SelectOption = {
  text: string;
  value: string | number;
};

export default {
  name,

  props: {
    modelValue: unknownProp,
    placeholder: String,
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
          extend({}, offsetModifier, {
            options: {
              offset: [0, 10],
            },
          }),
        ],
      });
    };

    const updateLocation = () => {
      nextTick(() => {
        if (!state.popupShow) {
          return;
        }

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

    const onClickOption = (option: SelectOption) => {
      emit('change', option);
      emit('update:modelValue', option.value);
      state.popupShow = false;
    };

    useClickAway(wrapperRef, onClickAway, { eventName: 'click' });

    const inputAttrs = computed(() => ({
      readonly: true,
      suffix: 'arrow_down',
      class: bem('reference'),
      placeholder: props.placeholder,
      onFocus: () => updateShow(true),
      modelValue: props.modelValue,
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
      onClickOption,
      state,
    };
  },
};
</script>
