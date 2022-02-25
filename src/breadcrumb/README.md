# Breadcrumb 面包屑

### 介绍

显示当前页面在系统层级结构中的位置，并能向上返回。[PC 端预览](/mobile.html#/breadcrumb)

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Breadcrumb } from 'cupshe-element';

const app = createApp();
app.use(Breadcrumb);
```

## 代码演示

### 基础用法

最简单的用法。

```html
<c-breadcrumb :routes="routes" />
```

```js
export default {
  setup() {
    const routes = [
      { name: 'Home' },
      { name: 'New In' },
      { name: 'Product name' },
    ];

    return { routes };
  },
};
```

### 使用链接

使用 `href` 属性将每个面包屑转为 `a` 标签。

```html
<c-breadcrumb :routes="routes" />
```

```js
export default {
  setup() {
    const routes = [
      { name: 'Home', href: '/home' },
      { name: 'New In', href: '/newin' },
      { name: 'Product name', href: 'product' },
    ];

    return { routes };
  },
};
```

### 自定义渲染

使用 `item` 插槽自定义每个面包屑的渲染。

```html
<c-breadcrumb :routes="routes">
  <template #item="{ route, separator }">
    <c-icon name="link" />
    <span>{{ route.name }}</span>
    <span>{{ separator }}</span>
  </template>
</c-breadcrumb>
```

```js
export default {
  setup() {
    const routes = [
      { name: 'Home', href: '/home' },
      { name: 'New In', href: '/newin' },
      { name: 'Product name', href: 'product' },
    ];

    return { routes };
  },
};
```

## API

### Props

| 参数      | 说明       | 类型           | 默认值 |
| --------- | ---------- | -------------- | ------ |
| separator | 分隔符     | _string_       | `/`    |
| routes    | 路由栈信息 | _Array<Route>_ | `[]`   |

### Route 数据结构

| 参数 | 说明     | 类型     | 默认值 |
| ---- | -------- | -------- | ------ |
| name | 文案     | _string_ | -      |
| href | 链接地址 | _string_ | -      |

### Events

| 事件名 | 说明             | 回调参数       |
| ------ | ---------------- | -------------- |
| click  | 点击面包屑时触发 | _route: Route_ |

### Slots

| 名称 | 说明       |
| ---- | ---------- |
| item | 面包屑内容 |
