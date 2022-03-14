import { withInstall } from '../utils';
import _Popover from './Popover';

const Popover = withInstall<typeof _Popover>(_Popover);

export default Popover;
export { Popover };
export type {
  PopoverAction,
  PopoverTrigger,
  PopoverPlacement,
} from './Popover';

declare module 'vue' {
  export interface GlobalComponents {
    CPopover: typeof Popover;
  }
}
