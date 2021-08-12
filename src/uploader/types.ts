import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue';
import type { ImageFit } from '../image/types';
import { Interceptor, truthProp } from '../utils';

export type UploaderResultType = 'dataUrl' | 'text' | 'file';

export type UploaderFileListItem = {
  url?: string;
  file?: File;
  content?: string;
  isImage?: boolean;
  status?: '' | 'uploading' | 'done' | 'failed';
  message?: string;
  imageFit?: ImageFit;
  deletable?: boolean;
  previewSize?: number | string;
  beforeDelete?: Interceptor;
};

export type UploaderMaxSize = number | string | ((file: File) => boolean);

type PromiseOrNot<T> = T | Promise<T>;

export type UploaderBeforeRead = (
  file: File | File[],
  detail: {
    name: string | number;
    index: number;
  }
) => PromiseOrNot<File | File[] | undefined>;

export type UploaderAfterRead = (
  items: UploaderFileListItem | UploaderFileListItem[],
  detail: {
    name: string | number;
    index: number;
  }
) => void;

export type UploaderExpose = {
  chooseFile: () => void;
};

export const props = {
  capture: String,
  multiple: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  lazyLoad: Boolean,
  uploadText: String,
  deletable: truthProp,
  afterRead: Function as PropType<UploaderAfterRead>,
  showUpload: truthProp,
  beforeRead: Function as PropType<UploaderBeforeRead>,
  beforeDelete: Function as PropType<Interceptor>,
  previewSize: [Number, String],
  previewImage: truthProp,
  previewFullImage: truthProp,
  name: {
    type: [Number, String],
    default: '',
  },
  accept: {
    type: String,
    default: 'image/*',
  },
  modelValue: {
    type: Array as PropType<UploaderFileListItem[]>,
    default: () => [],
  },
  maxSize: {
    type: [Number, String, Function] as PropType<UploaderMaxSize>,
    default: Number.MAX_VALUE,
  },
  maxCount: {
    type: [Number, String],
    default: Number.MAX_VALUE,
  },
  imageFit: {
    type: String as PropType<ImageFit>,
    default: 'cover',
  },
  resultType: {
    type: String as PropType<UploaderResultType>,
    default: 'dataUrl',
  },
  uploadIcon: {
    type: String,
    default: 'photograph',
  },
};

export type UploaderProps = ExtractPropTypes<typeof props>;

export type UploaderInstance = ComponentPublicInstance<
  UploaderProps,
  UploaderExpose
>;
