# useCurrency

### 介绍

处理货币格式。

## 代码演示

### 基本用法

```js
import { ref } from 'vue';
import { useCurrency } from 'cupshe-element/lib/utils';

const text = useCurrency('1')(10000);
```

## API

### 类型定义

```ts
function useCurrency(site: string | number): (val: string | number) => string;
```

### 参数

| 参数 | 说明           | 类型               | 默认值 |
| ---- | -------------- | ------------------ | ------ |
| site | 站点 ID        | _string \| number_ | -      |
| val  | 需要格式化的值 | _string \| number_ | -      |
