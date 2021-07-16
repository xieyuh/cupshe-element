# 内置样式

### 介绍

cupshe-element 中默认包含了一些常用样式，可以直接通过 className 的方式使用。

### 内置字体

cupshe-element 已将 `Muli` 系列字体内置，可通过 className 的方式直接使用，或通过 less 函数的方式使用。

```html
<div class="c-muli-light">AaBbCc</div>
<div class="c-muli">AaBbCc</div>
<div class="c-muli-semibold">AaBbCc</div>
<div class="c-muli-bold">AaBbCc</div>
<div class="c-muli-extrabold">AaBbCc</div>
```

```less
@import 'cupshe-elemnt/lib/style/font.less';

.some-class {
  .muli-light();
  .muli();
  .muli-bold();
  .muli-semibold();
  .muli-extrabold();
}
```

### 文字省略

当文本内容长度超过容器最大宽度时，自动省略多余的文本。

```html
<!-- 最多显示一行 -->
<div class="c-ellipsis">这是一段最多显示一行的文字，多余的内容会被省略</div>

<!-- 最多显示两行 -->
<div class="c-multi-ellipsis--l2">
  这是一段最多显示两行的文字，多余的内容会被省略
</div>

<!-- 最多显示三行 -->
<div class="c-multi-ellipsis--l3">
  这是一段最多显示三行的文字，多余的内容会被省略
</div>
```

### 1px 边框

为元素添加 Retina 屏幕下的 1px 边框（即 hairline），基于伪类 transform 实现。

```html
<!-- 上边框 -->
<div class="c-hairline--top"></div>

<!-- 下边框 -->
<div class="c-hairline--bottom"></div>

<!-- 左边框 -->
<div class="c-hairline--left"></div>

<!-- 右边框 -->
<div class="c-hairline--right"></div>

<!-- 上下边框 -->
<div class="c-hairline--top-bottom"></div>

<!-- 全边框 -->
<div class="c-hairline--surround"></div>
```

### 动画

可以通过 `transition` 组件使用内置的动画类。

```html
<!-- 淡入 -->
<transition name="c-fade">
  <div v-show="visible">Fade</div>
</transition>

<!-- 上滑进入 -->
<transition name="c-slide-up">
  <div v-show="visible">Slide Up</div>
</transition>

<!-- 下滑进入 -->
<transition name="c-slide-down">
  <div v-show="visible">Slide Down</div>
</transition>

<!-- 左滑进入 -->
<transition name="c-slide-left">
  <div v-show="visible">Slide Left</div>
</transition>

<!-- 右滑进入 -->
<transition name="c-slide-right">
  <div v-show="visible">Slide Right</div>
</transition>
```
