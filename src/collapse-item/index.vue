<template>
  <div :class="[bem({ border: index && border })]">
    <c-cell
      :class="
        bem('title', {
          disabled,
          expanded,
          borderless: !border,
        })
      "
      :aria-expanded="String(expanded)"
      role="button"
      @click="onClickTitle"
      v-bind="attrs"
    >
      <template v-if="$slots.title" #title>
        <slot name="title" />
      </template>
      <template v-if="$slots.value" #value>
        <slot name="value" />
      </template>
      <template v-if="$slots.label" #label>
        <slot name="label" />
      </template>
      <template v-if="$slots['right-icon']" #right-icon>
        <slot name="right-icon" />
      </template>
    </c-cell>
    <LazyRender :show="show">
      <div
        v-show="show"
        ref="wrapperRef"
        :class="bem('wrapper')"
        @transitionEnd="onTransitionEnd"
      >
        <div ref="contentRef" :class="[bem('content'), contentClass]">
          <slot />
        </div>
      </div>
    </LazyRender>
  </div>
</template>

<script lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { COLLAPSE_KEY } from '../collapse/index.vue';
import { cellProps } from '../cell/index.vue';
import { useParent } from '../composables/use-parent';
import LazyRender from '../composables/lazy-render.vue';
import { createNamespace, extend, pick, truthProp } from '../utils';
import { raf, doubleRaf } from '../composables/utils';
import { useExpose } from '../composables/use-expose';

const [name, bem] = createNamespace('collapse-item');

export default {
  name,

  props: extend({}, cellProps, {
    name: [String, Number],
    isLink: truthProp,
    disabled: Boolean,
    readonly: Boolean,
    contentClass: String,
  }),

  setup(props) {
    const wrapperRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();
    const { parent, index } = useParent(COLLAPSE_KEY);

    if (!parent) {
      return;
    }

    const name = computed(() => props.name ?? index.value);
    const expanded = computed(() => parent.isExpanded(name.value));
    const show = ref(expanded.value);

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

          // use double raf to ensure animation can start
          doubleRaf(() => {
            wrapperRef.value!.style.height = value ? contentHeight : '0';
          });
        } else {
          onTransitionEnd();
        }
      });
    });

    const toggle = (newValue = !expanded.value) => {
      parent.toggle(name.value, newValue);
    };

    const onClickTitle = () => {
      if (!props.disabled && !props.readonly) {
        toggle();
      }
    };

    useExpose({ toggle });

    const attrs = pick(
      props,
      Object.keys(cellProps) as Array<keyof typeof cellProps>
    );

    if (props.readonly) {
      attrs.isLink = false;
    }

    if (props.disabled || props.readonly) {
      attrs.clickable = false;
    }

    return {
      bem,
      show,
      attrs,
      index,
      expanded,
      onClickTitle,
      contentRef,
      wrapperRef,
      onTransitionEnd,
    };
  },
  components: { LazyRender },
};
</script>
