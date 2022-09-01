import { withInstall } from '../utils';
import _Switch from './Switch';

export const Switch = withInstall(_Switch);
export default Switch;

declare module 'vue' {
  export interface GlobalComponents {
    CSwitch: typeof Switch;
  }
}
