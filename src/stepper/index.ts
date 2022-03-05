import { withInstall } from '../utils';
import _Stepper from './Stepper';

export const Stepper = withInstall(_Stepper);
export default Stepper;

declare module 'vue' {
  export interface GlobalComponents {
    CStepper: typeof Stepper;
  }
}
