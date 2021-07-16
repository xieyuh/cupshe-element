<template>
  <div
    :class="
      bem({
        [type]: type,
      })
    "
  >
    <div :class="bem('search')" @click="toggle">
      <div :class="bem('selector')">
        <span :class="[bem('item'), showPlaceholder ? bem('placeholder') : '']">
          {{ showPlaceholder ? placeholder : selectLabel }}
        </span>
      </div>
      <!-- icon图标 -->
      <span
        :class="[
          bem('arrow'),
          {
            'is-rotate': showPopup,
          },
        ]"
      >
        <slot name="icon">
          <c-icon :name="suffixIcon"></c-icon>
        </slot>
      </span>
    </div>
    <!-- 下拉框内容 -->
    <ul
      :class="[
        bem('content'),
        {
          'is-open': showPopup,
        },
      ]"
      v-show="showPopup"
    >
      <li
        v-for="item in options"
        :key="item.value"
        :class="{
          active: item.value === defaultValue,
        }"
        @click="onClick(item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, PropType, reactive, toRefs, watch } from 'vue';
import { createNamespace } from '../utils';

const [name, bem] = createNamespace('select');
// 下拉选择风格
export type type = 'default ' | 'zebra';

const props = {
  value: [String, Number],
  placeholder: String,
  options: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String as PropType<type>,
    default: 'default',
  },
  suffixIcon: {
    type: String,
    default: 'arrow_down',
  },
  defaultOpen: Boolean,
  open: Boolean,
};
export default {
  name,

  props,

  emits: ['change', 'update:value'],

  setup(props, { emit }) {
    const state = reactive({
      defaultValue: props.value || '',
      showPopup: props.defaultOpen || false,
    });

    watch(
      () => props.value,
      (val) => {
        state.defaultValue = val;
      }
    );
    // 是否显示placeholder
    const showPlaceholder = computed(() => {
      return props.placeholder && !props.value;
    });
    // 计算显示选中的label
    const selectLabel = computed(() => {
      const selectItem = props.options.find((item) => {
        return item.value === state.defaultValue;
      });
      return selectItem ? selectItem.label : '';
    });
    // 下拉切换
    const toggle = () => {
      state.showPopup = !state.showPopup;
    };

    const onClick = (item) => {
      state.showPopup = props.open || false;
      emit('update:value', item.value);
      emit('change', item);
    };
    // 区域以外的点击关闭select
    onMounted(() => {
      window.addEventListener('click', (e: any) => {
        const {
          target: { className },
        } = e;
        if (className.indexOf('c-select') === -1) {
          state.showPopup = false;
        }
      });
    });
    return {
      bem,
      onClick,
      toggle,
      selectLabel,
      showPlaceholder,
      ...toRefs(state),
    };
  },
};
</script>
