import { withInstall } from '../utils';
import _Popup from './Popup';

const Popup = withInstall(_Popup);

export default Popup;
export { Popup };
export type { PopupPosition, PopupCloseIconPosition } from './Popup';

declare module 'vue' {
  export interface GlobalComponents {
    CPopup: typeof Popup;
  }
}
