import { extend } from '../../utils';
import { webp } from './webp';

export default function getDefaultOption(option) {
  const defaultOption = {
    filter: {
      webp,
    },
  };

  return extend(defaultOption, option);
}
