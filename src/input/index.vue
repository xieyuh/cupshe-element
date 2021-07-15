<template>
  <span :class="bem('wrapper')">
    <textarea
      :class="
        bem([
          {
            disabled: disabled,
          },
          'textarea',
        ])
      "
      v-if="type === 'textarea'"
      :value="inputValue"
      :maxlength="maxlength"
      :minlength="minlength"
      :placeholder="placeholder"
      :name="name"
      :id="id"
      @input="onInput"
      :readonly="readonly"
      :disabled="disabled"
      @change="onChange"
      @blur="onBlur"
      @keypress.enter="pressEnter"
    ></textarea>
    <input
      v-else
      :class="
        bem({
          disabled: disabled,
          readonly: readonly,
        })
      "
      :value="inputValue"
      :type="type"
      :maxlength="maxlength"
      :minlength="minlength"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :name="name"
      :id="id"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
      @keypress.enter="pressEnter"
    />
    <!-- 清除 -->
    <c-icon :name="icon" :class="bem('affix')" v-if="allowClear"></c-icon>
  </span>
</template>

<script lang="ts">
import { PropType, reactive, toRefs, watch } from 'vue';
import { createNamespace, extend } from '../utils';

const [name, bem] = createNamespace('input');

export type inputType = 'text' | 'textarea';

// export type ButtonSize = 'large' | 'normal' | 'small';

const inputProps = {
  name: String,
  placeholder: String,
  defaultValue: String,
  disabled: Boolean,
  id: String,
  readonly: Boolean,
  maxlength: Number,
  minlength: Number,
  type: {
    type: String as PropType<inputType>,
    default: 'text',
  },
  value: String,
  allowClear: Boolean,
};

const textareaProps = {
  showCount: Boolean,
};
export default {
  name,

  props: extend({}, textareaProps, inputProps),

  emits: ['pressEnter', 'change', 'blur', 'update:value'],

  setup(props, { emit }) {
    const state = reactive({
      inputValue: props.value || props.defaultValue,
    });
    watch(
      () => props.value,
      (val) => {
        state.inputValue = val;
      }
    );
    watch(
      () => state.inputValue,
      (val) => {
        emit('update:value', val);
      }
    );

    const onInput = (event) => {
      state.inputValue = event.target.value;
    };
    const pressEnter = (event) => {
      if (!props.disabled) {
        emit('pressEnter', event);
      }
    };
    const onChange = (event) => {
      if (!props.disabled) {
        emit('change', event);
      }
    };
    const onBlur = (event) => {
      emit('blur', event);
    };

    return {
      bem,
      onInput,
      onChange,
      onBlur,
      pressEnter,
      ...toRefs(state),
    };
  },
};
</script>
