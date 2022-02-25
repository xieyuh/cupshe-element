import { defineComponent, PropType } from 'vue';
import { bem, isImageFile } from './utils';
import {
  extend,
  Interceptor,
  getSizeStyle,
  callInterceptor,
  isDef,
} from '../utils';

import { Icon } from '../icon';
import { Image, ImageFit } from '../image';

import type { UploaderFileListItem } from './types';

export default defineComponent({
  props: {
    name: [Number, String],
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

  setup(props, { emit, slots }) {
    const renderMask = () => {
      const { status, message } = props.item as UploaderFileListItem;

      if (status === 'uploading' || status === 'failed') {
        const showMessage = isDef(message) && message !== '';

        return (
          <div class={bem('mask', [status])}>
            {showMessage && (
              <div class={bem('mask-message', [status])}>{message}</div>
            )}
          </div>
        );
      }
    };

    const onDelete = (event: MouseEvent) => {
      event.stopPropagation();
      callInterceptor(props.beforeDelete, {
        args: [props.item, { name: props.name, index: props.index }],
        done: () => emit('delete'),
      });
    };

    const onPreview = () => emit('preview');

    const renderDeleteIcon = () => {
      if (
        props.deletable &&
        (props.item as UploaderFileListItem).status !== 'uploading'
      ) {
        return (
          <div class={bem('preview-delete')} onClick={onDelete}>
            <Icon name="close" class={bem('preview-delete-icon')} />
          </div>
        );
      }
    };

    const renderCover = () => {
      if (slots['preview-cover']) {
        const { index, item } = props;
        return (
          <div class={bem('preview-cover')}>
            {slots['preview-cover'](extend({ index }, item))}
          </div>
        );
      }
    };

    const renderPreview = () => {
      const item = props.item as UploaderFileListItem;

      if (isImageFile(item)) {
        return (
          <Image
            fit={props.imageFit}
            src={item.content || item.url}
            class={bem('preview-image')}
            width={props.previewSize}
            height={props.previewSize}
            lazyLoad={props.lazyLoad}
            onClick={onPreview}
          >
            {renderCover()}
          </Image>
        );
      }

      return (
        <div class={bem('file')} style={getSizeStyle(props.previewSize)}>
          <Icon class={bem('file-icon')} name="description" />
          <div class={[bem('file-name'), 'c-ellipsis']}>
            {item.file ? item.file.name : item.url}
          </div>
          {renderCover()}
        </div>
      );
    };

    return () => (
      <div class={bem('preview')}>
        {renderPreview()}
        {renderMask()}
        {renderDeleteIcon()}
      </div>
    );
  },
});
