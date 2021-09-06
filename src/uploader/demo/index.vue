<template>
  <demo-block title="基础用法">
    <c-uploader :after-read="afterRead" />
  </demo-block>

  <demo-block title="上传状态">
    <c-uploader v-model="statusFileList" :after-read="afterReadFailed" />
  </demo-block>

  <demo-block title="限制上传数量">
    <c-uploader v-model="fileList2" multiple :max-count="2" />
  </demo-block>

  <demo-block title="限制上传大小">
    <c-uploader
      v-model="fileList4"
      multiple
      :max-size="500 * 1024"
      @oversize="onOversize"
    />
  </demo-block>

  <demo-block title="自定义上传样式">
    <c-uploader>
      <c-button type="primary" icon="plus">上传文件</c-button>
    </c-uploader>
  </demo-block>

  <demo-block title="上传前置处理">
    <c-uploader v-model="fileList3" :before-read="beforeRead" />
  </demo-block>

  <demo-block title="禁用状态">
    <c-uploader :after-read="afterRead" disabled />
  </demo-block>
</template>

<script lang="ts">
import { ref } from 'vue';
import { UploaderFileListItem } from '../types';

export default {
  setup() {
    const fileList = ref([
      { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
      { url: 'https://img.yzcdn.cn/vant/tree.jpg' },
    ]);

    const fileList2 = ref([{ url: 'https://img.yzcdn.cn/vant/sand.jpg' }]);

    const fileList3 = ref([]);

    const fileList4 = ref([{ url: 'https://img.yzcdn.cn/vant/sand.jpg' }]);

    const fileList5 = ref([
      { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
      {
        url: 'https://img.yzcdn.cn/vant/sand.jpg',
        deletable: true,
        beforeDelete: () => {},
      },
      {
        url: 'https://img.yzcdn.cn/vant/tree.jpg',
        deletable: true,
        imageFit: 'contain',
        previewSize: 120,
      },
    ]);

    const statusFileList = [
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        status: 'uploading',
        message: 'Uploading…',
      },
      {
        url: 'https://img.yzcdn.cn/vant/tree.jpg',
        status: 'failed',
        message: 'Upload failed',
      },
    ];

    const previewCoverFiles = ref([
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        file: {
          name: '图片名称',
        },
      },
    ]);

    const beforeRead = (file: File) => {
      if (file.type !== 'image/jpeg') {
        return false;
      }
      return true;
    };

    const afterRead = (file: UploaderFileListItem, detail: unknown) => {
      console.log(file, detail);
    };

    const afterReadFailed = (item: UploaderFileListItem) => {
      item.status = 'uploading';
      item.message = '上传中...';

      setTimeout(() => {
        item.status = 'failed';
        item.message = '上传失败';
      }, 1000);
    };

    const onOversize = (file: UploaderFileListItem, detail: unknown) => {
      console.log(file, detail);
    };

    return {
      fileList,
      fileList2,
      fileList3,
      fileList4,
      fileList5,
      statusFileList,
      previewCoverFiles,
      beforeRead,
      afterRead,
      afterReadFailed,
      onOversize,
    };
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-uploader {
  background-color: @white;

  .c-uploader {
    margin-left: @padding-md;
  }

  .preview-cover {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>
