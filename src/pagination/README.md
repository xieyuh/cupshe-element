# Pagination 分页

### 介绍

数据量过多时，采用分页的形式将数据分隔，每次只加载一个页面。[PC 端预览](/mobile.html#/pagination)

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

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
<c-pagination v-model="currentPage" page-count="10" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const currentPage = ref(1);
    return { currentPage };
  },
};
```

## API

### Props

| 参数           | 说明           | 类型               | 默认值       |
| -------------- | -------------- | ------------------ | ------------ |
| v-model        | 当前页码       | _number_           | -            |
| page-count     | 总页数         | _number \| string_ | 根据页数计算 |
| force-ellipses | 是否显示省略号 | _boolean_          | `false`      |

### Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| change | 页码改变时触发 | -        |
