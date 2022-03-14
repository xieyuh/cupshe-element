import { withInstall } from '../utils';
import _Checkbox from './Checkbox';

const Checkbox = withInstall(_Checkbox);

export default Checkbox;
export { Checkbox };
export type { CheckboxInstance } from './types';

declare module 'vue' {
  export interface GlobalComponents {
    CCheckbox: typeof Checkbox;
  }
}
