# Swipe 轮播

### 介绍

用于循环播放一组图片或内容。[PC 端预览](/mobile.html#/swipe)

### 引入

通过以下方式来全局注册组件。

```js
import { createApp } from 'vue';
import { Swipe, SwipeItem } from 'cupshe-element';

const app = createApp();
app.use(Swipe);
app.use(SwipeItem);
```

## 代码演示

### 基础用法

每个 SwipeItem 代表一张轮播卡片，可以通过 `autoplay` 属性设置自动轮播的间隔。

```html
<c-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <c-swipe-item>1</c-swipe-item>
  <c-swipe-item>2</c-swipe-item>
  <c-swipe-item>3</c-swipe-item>
  <c-swipe-item>4</c-swipe-item>
</c-swipe>

<style>
  .my-swipe .c-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
```

### 懒加载

当 Swipe 中含有图片时，可以通过 `lazy-render` 属性来开启懒加载模式。在懒加载模式下，只会渲染当前页和下一页。

```html
<c-swipe :autoplay="3000" lazy-render>
  <c-swipe-item v-for="image in images" :key="image">
    <img :src="image" />
  </c-swipe-item>
</c-swipe>
```

```js
export default {
  setup() {
    const images = [
      'https://img.yzcdn.cn/vant/apple-1.jpg',
      'https://img.yzcdn.cn/vant/apple-2.jpg',
    ];
    return { images };
  },
};
```

### 监听 change 事件

在每一页轮播结束后，会触发 `change` 事件。

```html
<c-swipe @change="onChange">
  <c-swipe-item>1</c-swipe-item>
  <c-swipe-item>2</c-swipe-item>
  <c-swipe-item>3</c-swipe-item>
  <c-swipe-item>4</c-swipe-item>
</c-swipe>
```

```js
import { Toast } from 'cupshe-element';

export default {
  setup() {
    const onChange = (index) => Toast('当前 Swipe 索引：' + index);
    return { onChange };
  },
};
```

### 纵向滚动

设置 `vertical` 属性后滑块会纵向排列，此时需要指定滑块容器的高度。

```html
<c-swipe style="height: 200px;" vertical>
  <c-swipe-item>1</c-swipe-item>
  <c-swipe-item>2</c-swipe-item>
  <c-swipe-item>3</c-swipe-item>
  <c-swipe-item>4</c-swipe-item>
</c-swipe>
```

### 自定义滑块大小

滑块默认宽度为 `100%`，可以通过 `width` 属性设置单个滑块的宽度。纵向滚动模式下，可以通过 `height` 属性设置单个滑块的高度。

```html
<c-swipe :loop="false" :width="300">
  <c-swipe-item>1</c-swipe-item>
  <c-swipe-item>2</c-swipe-item>
  <c-swipe-item>3</c-swipe-item>
  <c-swipe-item>4</c-swipe-item>
</c-swipe>
```

> 目前不支持在循环滚动模式下自定义滑块大小，因此需要将 loop 设置为 false。

### 自定义指示器

通过 `indicator` 插槽可以自定义指示器的样式。

```html
<c-swipe>
  <c-swipe-item>1</c-swipe-item>
  <c-swipe-item>2</c-swipe-item>
  <c-swipe-item>3</c-swipe-item>
  <c-swipe-item>4</c-swipe-item>
  <template #indicator="{ active }">
    <div class="custom-indicator">{{ active + 1 }}/4</div>
  </template>
</c-swipe>

<style>
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
</style>
```

## API

### Swipe Props

| 参数             | 说明                     | 类型               | 默认值    |
| ---------------- | ------------------------ | ------------------ | --------- |
| autoplay         | 自动轮播间隔，单位为 ms  | _number \| string_ | -         |
| duration         | 动画时长，单位为 ms      | _number \| string_ | `500`     |
| initial-swipe    | 初始位置索引值           | _number \| string_ | `0`       |
| width            | 滑块宽度，单位为 `px`    | _number \| string_ | `auto`    |
| height           | 滑块高度，单位为 `px`    | _number \| string_ | `auto`    |
| loop             | 是否开启循环播放         | _boolean_          | `true`    |
| show-indicators  | 是否显示指示器           | _boolean_          | `true`    |
| vertical         | 是否为纵向滚动           | _boolean_          | `false`   |
| touchable        | 是否可以通过手势滑动     | _boolean_          | `true`    |
| stop-propagation | 是否阻止滑动事件冒泡     | _boolean_          | `true`    |
| lazy-render      | 是否延迟渲染未展示的轮播 | _boolean_          | `false`   |
| indicator-color  | 指示器颜色               | _string_           | `#1989fa` |

### Swipe Events

| 事件名 | 说明                 | 回调参数            |
| ------ | -------------------- | ------------------- |
| change | 每一页轮播结束后触发 | index, 当前页的索引 |

### SwipeItem Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| click  | 点击时触发 | _event: MouseEvent_ |

### Swipe 方法

通过 ref 可以获取到 Swipe 实例并调用实例方法，详见[组件实例方法](#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa)。

| 方法名  | 说明                                                       | 参数                                     | 返回值 |
| ------- | ---------------------------------------------------------- | ---------------------------------------- | ------ |
| prev    | 切换到上一轮播                                             | -                                        | -      |
| next    | 切换到下一轮播                                             | -                                        | -      |
| swipeTo | 切换到指定位置                                             | _index: number, options: SwipeToOptions_ | -      |
| resize  | 外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘 | -                                        | -      |

### SwipeToOptions 格式

| 名称      | 说明         | 类型      |
| --------- | ------------ | --------- |
| immediate | 是否跳过动画 | _boolean_ |

### Swipe Slots

| 名称      | 说明         | 参数                 |
| --------- | ------------ | -------------------- |
| default   | 轮播内容     | -                    |
| indicator | 自定义指示器 | _{ active: number }_ |

## 常见问题

### 滑动轮播时为什么触发了 click 事件？

这种情况通常是由于项目中引入了 `fastclick` 库导致的。`fastclick` 的原理是通过 Touch 事件模拟出 click 事件，而 Swipe 内部默认会阻止 touchmove 事件冒泡，干扰了 fastclick 的判断，导致出现这个问题。

将 Swipe 组件的 stop-propagation 属性设置为 false 即可避免该问题。

### 组件从隐藏状态切换到显示状态时，无法正确渲染？

Swipe 组件在挂载时，会获取自身的宽度，并计算出轮播图的位置。如果组件一开始处于隐藏状态，则获取到的宽度永远为 0，因此无法正确计算位置。

#### 解决方法

方法一，如果是使用 `v-show` 来控制组件展示的，则替换为 `v-if` 即可解决此问题：

```html
<!-- Before -->
<c-swipe v-show="show" />
<!-- After -->
<c-swipe v-if="show" />
```

方法二，调用组件的 resize 方法来主动触发重绘：

```html
<c-swipe v-show="show" ref="swipe" />
```

```js
this.$refs.swipe.resize();
```
