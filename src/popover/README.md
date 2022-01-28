# Popover 气泡弹出框

### 介绍

弹出式的气泡菜单。[PC 端预览](/mobile.html#/popover)

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Popover } from 'cupshe-element';

const app = createApp();
app.use(Popover);
```

## 代码演示

### 基础用法

当 Popover 弹出时，会基于 `reference` 插槽的内容进行定位。

```html
<c-popover v-model:show="showPopover1" :actions="actions" @select="onSelect">
  <template #reference>
    <c-button type="primary">Click Me</c-button>
  </template>
</c-popover>

<c-popover
  v-model:show="showPopover2"
  trigger="hover"
  :actions="actions"
  @select="onSelect"
>
  <template #reference>
    <c-button type="primary">Hover Me</c-button>
  </template>
</c-popover>
```

```js
import { ref } from 'vue';
import { Toast } from 'vant';

export default {
  setup() {
    const showPopover1 = ref(false);
    const showPopover2 = ref(false);

    // 通过 actions 属性来定义菜单选项
    const actions = [
      { text: '选项一' },
      { text: '选项二' },
      { text: '选项三' },
    ];
    const onSelect = (action) => Toast(action.text);

    return {
      actions,
      onSelect,
      showPopover,
    };
  },
};
```

### 弹出位置

通过 `placement` 属性来控制气泡的弹出位置。

```html
<c-popover placement="top" />
```

`placement` 支持以下值：

```bash
top           # 顶部中间位置
top-start     # 顶部左侧位置
top-end       # 顶部右侧位置
left          # 左侧中间位置
left-start    # 左侧上方位置
left-end      # 左侧下方位置
right         # 右侧中间位置
right-start   # 右侧上方位置
right-end     # 右侧下方位置
bottom        # 底部中间位置
bottom-start  # 底部左侧位置
bottom-end    # 底部右侧位置
```

### 展示图标

在 `actions` 数组中，可以通过 `icon` 字段来定义选项的图标，支持传入[图标名称](#/icon)或图片链接。

```html
<c-popover v-model:show="showPopover" :actions="actions">
  <template #reference>
    <c-button type="primary">展示图标</c-button>
  </template>
</c-popover>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const showPopover = ref(false);
    const actions = [
      { text: '选项一', icon: 'add-o' },
      { text: '选项二', icon: 'music-o' },
      { text: '选项三', icon: 'more-o' },
    ];

    return {
      actions,
      showPopover,
    };
  },
};
```

### 禁用选项

在 `actions` 数组中，可以通过 `disabled` 字段来禁用某个选项。

```html
<c-popover v-model:show="showPopover" :actions="actions">
  <template #reference>
    <c-button type="primary">禁用选项</c-button>
  </template>
</c-popover>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const showPopover = ref(false);
    const actions = [
      { text: '选项一', disabled: true },
      { text: '选项二', disabled: true },
      { text: '选项三' },
    ];

    return {
      actions,
      showPopover,
    };
  },
};
```

### 自定义内容

通过默认插槽，可以在 Popover 内部放置任意内容。

```html
<c-popover v-model:show="showPopover">
  <c-grid square clickable :border="false" column-num="3" style="width: 240px;">
    <c-grid-item
      v-for="i in 6"
      :key="i"
      text="选项"
      icon="photo-o"
      @click="showPopover = false"
    />
  </c-grid>
  <template #reference>
    <c-button type="primary">自定义内容</c-button>
  </template>
</c-popover>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const showPopover = ref(false);
    return { showPopover };
  },
};
```

## API

### Props

| 参数                   | 说明                                                         | 类型                        | 默认值   |
| ---------------------- | ------------------------------------------------------------ | --------------------------- | -------- |
| v-model:show           | 是否展示气泡弹出层                                           | _boolean_                   | `false`  |
| actions                | 选项列表                                                     | _Action[]_                  | `[]`     |
| placement              | 弹出位置                                                     | _string_                    | `bottom` |
| trigger                | 触发方式，可选值为 `manual`、 `hover`                        | `click`                     |
| duration               | 动画时长，单位秒                                             | _number \| string_          | `0.3`    |
| offset                 | 出现位置的偏移量                                             | _[number, number]_          | `[0, 8]` |
| overlay                | 是否显示遮罩层                                               | _boolean_                   | `false`  |
| mouse-delay            | `hover` 事件触发延时，单位 `ms`                              | _number_                    | `100`    |
| overlay-class          | 自定义遮罩层类名                                             | _string \| Array \| object_ | -        |
| overlay-style          | 自定义遮罩层样式                                             | _object_                    | -        |
| close-on-click-action  | 是否在点击选项后关闭                                         | _boolean_                   | `true`   |
| close-on-click-outside | 是否在点击外部元素后关闭菜单                                 | _boolean_                   | `true`   |
| close-on-click-overlay | 是否在点击遮罩层后关闭菜单                                   | _boolean_                   | `true`   |
| teleport               | 指定挂载的节点，[用法示例](#/popup#zhi-ding-gua-zai-wei-zhi) | _string \| Element_         | `body`   |

### Action 数据结构

`actions` 属性是一个由对象构成的数组，数组中的每个对象配置一列，对象可以包含以下值：

| 键名      | 说明                                                       | 类型                        |
| --------- | ---------------------------------------------------------- | --------------------------- |
| text      | 选项文字                                                   | _string_                    |
| icon      | 文字左侧的图标，支持传入[图标名称](#/zh-CN/icon)或图片链接 | _string_                    |
| color     | 选项文字颜色                                               | _string_                    |
| disabled  | 是否为禁用状态                                             | _boolean_                   |
| className | 为对应选项添加额外的类名                                   | _string \| Array \| object_ |

### Events

| 事件名        | 说明                     | 回调参数                        |
| ------------- | ------------------------ | ------------------------------- |
| select        | 点击选项时触发           | _action: Action, index: number_ |
| open          | 打开菜单时触发           | -                               |
| close         | 关闭菜单时触发           | -                               |
| opened        | 打开菜单且动画结束后触发 | -                               |
| closed        | 关闭菜单且动画结束后触发 | -                               |
| click-overlay | 点击遮罩层时触发         | _event: MouseEvent_             |

### Slots

| 名称      | 说明                        |
| --------- | --------------------------- |
| default   | 自定义菜单内容              |
| reference | 触发 Popover 显示的元素内容 |

## 常见问题

### Popover 的点击事件无法正确触发？

这种情况通常是由于项目中引入了 `fastclick` 库导致的。建议移除 `fastclick`，或者配置 `fastclick` 的 [ignore 规则](https://github.com/ftlabs/fastclick#advanced)。
