import { withInstall } from '../utils';
import _Icon from './Icon';

const Icon = withInstall(_Icon);

export default Icon;
export { Icon };

declare module 'vue' {
  export interface GlobalComponents {
    CIcon: typeof Icon;
  }
}
