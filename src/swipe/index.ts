import { withInstall } from '../utils';
import _Swipe from './Swipe';

const Swipe = withInstall(_Swipe);

export default Swipe;
export { Swipe };
export type { SwipeInstance, SwipeToOptions } from './types';

declare module 'vue' {
  export interface GlobalComponents {
    CSwipe: typeof Swipe;
  }
}
