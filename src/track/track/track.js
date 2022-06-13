import { nextTick } from 'vue';
import { hasIntersectionObserver, eventType, eventKey, on } from './util';
import { noop } from '../../utils';

const DEFAULT_OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

export default class TrackClass {
  constructor({ onEvent = noop, observerOptions }) {
    this.options = {
      onEvent,
      observerOptions: observerOptions || DEFAULT_OBSERVER_OPTIONS,
    };
    this.initEvent();
    this.initIntersectionObserver();
  }

  initEvent() {
    this.emit = this.options.onEvent;
  }

  eventHandler(eventType, el) {
    const elKey = eventKey[eventType];

    this.options.onEvent(el[elKey], el);
  }

  /**
   * init IntersectionObserver
   * set mode to observer
   * @return
   */
  initIntersectionObserver() {
    if (!hasIntersectionObserver) {
      return;
    }

    this.observer = new IntersectionObserver(
      this.observerHandler.bind(this),
      this.options.observerOptions
    );
  }

  /**
   * init IntersectionObserver
   * @return
   */
  observerHandler(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.eventHandler(eventType.view, entry.target);
        return this.observer.unobserve(entry.target);
      }
    });
  }

  getEventHandler(el) {
    return () => {
      nextTick(() => {
        this.eventHandler(eventType.click, el);
      });
    };
  }

  add(el, binding) {
    if (!binding.arg) {
      return;
    }

    switch (binding.arg) {
      case eventType.click:
        el[eventKey.click] = binding.value;

        on(el, eventType.click, this.getEventHandler(el));
        break;
      case eventType.view:
        el[eventKey.view] = binding.value;

        this.observer && this.observer.observe(el);
        break;
    }
  }

  update(el, binding) {
    if (!binding.arg) {
      return;
    }

    switch (binding.arg) {
      case eventType.click:
        el[eventKey.click] = binding.value;

        break;
      case eventType.view:
        el[eventKey.view] = binding.value;

        break;
    }
  }
}
