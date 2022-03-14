import { withInstall } from '../utils';
import _Radio from './Radio';

const Radio = withInstall<typeof _Radio>(_Radio);

export default Radio;
export { Radio };

declare module 'vue' {
  export interface GlobalComponents {
    CRadio: typeof Radio;
  }
}
