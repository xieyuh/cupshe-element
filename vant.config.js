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
    hideSimulator: true,
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
            path: 'pagination',
            title: 'Pagination 分页',
          },
          {
            path: 'lazyload',
            title: 'Lazyload 懒加载',
          },
          {
            path: 'overlay',
            title: 'Overlay 遮罩层',
          },
          {
            path: 'stepper',
            title: 'Stepper 步进器',
          },
          {
            path: 'popup',
            title: 'Popup 弹出层',
          },
          // {
          //   path: 'col',
          //   title: 'Layout 布局',
          // },
          // {
          //   path: 'rate',
          //   title: '评分'
          // }
        ],
      },
    ],
  },
};
