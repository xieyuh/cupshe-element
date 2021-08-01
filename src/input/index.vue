<template>
  <span :class="bem([size])" :style="style">
    <span
      :class="
        bem('wrapper', {
          focused,
          disabled,
          readonly,
          ['with-addon']: !!$slots.addon,
        })
      "
    >
      <div
        :class="bem('prefix')"
        v-if="$slots.prefix || prefix"
        @click="onClickPrefix"
      >
        <slot name="prefix">
          <c-icon :name="prefix" />
        </slot>
      </div>
      <input v-bind="inputAttrs" :value="modelValue" />
      <div
        :class="bem('suffix')"
        v-if="$slots.suffix || suffix"
        @click="onClickSuffix"
      >
        <slot name="suffix">
          <c-icon :name="suffix" />
        </slot>
      </div>
    </span>
    <div :class="bem('addon')" v-if="$slots.addon" @click="onClickAddon">
      <slot name="addon" />
    </div>
  </span>
</template>

<script lang="ts">
import { PropType, ref } from 'vue';
import { createNamespace, extend } from '../utils';
import { inputProps } from './shared';
import { endComposing } from './utils';

const [name, bem] = createNamespace('input');

export type InputSize = 'normal' | 'small';

export default {
  name,

  props: extend({}, inputProps, {
    addon: String,
    prefix: String,
    suffix: String,
    size: {
      type: String as PropType<InputSize>,
      default: 'normal',
    },
  }),

  emits: [
    'update:modelValue',
    'change',
    'focus',
    'blur',
    'click-prefix',
    'click-suffix',
    'click-addon',
  ],

  setup(props, { emit }) {
    const inputRef = ref<HTMLInputElement>();
    const focused = ref(false);

    const focus = () => inputRef.value?.focus();
    const blur = () => inputRef.value?.blur();

    const onFocus = (event: Event) => {
      focused.value = true;
      emit('focus', event);
      if (props.readonly) {
        blur();
      }
    };

    const onBlur = (event: Event) => {
      focused.value = false;
      emit('blur', event);
    };

    const updateValue = (value: string) => {
      if (inputRef.value && inputRef.value.value !== value) {
        inputRef.value.value = value;
      }

      if (value !== props.modelValue) {
        emit('update:modelValue', value);
      }
    };

    const onInput = (event: Event) => {
      updateValue((event.target as HTMLInputElement).value);
      emit('change', event);
    };

    const inputAttrs = {
      ref: inputRef,
      class: bem('control'),
      disabled: props.disabled,
      placeholder: props.placeholder,
      autofocus: props.autofocus,
      autocomplete: props.autocomplete,
      maxlength: props.maxlength,
      onFocus,
      onBlur,
      onChange: endComposing,
      onInput,
    };

    const onClickPrefix = (event: Event) => emit('click-prefix', event);
    const onClickSuffix = (event: Event) => emit('click-suffix', event);
    const onClickAddon = (event: Event) => emit('click-addon', event);

    return {
      bem,
      focused,
      inputAttrs,
      blur,
      focus,
      onClickPrefix,
      onClickSuffix,
      onClickAddon,
    };
  },
};
</script>
