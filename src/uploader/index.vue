<template>
  <div :class="bem()">
    <div :class="bem('wrapper', { disabled })">
      <template v-if="previewImage">
        <UploaderPreviewItem
          v-for="item in modelValue.map(renderPreviewItem)"
          :key="item.index"
          v-bind="item"
        />
      </template>
      <div
        v-if="renderUpload"
        :class="bem('upload', { readonly })"
        @click="onClickUpload"
      >
        <c-icon name="update_full" :class="bem('upload-icon')" />
        <span :class="bem('upload-text')" v-if="uploadText">{{
          uploadText
        }}</span>
        <input
          v-if="!readonly"
          ref="inputRef"
          type="file"
          :class="bem('input')"
          :accept="accept"
          :capture="capture"
          :multiple="multiple"
          :disabled="disabled"
          @change="onChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { isPromise, extend, pick } from '../utils';
import { useExpose } from '../composables';
import { props, UploaderExpose, UploaderFileListItem } from './types';
import {
  bem,
  name,
  filterFiles,
  isOversize,
  readFileContent,
  toArray,
} from './utils';
import UploaderPreviewItem from './UploaderPreviewItem.vue';

export default defineComponent({
  name,

  components: { UploaderPreviewItem },

  props,

  emits: [
    'delete',
    'oversize',
    'click-upload',
    'close-preview',
    'click-preview',
    'update:modelValue',
  ],

  setup(props, { emit }) {
    const inputRef = ref<HTMLInputElement>();

    const getDetail = (index = props.modelValue.length) => ({
      name: props.name,
      index,
    });

    const resetInput = () => {
      if (inputRef.value) {
        inputRef.value.value = '';
      }
    };

    const onAfterRead = (
      items: UploaderFileListItem | UploaderFileListItem[]
    ) => {
      resetInput();

      if (isOversize(items, props.maxSize)) {
        if (Array.isArray(items)) {
          const result = filterFiles(items, props.maxSize);
          items = result.valid;
          emit('oversize', result.invalid, getDetail());

          if (!items.length) {
            return;
          }
        } else {
          emit('oversize', items, getDetail());
        }
      }

      items = reactive(items);
      emit('update:modelValue', [...props.modelValue, ...toArray(items)]);

      if (props.afterRead) {
        props.afterRead(items, getDetail());
      }
    };

    const readFile = (files: File | File[]) => {
      if (Array.isArray(files)) {
        const remainCount = +props.maxCount - props.modelValue.length;

        if (files.length > remainCount) {
          files = files.slice(0, remainCount);
        }

        Promise.all(
          files.map((file) => readFileContent(file, props.resultType))
        ).then((contents) => {
          const fileList = (files as File[]).map((file, index) => {
            const result: UploaderFileListItem = {
              file,
              status: '',
              message: '',
            };

            if (contents[index]) {
              result.content = contents[index] as string;
            }

            return result;
          });

          onAfterRead(fileList);
        });
      } else {
        readFileContent(files, props.resultType).then((content) => {
          const result: UploaderFileListItem = {
            file: files as File,
            status: '',
            message: '',
          };

          if (content) {
            result.content = content;
          }

          onAfterRead(result);
        });
      }
    };

    const onChange = (event: Event) => {
      const { files } = event.target as HTMLInputElement;

      if (props.disabled || !files || !files.length) {
        return;
      }

      const file =
        files.length === 1 ? files[0] : ([].slice.call(files) as File[]);

      if (props.beforeRead) {
        const response = props.beforeRead(file, getDetail());

        if (!response) {
          resetInput();
          return;
        }

        if (isPromise(response)) {
          response
            .then((data) => {
              if (data) {
                readFile(data);
              } else {
                readFile(file);
              }
            })
            .catch(resetInput);
          return;
        }
      }

      readFile(file);
    };

    const deleteFile = (item: UploaderFileListItem, index: number) => {
      const fileList = props.modelValue.slice(0);
      fileList.splice(index, 1);

      emit('update:modelValue', fileList);
      emit('delete', item, getDetail(index));
    };

    const onClickUpload = (event: MouseEvent) => emit('click-upload', event);

    const renderPreviewItem = (item: UploaderFileListItem, index: number) => {
      const needPickData = [
        'imageFit',
        'deletable',
        'previewSize',
        'beforeDelete',
      ] as const;

      const previewData = extend(
        pick(props, needPickData),
        pick(item, needPickData, true)
      );

      return {
        item,
        index,
        onClick: () => emit('click-preview', item, getDetail(index)),
        onDelete: () => deleteFile(item, index),
        name: props.name,
        ...pick(props, ['name', 'lazyLoad']),
        ...previewData,
      };
    };

    const chooseFile = () => {
      if (inputRef.value && !props.disabled) {
        inputRef.value.click();
      }
    };

    const renderUpload = computed(
      () => props.modelValue.length < props.maxCount && props.showUpload
    );

    useExpose<UploaderExpose>({
      chooseFile,
    });

    return {
      bem,
      renderUpload,
      inputRef,
      onChange,
      onClickUpload,
      renderPreviewItem,
    };
  },
});
</script>
