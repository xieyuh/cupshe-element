import { withInstall } from '../utils';
import _Progress from './Progress';

const Progress = withInstall(_Progress);

export default Progress;
export { Progress };

declare module 'vue' {
  export interface GlobalComponents {
    CProgress: typeof Progress;
  }
}
