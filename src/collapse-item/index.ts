import { withInstall } from '../utils';
import _CollapseItem from './CollapseItem';

const CollapseItem = withInstall(_CollapseItem);

export default CollapseItem;
export { CollapseItem };

declare module 'vue' {
  export interface GlobalComponents {
    CCollapseItem: typeof CollapseItem;
  }
}
