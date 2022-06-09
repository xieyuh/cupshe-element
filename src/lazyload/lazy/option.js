import { useRect } from '../../composables';
import { extend } from '../../utils';

const MIN_RECT_WIDTH = 100;

function getWebp(src, rectWidth) {
  if (typeof src !== 'string') {
    return src;
  }

  const w = Math.max(MIN_RECT_WIDTH, Math.floor(rectWidth * 1.5));
  const url = `x-oss-process=image/resize,w_${w}/format,webp`;
  const prefix = src.includes('?') ? '&' : '?';

  return prefix + url;
}

export default function getDefaultOption(option) {
  const defaultOption = {
    filter: {
      webp(listener) {
        listener.src += getWebp(listener.src, useRect(listener.el).width);
      },
    },
  };

  return extend(defaultOption, option);
}
