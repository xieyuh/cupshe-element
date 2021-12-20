<template>
  <demo-block title="基础用法">
    <c-collapse v-model="active1">
      <c-collapse-item title="标题">文本</c-collapse-item>
      <c-collapse-item title="标题">文本</c-collapse-item>
    </c-collapse>
  </demo-block>

  <demo-block title="标题栏大小">
    <c-collapse v-model="active2" size="small">
      <c-collapse-item title="标题">文本</c-collapse-item>
      <c-collapse-item title="标题">文本</c-collapse-item>
    </c-collapse>
  </demo-block>

  <demo-block title="手风琴">
    <c-collapse v-model="active3" accordion>
      <c-collapse-item title="标题">文本</c-collapse-item>
      <c-collapse-item title="标题">文本</c-collapse-item>
      <c-collapse-item title="标题">文本</c-collapse-item>
    </c-collapse>
  </demo-block>

  <demo-block title="深色主题">
    <c-collapse v-model="active4" accordion theme="dark">
      <c-collapse-item title="标题">文本</c-collapse-item>
      <c-collapse-item title="标题">文本</c-collapse-item>
    </c-collapse>
  </demo-block>

  <demo-block title="元素间距">
    <c-collapse v-model="active5" gutter="6" :border="false">
      <c-collapse-item title="标题">文本</c-collapse-item>
      <c-collapse-item title="标题">文本</c-collapse-item>
      <c-collapse-item title="标题">文本</c-collapse-item>
    </c-collapse>
  </demo-block>

  <demo-block title="禁用状态">
    <c-collapse v-model="active6">
      <c-collapse-item title="标题">文本</c-collapse-item>
      <c-collapse-item title="标题" disabled>文本</c-collapse-item>
    </c-collapse>
  </demo-block>

  <demo-block title="自定义图标">
    <c-collapse v-model="active7">
      <c-collapse-item title="标题"
        >文本
        <template #icon="{ expanded }">
          <c-icon :name="expanded ? 'minus' : 'plus'" />
        </template>
      </c-collapse-item>
    </c-collapse>
  </demo-block>

  <demo-block title="自定义标题内容">
    <c-collapse v-model="active8">
      <c-collapse-item>
        <template #title>标题<c-icon name="question" /></template>
        文本
      </c-collapse-item>
    </c-collapse>
  </demo-block>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import '@cupshe/fonts';

export default {
  setup() {
    const state = reactive({
      active1: [0],
      active2: [0],
      active3: 0,
      active4: [],
      active5: [],
      active6: [],
      active7: [],
      active8: [],
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
