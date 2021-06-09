# Pagination 分页

### 介绍

数据量过多时，采用分页的形式将数据分隔，每次只加载一个页面。

### 引入

```js
import { createApp } from 'vue';
import { Pagination } from 'cupshe-element';

const app = createApp();
app.use(Pagination);
```

## 代码演示

### 基础用法

通过 `v-model` 来绑定当前页码。

```html
<c-pagination v-model="current" />
```

```js
export default {
  data() {
    return {
      current: 1,
    };
  },
};
```

<demo-code inline>./demo/index.vue</demo-code>

## API

### Props

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| v-model          | 当前页码 | _number_ | 1 |
| page-count          | 总页数 | _number_ | 1 |

### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| change  | 页码改变时触发 | _page: number_ |
