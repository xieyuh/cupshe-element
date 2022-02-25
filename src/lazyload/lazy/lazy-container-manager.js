import { remove } from './util';
import { LazyContainer } from './lazy-container';

export default class LazyContainerManager {
  constructor({ lazy }) {
    this.lazy = lazy;
    this.queue = [];
  }

  bind(el, binding, vnode) {
    const container = new LazyContainer({
      el,
      binding,
      vnode,
      lazy: this.lazy,
    });
    this.queue.push(container);
  }

  update(el, binding, vnode) {
    const container = this.queue.find((item) => item.el === el);
    if (!container) return;
    container.update({ el, binding, vnode });
  }

  unbind(el) {
    const container = this.queue.find((item) => item.el === el);
    if (!container) return;
    container.clear();
    remove(this.queue, container);
  }
}
