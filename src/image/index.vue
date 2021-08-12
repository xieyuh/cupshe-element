<template>
  <div :class="bem({ round })" :style="style">
    <template v-if="renderImage">
      <img v-if="lazyLoad" ref="imageRef" v-lazy="src" v-bind="attrs" />
      <img v-else :src="src" @load="onLoad" @error="onError" v-bind="attrs" />
    </template>
    <!-- <div v-if="renderLoading" :class="bem('loading')">
      <slot name="loading" />
    </div>
    <div v-if="renderError" :class="bem('error')">
      <slot name="error" />
    </div> -->
    <slot />
  </div>
</template>

<script lang="ts">
import {
  computed,
  CSSProperties,
  defineComponent,
  getCurrentInstance,
  PropType,
  ref,
  watch,
  onBeforeUnmount,
} from 'vue';
import {
  addUnit,
  ComponentInstance,
  createNamespace,
  isDef,
  truthProp,
  inBrowser,
} from '../utils';
import { ImageFit } from './types';

const [name, bem] = createNamespace('image');

export default defineComponent({
  name,

  props: {
    src: String,
    alt: String,
    fit: String as PropType<ImageFit>,
    round: Boolean,
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    lazyLoad: Boolean,
    iconSize: [Number, String],
    showError: truthProp,
    showLoading: truthProp,
  },

  emits: ['load', 'error'],

  setup(props, { emit }) {
    const error = ref(false);
    const loading = ref(true);
    const imageRef = ref<HTMLElement>();

    const { $Lazyload } = getCurrentInstance()!.proxy as ComponentInstance;

    const style = computed(() => {
      const s: CSSProperties = {};

      if (isDef(props.width)) {
        s.width = addUnit(props.width);
      }

      if (isDef(props.height)) {
        s.height = addUnit(props.height);
      }

      if (isDef(props.radius)) {
        s.overflow = 'hidden';
        s.borderRadius = addUnit(props.radius);
      }

      return s;
    });

    watch(
      () => props.src,
      () => {
        error.value = false;
        loading.value = true;
      }
    );

    const onLoad = (event?: Event) => {
      loading.value = false;
      emit('load', event);
    };

    const onError = (event?: Event) => {
      error.value = true;
      loading.value = false;
      emit('error', event);
    };

    const onLazyLoaded = ({ el }: { el: HTMLElement }) => {
      if (el === imageRef.value && loading.value) {
        onLoad();
      }
    };

    const onLazyLoadError = ({ el }: { el: HTMLElement }) => {
      if (el === imageRef.value && !error.value) {
        onError();
      }
    };

    if ($Lazyload && inBrowser) {
      $Lazyload.$on('loaded', onLazyLoaded);
      $Lazyload.$on('error', onLazyLoadError);

      onBeforeUnmount(() => {
        $Lazyload.$off('loaded', onLazyLoaded);
        $Lazyload.$off('error', onLazyLoadError);
      });
    }

    const renderImage = !(error.value || !props.src);
    const renderLoading = loading.value && props.showLoading;
    const renderError = error.value && props.showError;

    const attrs = {
      alt: props.alt,
      class: bem('img'),
      style: {
        objectFit: props.fit,
      },
    };

    return {
      bem,
      style,
      renderImage,
      renderLoading,
      renderError,
      imageRef,
      attrs,
      onLoad,
      onError,
    };
  },
});
</script>
