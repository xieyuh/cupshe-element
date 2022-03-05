import { withInstall } from '../utils';
import _ActionSheet from './ActionSheet';

const ActionSheet = withInstall(_ActionSheet);
export default ActionSheet;
export { ActionSheet };
export type { ActionSheetProps, ActionSheetAction } from './ActionSheet';

declare module 'vue' {
  export interface GlobalComponents {
    CActionSheet: typeof ActionSheet;
  }
}
