module.exports = {
  name: 'cupshe-element',
  build: {
    css: {
      preprocessor: 'less',
    },
    site: {
      publicPath: '/',
    },
  },
  site: {
    title: 'cupshe-element',
    logo:
      'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/cupshe_32x32.png?v=1578467710',
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
          {
            path: 'changelog',
            title: '更新日志',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'button',
            title: 'Button 按钮',
          },
          {
            path: 'icon',
            title: 'Icon 图标',
          },
          {
            path: 'popup',
            title: 'Popup 弹出层',
          },
          {
            path: 'style',
            title: 'Style 内置样式',
          },
          {
            path: 'col',
            title: 'Layout 布局',
          },
        ],
      },
      {
        title: '表单组件',
        items: [
          {
            path: 'checkbox',
            title: 'Checkbox 复选框',
          },
          {
            path: 'radio',
            title: 'Radio 单选框',
          },
          {
            path: 'rate',
            title: 'Rate 评分',
          },
          {
            path: 'stepper',
            title: 'Stepper 步进器',
          },
          {
            path: 'input',
            title: 'Input 输入框',
          },
          {
            path: 'select',
            title: 'Select 选择器',
          },
        ],
      },
      {
        title: '展示组件',
        items: [
          {
            path: 'swipe',
            title: 'Swipe 轮播图',
          },
          {
            path: 'avatar',
            title: 'Avatar 头像',
          },
          {
            path: 'popover',
            title: 'Popover 气泡弹出框',
          },
          {
            path: 'currency',
            title: 'Currency 货币',
          },
          {
            path: 'progress',
            title: 'Progress 进度条',
          },
          {
            path: 'tag',
            title: 'Tag 标签',
          },
          {
            path: 'collapse',
            title: 'Collapse 折叠面板',
          },
        ],
      },
      {
        title: '导航组件',
        items: [
          {
            path: 'pagination',
            title: 'Pagination 分页器',
          },
        ],
      },
      {
        title: '反馈组件',
        items: [
          {
            path: 'overlay',
            title: 'Overlay 遮罩层',
          },
        ],
      },
    ],
  },
};
