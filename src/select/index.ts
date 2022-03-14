import { withInstall } from '../utils';
import _Select from './Select';

const Select = withInstall(_Select);

export default Select;
export { Select };

declare module 'vue' {
  export interface GlobalComponents {
    CSelect: typeof Select;
  }
}
