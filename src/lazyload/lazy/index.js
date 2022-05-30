import Lazy from './lazy';
import getDefaultOption from './option';

export const Lazyload = {
  /*
   * install function
   * @param  {App} app
   * @param  {object} options lazyload options
   */
  install(app, options = {}) {
    const LazyClass = Lazy();
    const lazy = new LazyClass(getDefaultOption(options));

    app.config.globalProperties.$Lazyload = lazy;

    app.directive('lazy', {
      beforeMount: lazy.add.bind(lazy),
      updated: lazy.update.bind(lazy),
      unmounted: lazy.remove.bind(lazy),
    });
  },
};
