import { inBrowser } from '../../utils';

export const hasIntersectionObserver =
  inBrowser &&
  'IntersectionObserver' in window &&
  'IntersectionObserverEntry' in window &&
  'intersectionRatio' in window.IntersectionObserverEntry.prototype;

export const eventType = {
  click: 'click',
  view: 'view',
};

export const eventKey = {
  click: 'track::click',
  view: 'track::view',
};

export function on(el, type, func) {
  el.addEventListener(type, func, {
    capture: false,
    passive: true,
  });
}
