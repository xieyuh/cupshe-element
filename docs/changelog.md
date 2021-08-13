# 更新日志

### 介绍

cupshe-element 遵循 [Semver](https://semver.org/lang/zh-CN/) 语义化版本规范

## 更新内容

### v1.8.4

**Feature**

- Uploader 组件新增 `default` 插槽以自定义上传按钮
- Rate 组件新增 `gutter` 属性

### v1.8.3

**Feature**

- Input 组件新增 `format`, `format-trigger` 属性

### v1.8.2

**Performance**

- 优化样式引入方式以缩小打包体积

### v1.8.1

**New Component**

- 新增 Uploader 组件

### v1.8.0

**Feature**

- Input 组件支持 `type` 属性设置值为 `textarea` 等，并支持 `autosize` 自动调整大小

### v1.7.8

**Feature**

- 更新了 Rate 组件大小的设置方式

### v1.7.7

**Fix**

- 修复了 Select 通过点击控件不能切换开关状态的问题
- 修复了 Rate 图标行高问题

### v1.7.6

**Fix**

- Tag 组件选中状态字重从 `semi-bold` 调整到 `bold`

### v1.7.5

**Feature**

- Select 组件支持组件级和选项级的 `disabled` 属性

**Fix**

- 修复了 Select 组件点击 icon 不能弹出选项的问题

### v1.7.2

**Feature**

- Rate 组件修改了响应式设计

### v1.7.1

**Feature**

- Collapse 组件新增 `icon` 插槽
- Select、Input 组件支持 `size` 属性
- Select 支持自定义长度

### v1.7.0

**New Component**

- 新增 Collapse 组件

**Feature**

- 新增 Progress 组件在移动端下的样式
- Select 组件新增 `option` 插槽

### v1.6.2

**New Component**

- 新增 Select 组件

**Bug Fixes**

- 修复 Input 组件当 `modelValue` 属性变化时输入框内容没有跟随变化的问题

### v1.6.1

**Feature**

- Input 组件新增 `style` 属性用以自定义样式新增 `onChange` 事件

**Bug Fixes**

- 修复 Input 组件 `maxlength` 属性没有生效的问题，修复自定义高度下 `prefix` 和 `suffix` 没有居中的问题

### v1.6.0

**New Component**

- 新增 Avatar 组件
- 新增 Pagination 组件
- 新增 Popover 组件
- 新增 Progress 组件
- 新增 Tag 组件

**Feature**

- Input 组件新增 `prefix`, `suffix`, `addon` 插槽

### v1.5.0

**New Component**

- 新增 Swipe 组件

**Feature**

- Input 组件新增 `prefix`, `suffix`, `addon` 插槽

### v1.4.0

**New Component**

- 新增 Radio, RadioGroup 组件

**Feature**

- Checkbox 新增 `icon` 插槽
- Rate 新增 `text` 插槽

### v1.3.0

**Feature**

- Popup 新增 `before-close` 事件
- Rate 新增 `text` 插槽，并根据设计稿修改样式
- Stepper 新增 `border` 属性，并根据设计稿修改样式

### v1.2.4

**Bug Fixes**

- 修复 Checkbox 组件样式不符合设计规范的问题
- CheckboxGroup 新增水平排列参数

### v1.2.0

**New Component**

- 新增 Form 表单组件
- 新增 Input 输入框组件
- 新增 Select 下拉组件
- 新增 Collapse 折叠面板组件斑马线风格和基础风格样式

**Bug Fixes**

- 修复 Collapse 组件支持 slot icon 的问题

### v1.1.0

**New Component**

- 新增 Style 内置样式
- 新增 Overlay 遮罩层组件

**Bug Fixes**

- 修复 Button 组件样式不符合设计规范的问题

### v1.0.0

**New Component**

- 新增 Button 按钮组件
- 新增 Layout 布局组件
- 新增 Icon 图标组件
- 新增 Rate 评分组件
- 新增 Stepper 步进器组件
- 新增 Currency 货币组件
