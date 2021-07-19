<template>
  <demo-block title="基础用法">
    <c-collapse v-model="active1">
      <c-collapse-item :title="'标题' + 1">内容</c-collapse-item>
      <c-collapse-item :title="'标题' + 2">内容</c-collapse-item>
      <c-collapse-item :title="'标题' + 3">内容</c-collapse-item>
    </c-collapse>
  </demo-block>

  <demo-block title="手风琴">
    <c-collapse v-model="active2" accordion>
      <c-collapse-item :title="'标题' + 1">内容</c-collapse-item>
      <c-collapse-item :title="'标题' + 2">内容</c-collapse-item>
      <c-collapse-item :title="'标题' + 3">内容</c-collapse-item>
    </c-collapse>
  </demo-block>

  <demo-block title="禁用状态">
    <c-collapse v-model="active3">
      <c-collapse-item :title="'标题' + 1">内容</c-collapse-item>
      <c-collapse-item :title="'标题' + 2" disabled>内容</c-collapse-item>
      <c-collapse-item :title="'标题' + 3" disabled>内容</c-collapse-item>
    </c-collapse>
  </demo-block>

  <demo-block title="自定义标题内容">
    <c-collapse v-model="active4">
      <c-collapse-item>
        <template #title>{{ '标题' + 1 }}<c-icon name="question" /></template>
        内容
      </c-collapse-item>
      <c-collapse-item :title="'标题' + 2" value="内容" icon="question">
        内容
      </c-collapse-item>
    </c-collapse>
  </demo-block>

  <demo-block title="业务场景斑马线风格">
    <c-collapse v-model="active5" type="zebra">
      <c-collapse-item title="Account Related">
        <template #icon>
          <div class="icon">
            <c-icon name="account_sel" />
          </div>
        </template>

        内容
      </c-collapse-item>
      <c-collapse-item title="Account Related" icon="account_sel">
        内容
      </c-collapse-item>
    </c-collapse>
  </demo-block>
  <demo-block title="业务场景基础用法">
    <c-collapse v-model="active6" type="normal" :border="false">
      <c-collapse-item
        :border="false"
        title="1. Should I create an account before make purchase?"
      >
        内容
      </c-collapse-item>
      <c-collapse-item
        :border="false"
        title="2. Should I create an account before make purchase?"
      >
        内容
      </c-collapse-item>
    </c-collapse>
  </demo-block>
  <demo-block title="业务场景嵌套">
    <c-collapse v-model="active5" type="zebra">
      <c-collapse-item title="Account Related">
        <template #icon>
          <div class="icon">
            <c-icon name="account_sel" />
          </div>
        </template>

        <c-collapse v-model="active6" type="normal" :border="false">
          <c-collapse-item
            :border="false"
            title="1. Should I create an account before make purchase?"
          >
            内容
          </c-collapse-item>
          <c-collapse-item
            :border="false"
            title="2. Should I create an account before make purchase?"
          >
            内容
          </c-collapse-item>
        </c-collapse>
      </c-collapse-item>
      <c-collapse-item title="Account Related" icon="account_sel">
        内容
      </c-collapse-item>
    </c-collapse>
  </demo-block>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      active1: [0],
      active2: 0,
      active3: [],
      active4: [],
      active5: [],
      active6: [],
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-collapse {
  .c-icon-question-o {
    margin-left: 5px;
    color: @blue;
    font-size: 15px;
    vertical-align: -3px;
  }
}
</style>
