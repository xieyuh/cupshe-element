import { useRect } from '../../composables';

const signature = '?x-oss-process=image/format,webp/';

const modifiers = {
  q: (q = 100) => `quality,q_${q}`,
  w: (w) => `resize,w_${w}`,
};

export function generateWebp(args) {
  const buffer = [];

  Object.keys(modifiers).forEach((key) => {
    buffer.push(modifiers[key](args[key]));
  });

  return signature + buffer.join('/');
}

export function webp(listener, args = {}, options) {
  if (options.supportWebp) {
    if (!args.w) {
      const { width } = useRect(listener.el);
      args.w = Math.max(300, width * 1.5);
      args.w = Math.floor(args.w);
    }

    listener.src += generateWebp(args);
  }
}
