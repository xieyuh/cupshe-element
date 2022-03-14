import { withInstall } from '../utils';
import _Overlay from './Overlay';

const Overlay = withInstall(_Overlay);

export default Overlay;
export { Overlay };

declare module 'vue' {
  export interface GlobalComponents {
    COverlay: typeof Overlay;
  }
}
