<template>
  <demo-block title="基础用法">
    <c-tag>Tag</c-tag>
    <c-tag>
      <c-icon name="star" />
      Tag</c-tag
    >
  </demo-block>

  <demo-block title="不可选中">
    <c-tag :checkable="false">Tag</c-tag>
  </demo-block>

  <demo-block title="自定义颜色">
    <c-tag color="#ffe1e1" text-color="#ad0000">标签</c-tag>
  </demo-block>

  <demo-block title="自定义样式">
    <c-tag checked-class="checked">Tag</c-tag>
  </demo-block>
</template>

<style lang="less">
.demo-tag {
  background: #fff;

  .c-tag {
    margin-left: 20px;
  }

  .checked {
    color: #fff;
    background-color: #000;
  }
}
</style>
