<template>
  <demo-block title="基础用法">
    <div class="ab-test">
      <div class="c-muli">token值：'test-1'</div>
      <div class="c-muli">localstorage中键为 'test-1' 的值：'test-1'</div>
      <c-ab-test token="test-1">
        <div class="c-muli-light ab-test-value">Test-1</div>
      </c-ab-test>
    </div>
    <div class="ab-test">
      <div class="c-muli">token值：'test-2'</div>
      <div class="c-muli">localstorage中键为 'test-2' 的值：''</div>
      <c-ab-test token="test-2">
        <div class="c-muli-light ab-test-value">Test-2</div>
      </c-ab-test>
    </div>
  </demo-block>

  <demo-block title="展示策略">
    <div class="ab-test">
      <div class="c-muli">token值：'test-3'</div>
      <div class="c-muli">localstorage中键为 'test-3' 的值：'test-3'</div>
      <c-ab-test token="test-3" mode="negative">
        <div class="c-muli-light ab-test-value">Test-3</div>
      </c-ab-test>
    </div>
    <div class="ab-test">
      <div class="c-muli">token值：'test-4'</div>
      <div class="c-muli">localstorage中键为 'test-4' 的值：''</div>
      <c-ab-test token="test-4" mode="negative">
        <div class="c-muli-light ab-test-value">Test-4</div>
      </c-ab-test>
    </div>
  </demo-block>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  localStorage.setItem('test-1', 'test-1');
  localStorage.setItem('test-3', 'test-3');
});
</script>

<style lang="less">
.demo-ab-test {
  background: #fff;

  .ab-test {
    padding: 0 20px;
    margin-bottom: 20px;

    .ab-test-value {
      background: #fafafa;
      margin: 20px 0;
      padding: 10px;
    }
  }
}
</style>
