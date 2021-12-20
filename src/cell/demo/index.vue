<template>
  <demo-block title="基础用法">
    <c-cell-group>
      <c-cell title="单元格" value="内容" />
      <c-cell title="单元格" value="内容" label="描述信息" />
    </c-cell-group>
  </demo-block>

  <demo-block title="卡片风格">
    <c-cell-group inset>
      <c-cell title="单元格" value="内容" />
      <c-cell title="单元格" value="内容" label="描述信息" />
    </c-cell-group>
  </demo-block>

  <demo-block title="单元格大小">
    <c-cell title="单元格" value="内容" size="large" />
    <c-cell title="单元格" value="内容" size="large" label="描述信息" />
  </demo-block>

  <demo-block title="展示图标">
    <c-cell title="单元格" value="内容" icon="star" />
  </demo-block>

  <demo-block title="只设置 value">
    <c-cell value="内容" />
  </demo-block>

  <demo-block title="展示箭头">
    <c-cell title="单元格" is-link />
    <c-cell title="单元格" is-link value="内容" />
    <c-cell title="单元格" is-link arrow-direction="down" value="内容" />
  </demo-block>

  <demo-block title="页面导航">
    <c-cell title="URL 跳转" is-link url="/vant/mobile.html" />
    <c-cell title="路由跳转" is-link to="index" />
  </demo-block>

  <demo-block title="分组标题">
    <c-cell-group title="分组 1">
      <c-cell title="单元格" value="内容" />
    </c-cell-group>
    <c-cell-group title="分组 2">
      <c-cell title="单元格" value="内容" />
    </c-cell-group>
  </demo-block>

  <demo-block title="使用插槽">
    <c-cell icon="shop-o" title="单元格">
      <template #right-icon>
        <c-icon name="search" class="search-icon" />
      </template>
    </c-cell>
  </demo-block>

  <demo-block title="垂直居中">
    <c-cell center title="单元格" value="内容" label="描述信息" />
  </demo-block>
</template>

<script setup>
import '@cupshe/fonts';
</script>

<style lang="less">
.demo-cell {
  .custom-title {
    margin-right: 4px;
    vertical-align: middle;
  }

  .search-icon {
    font-size: 16px;
    line-height: inherit;
  }
}
</style>
