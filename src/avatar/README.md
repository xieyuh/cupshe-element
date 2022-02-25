# Avatar 头像

### 介绍

用于展示操作的当前进度。[PC 端预览](/mobile.html#/avatar)

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Avatar } from 'cupshe-element';

const app = createApp();
app.use(Avatar);
```

## 代码演示

### 基础用法

进度条默认为蓝色，使用 `percentage` 属性来设置当前进度。

```html
<c-progress :percentage="50" />
```

### 线条粗细

通过 `stroke-width` 可以设置进度条的粗细。

```html
<c-progress :percentage="50" stroke-width="8" />
```

### 自定义内容

通过 `text` 和 `percentage` 可以自定义内容。

```html
<c-progress :percentage="50" text="progres6">
  <template #text>
    <c-icon name="star" />
  </template>
</c-progress>
<c-progress :percentage="75" text="progress7">
  <template #percentage>cool!</template>
</c-progress>
```

## API

### Props

| 参数         | 说明                       | 类型               | 默认值    |
| ------------ | -------------------------- | ------------------ | --------- |
| percentage   | 进度百分比                 | _number \| string_ | `0`       |
| stroke-width | 进度条粗细，默认单位为`px` | _number \| string_ | `4px`     |
| color        | 进度条颜色                 | _string_           | `#1989fa` |
| track-color  | 轨道颜色                   | _string_           | `#e5e5e5` |
| text         | 进度文字颜色               | _string_           | `white`   |

### Slots

| 名称       | 说明             |
| ---------- | ---------------- |
| text       | 自定义标题文本   |
| percentage | 自定义百分比文本 |

### 方法

通过 ref 可以获取到 Progress 实例并调用实例方法，详见[组件实例方法](#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa)。

| 方法名 | 说明                                         | 参数 | 返回值 |
| ------ | -------------------------------------------- | ---- | ------ |
| resize | 外层元素大小变化后，可以调用此方法来触发重绘 | -    | -      |

## 常见问题

### 组件从隐藏状态切换到显示状态时，渲染不正确？

Progress 组件在挂载时，会获取自身的宽度，并计算出进度条的样式。如果组件一开始处于隐藏状态，则获取到的宽度永远为 0，因此无法展示正确的进度。

#### 解决方法

方法一，如果是使用 `v-show` 来控制组件展示的，则替换为 `v-if` 即可解决此问题：

```html
<!-- Before -->
<c-progress v-show="show" />
<!-- After -->
<c-progress v-if="show" />
```

方法二，调用组件的 resize 方法来主动触发重绘：

```html
<c-progress v-show="show" ref="progress" />
```

```js
this.$refs.progress.resize();
```
