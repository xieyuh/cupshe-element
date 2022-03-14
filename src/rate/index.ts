import { withInstall } from '../utils';
import _Rate from './Rate';

const Rate = withInstall(_Rate);

export default Rate;
export { Rate };

declare module 'vue' {
  export interface GlobalComponents {
    CRate: typeof Rate;
  }
}
