# ActionSheet 动作面板

### 介绍

底部弹起的模态面板，包含与当前情境相关的多个选项。[PC 端预览](/mobile.html#/action-sheet)

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { ActionSheet } from 'cupshe-element';

const app = createApp();
app.use(ActionSheet);
```

## 代码演示

### 基础用法

动作面板通过 `actions` 属性来定义选项，`actions` 属性是一个由对象构成的数组，数组中的每个对象配置一列，对象格式见文档下方表格。

```html
<c-cell is-link title="基础用法" @click="show = true" />
<c-action-sheet
  v-model="value1"
  v-model:show="show"
  :actions="actions"
  @select="onSelect"
/>
```

```js
import { ref } from 'vue';
import { Toast } from 'cupshe-element';

export default {
  setup() {
    const show = ref(false);
    const value = ref('value1');
    const actions = [
      { text: '选项一', value: 'value1' },
      { text: '选项二', value: 'value2' },
      { text: '选项三', value: 'value3' },
    ];
    const onSelect = (item) => {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      show.value = false;
      Toast(item.text);
    };

    return {
      show,
      actions,
      onSelect,
    };
  },
};
```

### 选项状态

可以通过 `disabled` 将选项设置为禁用状态。

```html
<c-action-sheet
  v-model="value"
  v-model:show="show"
  :actions="actions"
  close-on-click-action
/>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(false);
    const value = ref('value1');
    const actions = [
      { text: '选项', value: 'value1' },
      { text: '禁用选项', disabled: true, value: 'value2' },
    ];

    return {
      show,
      actions,
    };
  },
};
```

### 自定义面板

通过插槽可以自定义面板的展示内容，同时可以使用`title`属性展示标题栏

```html
<c-action-sheet v-model:show="show" title="标题">
  <div class="content">内容</div>
</c-action-sheet>

<style>
  .content {
    padding: 16px 16px 160px;
  }
</style>
```

## API

### Props

| 参数                   | 说明                                                                                                            | 类型                                                | 默认值  |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------- |
| v-model:modelValue     | 当前选中值                                                                                                      | _string \| number_                                  | -       |
| v-model:show           | 是否显示动作面板                                                                                                | _boolean_                                           | `false` |
| actions                | 面板选项列表                                                                                                    | _ActionSheetAction[]_                               | `[]`    |
| title                  | 顶部标题                                                                                                        | _string_                                            | -       |
| duration               | 动画时长，单位秒，设置为 0 可以禁用动画                                                                         | _number \| string_                                  | `0.3`   |
| overlay                | 是否显示遮罩层                                                                                                  | _boolean_                                           | `true`  |
| overlay-class          | 自定义遮罩层类名                                                                                                | _string \| Array \| object_                         | -       |
| overlay-style          | 自定义遮罩层样式                                                                                                | _object_                                            | -       |
| lock-scroll            | 是否锁定背景滚动                                                                                                | _boolean_                                           | `true`  |
| lazy-render            | 是否在显示弹层时才渲染节点                                                                                      | _boolean_                                           | `true`  |
| close-on-popstate      | 是否在页面回退时自动关闭                                                                                        | _boolean_                                           | `true`  |
| close-on-click-action  | 是否在点击选项后关闭                                                                                            | _boolean_                                           | `false` |
| close-on-click-overlay | 是否在点击遮罩层后关闭                                                                                          | _boolean_                                           | `true`  |
| safe-area-inset-bottom | 是否开启[底部安全区适配](#/zh-CN/advanced-usage#di-bu-an-quan-qu-gua-pei)                                       | _boolean_                                           | `true`  |
| teleport               | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://v3.cn.vuejs.org/api/built-in-components.html#teleport) | _string \| Element_                                 | -       |
| before-close           | 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 Promise                                                     | _(action: string) => boolean \| Promise\<boolean\>_ | -       |

### Action 数据结构

`actions` 属性是一个由对象构成的数组，数组中的每个对象配置一列，对象可以包含以下值：

| 键名     | 说明           | 类型               |
| -------- | -------------- | ------------------ |
| text     | 标题           | _string_           |
| value    | 值             | _string \| number_ |
| disabled | 是否为禁用状态 | _boolean_          |

### Events

| 事件名        | 说明                                     | 回调参数                                   |
| ------------- | ---------------------------------------- | ------------------------------------------ |
| select        | 点击选项时触发，禁用或加载状态下不会触发 | _action: ActionSheetAction, index: number_ |
| cancel        | 点击取消按钮时触发                       | -                                          |
| open          | 打开面板时触发                           | -                                          |
| close         | 关闭面板时触发                           | -                                          |
| opened        | 打开面板且动画结束后触发                 | -                                          |
| closed        | 关闭面板且动画结束后触发                 | -                                          |
| click-overlay | 点击遮罩层时触发                         | _event: MouseEvent_                        |

### Slots

| 名称    | 说明                 | 参数                                           |
| ------- | -------------------- | ---------------------------------------------- |
| default | 自定义面板的展示内容 | -                                              |
| action  | 自定义选项内容       | _{ action: ActionSheetAction, index: number }_ |

### 类型定义

组件导出以下类型定义：

```ts
import type { ActionSheetProps, ActionSheetAction } from 'cupshe-element';
```
