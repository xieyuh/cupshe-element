import { withInstall } from '../utils';
import _RadioGroup from './RadioGroup';

const RadioGroup = withInstall(_RadioGroup);

export default RadioGroup;
export { RadioGroup };

declare module 'vue' {
  export interface GlobalComponents {
    CRadioGroup: typeof RadioGroup;
  }
}
