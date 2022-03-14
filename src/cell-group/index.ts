import { withInstall } from '../utils';
import _CellGroup from './CellGroup';

const CellGroup = withInstall<typeof _CellGroup>(_CellGroup);

export default CellGroup;
export { CellGroup };

declare module 'vue' {
  export interface GlobalComponents {
    CCellGroup: typeof CellGroup;
  }
}
