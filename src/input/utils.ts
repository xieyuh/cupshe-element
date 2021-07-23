import { trigger } from '../utils';

export function startComposing(event: Event) {
  (event.target as any).composing = true;
}

export function endComposing(event: Event) {
  const { target } = event;
  if ((target as any).composing) {
    (target as any).composing = false;
    trigger(target as Element, 'input');
  }
}
