# Rate 评分

### 介绍

用于对事物进行评级操作。[PC 端预览](/mobile.html#/rate)

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Rate } from 'cupshe-element';

const app = createApp();
app.use(Rate);
```

## 代码演示

### 基础用法

通过 `v-model` 来绑定当前评分值。

```html
<c-rate v-model="value" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(3);
    return { value };
  },
};
```

### 评分文案

`Rate` 组件提供了 `text` 插槽，用于设置评分文案。

```html
<c-rate v-model="value2">
  <template #text>Write a review</template>
</c-rate>
```

### 自定义图标

通过 `icon` 属性设置选中时的图标，`void-icon` 属性设置未选中时的图标。

```html
<c-rate v-model="value" icon="like" void-icon="like-o" />
```

### 自定义颜色

通过 `color` 属性设置选中时的颜色，`void-color` 属性设置未选中时的颜色。

```html
<c-rate v-model="value9" color="#333" void-color="#333" />
```

### 自定义大小

通过 `size` 属性设置图标大小，可选值为 `normal`，`large`。

```html
<c-rate v-model="value" /> <c-rate v-model="value" size="large" />
```

### 半星

设置 `allow-half` 属性后可以选中半星。

```html
<c-rate v-model="value" allow-half />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(2.5);
    return { value };
  },
};
```

### 自定义数量

通过 `count` 属性设置评分总数。

```html
<c-rate v-model="value" :count="6" />
```

### 禁用状态

通过 `disabled` 属性来禁用评分。

```html
<c-rate v-model="value" disabled />
```

### 只读状态

通过 `readonly` 属性将评分设置为只读状态。

```html
<c-rate v-model="value" readonly />
```

### 只读状态显示小数

设置 `readonly` 和 `allow-half` 属性后，Rate 组件可以展示任意小数结果。

```html
<c-rate v-model="value" readonly allow-half />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(3.3);
    return { value };
  },
};
```

### 监听 change 事件

评分变化时，会触发 `change` 事件。

```html
<c-rate v-model="value" @change="onChange" />
```

```javascript
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(3);
    const onChange = (value) => Toast('当前值：' + value);
    return {
      value,
      onChange,
    };
  },
};
```

## API

### Props

| 参数           | 说明                                    | 类型               | 默认值      |
| -------------- | --------------------------------------- | ------------------ | ----------- |
| v-model        | 当前分值                                | _number_           | -           |
| count          | 图标总数                                | _number \| string_ | `5`         |
| size           | 尺寸，可选值为 `large` `normal` `small` | _string_           | `normal`    |
| gutter         | 图标间距，默认单位为`px`                | _number \| string_ | `0px`       |
| color          | 选中时的颜色                            | _string_           | `#f6be42`   |
| void-color     | 未选中时的颜色                          | _string_           | `#c8c9cc`   |
| disabled-color | 禁用时的颜色                            | _string_           | `#c8c9cc`   |
| icon           | 选中时的[图标名称](#/icon)或图片链接    | _string_           | `star_full` |
| void-icon      | 未选中时的[图标名称](#/icon)或图片链接  | _string_           | `star`      |
| allow-half     | 是否允许半选                            | _boolean_          | `false`     |
| readonly       | 是否为只读状态，只读状态下无法修改评分  | _boolean_          | `false`     |
| disabled       | 是否禁用评分                            | _boolean_          | `false`     |

### Events

| 事件名     | 说明                     | 回调参数            |
| ---------- | ------------------------ | ------------------- |
| change     | 当前分值变化时触发的事件 | 当前分值            |
| click-text | 点击文案时触发的事件     | _event: MouseEvent_ |

### Slots

| 名称 | 说明     |
| ---- | -------- |
| text | 评分文案 |
