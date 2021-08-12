<template>
  <div :class="bem('preview')">
    <c-image
      v-if="isImage"
      :fit="imageFit"
      :src="item.content || item.url"
      :class="bem('preview-image')"
      :width="previewSize"
      :height="previewSize"
      :lazy-load="lazyLoad"
    />
    <div v-else :class="bem('file')" :style="fileSize">
      <c-icon name="ticket" :class="bem('file-icon')" />
      <div :class="[bem('file-name'), 'c-ellipsis']">
        {{ item.file ? item.file.name : item.url }}
      </div>
    </div>
    <div
      v-if="renderDeleteIcon"
      :class="bem('preview-delete')"
      @click="onDelete"
    >
      <c-icon name="close" :class="bem('preview-delete-icon')" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ImageFit } from '../image/types';
import { Interceptor, callInterceptor, getSizeStyle } from '../utils';
import { UploaderFileListItem } from './types';
import { bem, isImageFile } from './utils';

export default defineComponent({
  props: {
    name: [String, Number],
    index: Number,
    imageFit: String as PropType<ImageFit>,
    lazyLoad: Boolean,
    deletable: Boolean,
    previewSize: [Number, String],
    beforeDelete: Function as PropType<Interceptor>,
    item: {
      type: Object as PropType<UploaderFileListItem>,
      required: true,
    },
  },

  emits: ['delete', 'preview'],

  setup(props, { emit }) {
    const onDelete = (event: MouseEvent) => {
      event.stopPropagation();
      callInterceptor({
        interceptor: props.beforeDelete,
        args: [props.item, { name: props.name, index: props.index }],
        done: () => emit('delete'),
      });
    };

    const isImage = isImageFile(props.item);

    const fileSize = getSizeStyle(props.previewSize);

    const renderDeleteIcon =
      props.deletable &&
      (props.item as UploaderFileListItem).status !== 'uploading';

    return {
      bem,
      onDelete,
      isImage,
      fileSize,
      renderDeleteIcon,
    };
  },
});
</script>
