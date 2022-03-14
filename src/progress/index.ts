import { withInstall } from '../utils';
import _Progress from './Progress';

const Progress = withInstall<typeof _Progress>(_Progress);

export default Progress;
export { Progress };

declare module 'vue' {
  export interface GlobalComponents {
    CProgress: typeof Progress;
  }
}
