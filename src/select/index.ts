import { withInstall } from '../utils';
import _Select from './Select';

const Select = withInstall<typeof _Select>(_Select);

export default Select;
export { Select };

declare module 'vue' {
  export interface GlobalComponents {
    CSelect: typeof Select;
  }
}
