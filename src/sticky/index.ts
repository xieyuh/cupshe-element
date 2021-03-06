import { withInstall } from '../utils';
import _Sticky from './Sticky';

const Sticky = withInstall(_Sticky);

export default Sticky;
export { Sticky };
export type { StickyPosition } from './Sticky';

declare module 'vue' {
  export interface GlobalComponents {
    CSticky: typeof Sticky;
  }
}
