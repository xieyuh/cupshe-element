# Currency 货币

### 介绍

展示货币价格的简称、数值及货币符号。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Currency } from 'cupshe-element';

const app = createApp();
app.use(Currency);
```

## 代码演示

### 基础用法

通过 `title` 属性设置货币简称，通过 `value` 属性设置数值。

```html
<c-currency value="12.99" title="USD" />
<c-currency value="1000.99" title="EUR" />
```

### 数值精度

通过 `precision` 属性调整货币数值的展示精度。

```html
<c-currency value="1000" precision="2" />
```

### 隐藏货币名称

通过 `show-title` 属性来隐藏货币名称。

```html
<c-currency value="12.99" :show-title="false" />
```

### 自定义符号

通过 `custom-symbol` 属性给组件添加额外的货币符号，添加的符号将覆盖组件内部符号。

```html
<c-currency :custom-symbol="{ CNY: '¥' }" title="CNY" :value="12.99" />
<c-currency :custom-symbol="{ USD: '$$' }" value="12.99" />
```

### 自定义分隔符

通过 `decimal-separator` 属性和 `group-separator` 属性设置数值的千分位分隔符和小数点分隔符。

```html
<c-currency
  value="19999.99"
  title="USD"
  decimal-separator=","
  group-separator="."
/>
```

### 名称位置

通过 `title-position` 属性修改货币名称的位置 支持 `left`、`right`，默认为 `right`。

```html
<c-currency value="12.99" title="USD" title-position="left" />
```

## API

### Props

| 参数              | 说明                                            | 类型               | 默认值  |
| ----------------- | ----------------------------------------------- | ------------------ | ------- |
| value             | 数值                                            | _number \| string_ | -       |
| title             | 货币简称，支持`USD`, `AUD`, `EUR`, `GBP`, `MXN` | _string_           | `USD`   |
| precision         | 数值精度                                        | _number \| string_ | 2       |
| decimal-separator | 小数分隔符                                      | _string_           | `.`     |
| group-separator   | 千分位分隔符                                    | _string_           | `,`     |
| title-position    | 名称位置，可选值 `left`, `right`                | _string_           | `right` |
| show-title        | 是否显示名称                                    | _boolean_          | `true`  |
| custom-symbol     | 自定义货币符号                                  | _object_           | -       |
| value-class       | 数值类名                                        | _string_           | -       |
| symbol-class      | 货币符号类名                                    | _string_           | -       |
| title-class       | 货币名称类名                                    | _string_           | -       |
