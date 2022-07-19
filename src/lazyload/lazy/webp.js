import { useRect } from '../../composables';

const signature = '?x-oss-process=image/format,webp/';

const modifiers = {
  q: (q = 100) => `quality,q_${q}`,
  w: (w, el) => {
    if (!w) {
      const { width } = useRect(el);
      w = Math.max(300, width * 1.5);
      w = Math.floor(w);
    }

    return `resize,w_${w}`;
  },
};

export function webp(listener, args = {}, options) {
  if (options.supportWebp) {
    const buffer = [];

    Object.keys(modifiers).forEach((key) => {
      buffer.push(modifiers[key](args[key], listener.el));
    });

    listener.src += signature + buffer.join('/');
  }
}
