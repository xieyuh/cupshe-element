import { HTMLAttributes, InputHTMLAttributes } from 'vue';
import { getRootScrollTop, isObject, setRootScrollTop } from '../utils';
import { AutoSizeConfig, InputType } from './shared';

export function startComposing(event: Event) {
  (event.target as any).composing = true;
}

export function endComposing({ target }: Event) {
  if (target!.composing) {
    target!.composing = false;
    target!.dispatchEvent(new Event('input'));
  }
}

export function resizeTextarea(
  input: HTMLInputElement,
  autosize: true | AutoSizeConfig
) {
  const scrollTop = getRootScrollTop();
  input.style.height = 'auto';

  let height = input.scrollHeight;
  if (isObject(autosize)) {
    const { maxHeight, minHeight } = autosize;
    if (maxHeight !== undefined) {
      height = Math.min(height, maxHeight);
    }
    if (minHeight !== undefined) {
      height = Math.max(height, minHeight);
    }
  }

  if (height) {
    input.style.height = `${height}px`;
    setRootScrollTop(scrollTop);
  }
}

export function mapInputType(
  type: InputType
): {
  type: InputHTMLAttributes['type'];
  inputmode?: HTMLAttributes['inputmode'];
} {
  if (type === 'number') {
    return {
      type: 'text',
      inputmode: 'decimal',
    };
  }

  if (type === 'digit') {
    return {
      type: 'tel',
      inputmode: 'numeric',
    };
  }

  return { type };
}
