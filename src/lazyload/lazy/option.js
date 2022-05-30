import { useRect } from '../../composables';
import { extend } from '../../utils';

const DEFAULT_RECT_WIDTH = 300;

function getWebp(src, width) {
  const url = `x-oss-process=image/resize,w_${width}/format,webp`;
  const prefix = src.endsWith('?') ? '&' : '?';

  return prefix.concat(url);
}

export default function getDefaultOption(option) {
  const defaultOption = {
    filter: {
      webp(listener) {
        const { width } = useRect(listener.el);

        listener.src += getWebp(listener.src, width || DEFAULT_RECT_WIDTH);
      },
    },
  };

  return extend(defaultOption, option);
}
