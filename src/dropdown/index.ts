import { withInstall } from '../utils';
import _Dropdown, { DropdownProps } from './Dropdown';

export const DropdownMenu = withInstall(_Dropdown);
export default DropdownMenu;
export type { DropdownProps };
export type { DropdownDirection } from './types';

declare module 'vue' {
  export interface GlobalComponents {
    CDropdown: typeof DropdownMenu;
  }
}
