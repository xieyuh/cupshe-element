import { useRect } from '../../composables';
import { extend } from '../../utils';

const DEFAULT_RECT_WIDTH = 200;

function getWebp(src, rectWidth = DEFAULT_RECT_WIDTH) {
  if (typeof src !== 'string') {
    return src;
  }

  const width = Math.floor(rectWidth * 1.5);
  const url = `x-oss-process=image/resize,w_${width}/format,webp`;
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
