<template>
  <div :class="bem({ border: index && border })" :style="style">
    <div
      role="button"
      :class="[
        bem('title', [
          size,
          theme,
          { disabled, expanded, borderless: !border },
        ]),
        titleClass,
      ]"
      :aria-expanded="String(expanded)"
      @click="onClickTitle"
    >
      <div :class="bem('title-content')">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <slot name="icon" v-bind="{ expanded }">
        <c-icon :class="bem('right-icon')" :name="rightIcon" />
      </slot>
    </div>
    <div
      v-show="show"
      ref="wrapperRef"
      :class="bem('wrapper', [theme])"
      @transitionend="onTransitionEnd"
    >
      <div :class="bem('content')" ref="contentRef">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  CSSProperties,
  nextTick,
  ref,
  watch,
} from 'vue';
import { addUnit, createNamespace, unknownProp } from '../utils';
import { useParent, raf, doubleRaf, useExpose } from '../composables';
import { COLLAPSE_KEY } from '../collapse/index.vue';

const [name, bem] = createNamespace('collapse-item');

export default defineComponent({
  name,

  props: {
    name: [String, Number],
    title: [String, Number],
    titleClass: unknownProp,
    icon: String,
    disabled: Boolean,
  },

  setup(props) {
    const wrapperRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();
    const { parent, index } = useParent(COLLAPSE_KEY);

    const name = computed(() => props.name ?? index.value);
    const expanded = computed<boolean>(() => parent!.isExpanded(name.value));
    const { size, theme, border, gutter } = parent!.props;

    const show = ref(expanded.value);

    const style = computed<CSSProperties>(() => {
      if (index.value === 0) {
        return {};
      }

      return {
        marginTop: addUnit(gutter),
      };
    });

    const onTransitionEnd = () => {
      if (!expanded.value) {
        show.value = false;
      } else {
        wrapperRef.value!.style.height = '';
      }
    };

    watch(expanded, (value, oldValue) => {
      if (oldValue === null) {
        return;
      }

      if (value) {
        show.value = true;
      }

      const tick = value ? nextTick : raf;

      tick(() => {
        if (!contentRef.value || !wrapperRef.value) {
          return;
        }

        const { offsetHeight } = contentRef.value;

        if (offsetHeight) {
          const contentHeight = `${offsetHeight}px`;
          wrapperRef.value.style.height = value ? '0' : contentHeight;

          doubleRaf(() => {
            wrapperRef.value!.style.height = value ? contentHeight : '0';
          });
        } else {
          onTransitionEnd();
        }
      });
    });

    const toggle = (newValue = !expanded.value) => {
      parent!.toggle(name.value, newValue);
    };

    const onClickTitle = () => {
      if (!props.disabled) {
        toggle();
      }
    };

    const rightIcon = computed(() => {
      if (props.icon) {
        return props.icon;
      }

      return 'arrow_down';
    });

    useExpose({ toggle });

    return {
      bem,
      wrapperRef,
      contentRef,
      show,
      onClickTitle,
      onTransitionEnd,
      expanded,
      rightIcon,
      size,
      theme,
      border,
      index,
      style,
    };
  },
});
</script>
