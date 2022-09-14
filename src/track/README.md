# Track 事件追踪

### 介绍

当页面上的元素需要追踪其点击或曝光事件时，使用指令可以简化埋点事件的触发。[PC 端预览](/mobile.html#/track)

### 引入

通过以下方式来全局注册组件。

`Track` 是 `Vue` 指令，使用前需要对指令进行注册。在配置项中设定触发事件时调用的 `onEvent` 回调。

```js
import { createApp } from 'vue';
import { Track, Toast } from 'cupshe-element';

const app = createApp();

const trackOption = {
  onEvent: function (data) {
    Toast(data);
  },
};

app.use(Track, trackOption);
```

## 代码演示

### 基础用法

将 `v-track` 指令的添加到需要监听的元素上。使用 `click` 或 `view` 修饰符以区分点击事情或曝光事件。事件触发后，将会使用指令参数触发 `onEvent` 回调。

```html
<div v-track:click="state.event">点击事件</div>
<div v-track:view="state.event2">曝光事件</div>
```

```js
import { reactive } from 'vue';

export default {
  setup() {
    const state = reactive({
      event: 'click event',
      event2: 'view event',
    });

    return {
      state,
    };
  },
};
```

### 手动触发

`v-track` 指令注册后，可使用 `vm.$track.emit` 来手动触发配置的 `onEvent` 事件。

```html
<div @click="emit">手动触发</div>
```

```js
import { getCurrentInstance } from 'vue';

export default {
  setup() {
    const emit = () => {
      const { $track } = app?.appContext.config.globalProperties;

      $track.emit('manual event');
    };

    return { emit };
  },
};
```

## API

### Options

| 参数    | 说明                 | 类型           | 默认值 |
| ------- | -------------------- | -------------- | ------ |
| onEvent | 事件触发时的处理函数 | _data: Object_ | -      |
