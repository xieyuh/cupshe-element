import { extend } from '../../utils';
import { format } from './format';

export default function getDefaultOption(option) {
  const defaultOption = {
    filter: {
      format,
    },
  };

  return extend(defaultOption, option);
}
