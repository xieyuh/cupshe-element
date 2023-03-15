# 更新日志

### 介绍

cupshe-element 遵循 [Semver](https://semver.org/lang/zh-CN/) 语义化版本规范

## 更新内容

### v1.23.0

**Feature**

- Rate 组件新增了 icon 插槽

**Bug Fixes**

- 修复了表单中的 Input 无法触发 onBlur 检验的问题

### v1.21.5

**Feature**

- 增强了 `v-lazy` 指令，同时支持 avif 和 webp 图片格式转化

### v1.21.0

**New Component**

- 新增了 Dropdown 下拉组件

### v1.20.0

**New Component**

- 新增了 Switch 开关组件

### v1.19.0

**New Component**

- 新增了 Form 表单组件

### v1.18.0

**Feature**

- 增强了 `v-lazy` 指令。

### v1.17.0

**Feature**

- 新增了 `v-track` 指令。

### v1.16.3

**Bug Fixes**

- 修复 CollapseItem 组件的 `icon` 插槽的 `expanded` 参数永远为 `true` 的问题。

### v1.16.1

**Feature**

- 增加了所有组件的 typescript 定义

**Bug Fixes**

- 修正了所有组件在 768 像素下的表现

### v1.16.0

**Feature**

- Lazyload 指令新增了自动增加 webp 后缀的功能

### v1.15.4

**Feature**

- 新增了 `createCurrency` 工具函数

### v1.15.3

**Feature**

- Stepper 组件新增了 `disable-minus`，`disable-plus` 属性

### v1.15.2

**Bug Fixes**

- 修复了 Button 组件在 `loading` 状态仍能触发点击事件的问题

### v1.15.1

**Bug Fixes**

- 修复了 Lazyload 组件的引用路径问题

### v1.15.0

**Feature**

- 移除了无用的样式变量文件

### v1.14.4

**Feature**

- 新增所有组件的 `.d.ts` 文件
- Button 组件修改了 `small` 下的边距

**Doc**

- 增加了 Select 组件设定最大滚动高度的示例

### v1.14.3

**Bug Fixes**

- 修复了 Popover 组件的自定义内容点击时会触发关闭的问题

### v1.14.2

**Bug Fixes**

- 修复了 Popover 组件选项为 `disabled` 时仍能触发关闭的问题
- Popver 组件新增 `mouse-delay` 属性
- Popup 组件在 `position` 属性值为 `left` 或 `right` 时默认高度为 `100%`

### v1.14.1

**Bug Fixes**

- 修复了 Toast 组件的 `fail` 方法为空的问题

### v1.14.0

**New Component**

- 新增 ActionSheet 组件

### v1.13.0

**New Component**

- 新增 Image 组件
- 新增 ImagePreview 组件

### v1.10.0

**Feature**

- 移除了 `Muli` 系列字体文件

### v1.11.0

**New Component**

- 新增 ABTest 组件

**Feature**

- Select 组件 `reference` 插槽新增 `active` 参数

**Bug Fixes**

- 更新部分组件样式以符合设计稿

### v1.10.0

**New Component**

- 新增 Alert 组件
- 新增 Toast 组件

**Feature**

- Input 组件新增 `show-word-limit` 属性以在 `type` 为 `textarea` 时新增字数统计功能
- Select 组件新增 `error` 属性以显示错误时样式
- Popover 组件 `trigger` 属性新增 `hover` 可选值

### v1.9.0

**Feature**

- Input 组件新增 `required`, `error` 参数
- Tag 组件新增 `closeable` 参数
- Pagination 组件更新组件样式
- Button 组件更新禁用状态样式

### v1.8.12

**Bug Fixes**

- 修复了 Checkbox 和 Radio 在 safari 下图标大小问题
- Select 组件的 reference 插槽新增 match 参数

### v1.8.11

**Bug Fixes**

- 更新 Select 组件部分样式

### v1.8.10

**Bug Fixes**

- 去除 Input 在不同 `size` 属性下的高度

### v1.8.9

**Feature**

- 修改了 Pagination 箭头显示逻辑

### v1.8.8

**Feature**

- Select 组件新增 `defaultText` 属性

**Bug Fixes**

- 修复了 Select 组件的显示的不是 `text` 而是 `value` 的问题

## 更新内容

### v1.8.7

**Bug Fixes**

- 指定 Input 在不同 `size` 属性下的高度

### v1.8.6

**Feature**

- Input 组件新增 `size` 属性
- Select 组件新增 `reference` 插槽，新增 `placement`, `size`, `popperStyle` 属性

### v1.8.5

**Bug Fixes**

- 修复了 Input 无法手动设置 `value` 的问题

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

**Bug Fixes**

- 修复了 Select 通过点击控件不能切换开关状态的问题
- 修复了 Rate 图标行高问题

### v1.7.6

**Bug Fixes**

- Tag 组件选中状态字重从 `semi-bold` 调整到 `bold`

### v1.7.5

**Feature**

- Select 组件支持组件级和选项级的 `disabled` 属性

**Bug Fixes**

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

- Input 组件新增 `style` 属性用以自定义样式，新增 `onChange` 事件

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
