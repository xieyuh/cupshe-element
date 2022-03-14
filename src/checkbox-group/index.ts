import { withInstall } from '../utils';
import _CheckboxGroup from './CheckboxGroup';

const CheckboxGroup = withInstall(_CheckboxGroup);

export default CheckboxGroup;
export { CheckboxGroup };
export type {
  CheckboxGroupInstance,
  CheckboxGroupToggleAllOptions,
} from './types';

declare module 'vue' {
  export interface GlobalComponents {
    CCheckboxGroup: typeof CheckboxGroup;
  }
}
