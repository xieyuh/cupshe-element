import { withInstall } from '../utils';
import _CollapseItem from './CollapseItem';

const CollapseItem = withInstall<typeof _CollapseItem>(_CollapseItem);

export default CollapseItem;
export { CollapseItem };

declare module 'vue' {
  export interface GlobalComponents {
    CCollapseItem: typeof CollapseItem;
  }
}
