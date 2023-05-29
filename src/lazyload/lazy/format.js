import { supportWebp, supportAvif } from './util';
import { useRect } from '../../composables';

const signature = '?x-oss-process=image/';

const modifiers = {
  q: (q = 100) => `quality,q_${q}`,
  w: (w) => `resize,w_${w}`,
};

const modes = [
  { suffix: 'format,avif', support: supportAvif },
  { suffix: 'format,webp', support: supportWebp },
];

export function addSuffix(args) {
  const buffer = [];

  const mode = modes.find((m) => m.support());

  if (mode) {
    buffer.push(mode.suffix);
  }

  Object.keys(modifiers).forEach((key) => {
    buffer.push(modifiers[key](args[key]));
  });

  return signature + buffer.join('/');
}

export function format(listener, args = {}) {
  if (listener.src && listener.src.includes('.gif')) return;

  if (!args.w) {
    const { width } = useRect(listener.el);
    args.w = Math.floor(Math.max(300, width * 1.5));
  }

  listener.src += addSuffix(args);
}
