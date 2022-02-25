const defaultOptions = {
  selector: 'img',
};

export class LazyContainer {
  constructor({ el, binding, vnode, lazy }) {
    this.el = null;
    this.vnode = vnode;
    this.binding = binding;
    this.options = {};
    this.lazy = lazy;

    this.queue = [];
    this.update({ el, binding });
  }

  update({ el, binding }) {
    this.el = el;
    this.options = { ...defaultOptions, ...binding.value };

    const imgs = this.getImgs();
    imgs.forEach((el) => {
      this.lazy.add(
        el,
        {
          ...this.binding,
          value: {
            src: 'dataset' in el ? el.dataset.src : el.getAttribute('data-src'),
            error:
              ('dataset' in el
                ? el.dataset.error
                : el.getAttribute('data-error')) || this.options.error,
            loading:
              ('dataset' in el
                ? el.dataset.loading
                : el.getAttribute('data-loading')) || this.options.loading,
          },
        },
        this.vnode
      );
    });
  }

  getImgs() {
    return Array.from(this.el.querySelectorAll(this.options.selector));
  }

  clear() {
    const imgs = this.getImgs();
    imgs.forEach((el) => this.lazy.remove(el));

    this.vnode = null;
    this.binding = null;
    this.lazy = null;
  }
}
