<template>
  <span :class="bem()" :style="style">
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
      <component :is="inputElement" v-bind="inputAttrs" />
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
import { defineComponent, nextTick, onMounted, ref, watch } from 'vue';
import { useExpose } from '../composables';
import { createNamespace, extend, isDef } from '../utils';
import { inputProps, textareaProps, InputExpose } from './shared';
import { endComposing, resizeTextarea, mapInputType } from './utils';

const [name, bem] = createNamespace('input');

export default defineComponent({
  name,

  props: extend({}, inputProps, textareaProps, {
    name: String,
    addon: String,
    prefix: String,
    suffix: String,
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

    const updateValue = (value: string | number) => {
      if (inputRef.value && inputRef.value.value !== value) {
        value = String(value);
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

    const adjustTextareaSize = () => {
      const input = inputRef.value;
      if (props.type === 'textarea' && props.autosize && input) {
        resizeTextarea(input, props.autosize);
      }
    };

    onMounted(() => {
      nextTick(adjustTextareaSize);
    });

    watch(
      () => props.modelValue,
      () => {
        nextTick(adjustTextareaSize);
      }
    );

    const inputAttrs = {
      ref: inputRef,
      name: props.name,
      class: bem('control', [props.type]),
      disabled: props.disabled,
      placeholder: props.placeholder,
      autofocus: props.autofocus,
      autocomplete: props.autocomplete,
      maxlength: props.maxlength,
      value: props.modelValue,
      rows: isDef(props.rows) ? +props.rows : undefined,
      onFocus,
      onBlur,
      onChange: endComposing,
      onInput,
    };

    if (props.type !== 'textarea') {
      extend(inputAttrs, mapInputType(props.type));
    }

    const onClickPrefix = (event: Event) => emit('click-prefix', event);
    const onClickSuffix = (event: Event) => emit('click-suffix', event);
    const onClickAddon = (event: Event) => emit('click-addon', event);

    const inputElement = props.type === 'textarea' ? 'textarea' : 'input';

    useExpose<InputExpose>({
      focus,
      blur,
    });

    return {
      bem,
      focused,
      inputAttrs,
      inputElement,
      blur,
      focus,
      onClickPrefix,
      onClickSuffix,
      onClickAddon,
    };
  },
});
</script>
