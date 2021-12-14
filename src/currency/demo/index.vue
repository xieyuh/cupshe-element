<template>
  <demo-block title="基础用法">
    <c-currency value="12.99" title="USD" />
    <c-currency value="1000.99" title="EUR" />
  </demo-block>

  <demo-block title="数值精度">
    <c-currency value="1000" precision="0" />
  </demo-block>

  <demo-block title="隐藏货币名称">
    <c-currency value="12.99" :show-title="false" />
  </demo-block>

  <demo-block title="自定义符号">
    <c-currency :custom-symbol="{ CNY: '¥' }" title="CNY" value="12.99" />
    <c-currency :custom-symbol="{ USD: '$$' }" value="12.99" />
  </demo-block>

  <demo-block title="自定义分隔符">
    <c-currency
      value="19999.99"
      title="USD"
      decimal-separator=","
      group-separator="."
    />
  </demo-block>

  <demo-block title="名称位置">
    <c-currency value="12.99" title="USD" title-position="left" />
  </demo-block>

  <demo-block title="自定义样式">
    <c-currency
      value="12.99"
      title="USD"
      symbol-class="italic"
      value-class="bold"
      title-class="margin"
    />
  </demo-block>
</template>

<script setup>
import '@cupshe/fonts';
</script>

<style lang="less">
@import '../../style/var';

.demo-currency {
  padding-bottom: 20px;
  background-color: @white;

  .c-currency {
    margin-left: @padding-md;
  }

  .italic {
    font-style: italic;
  }

  .bold {
    font-weight: bold;
  }

  .margin {
    margin-left: 8px;
  }
}
</style>
