import { withInstall } from '../utils';
import _CellGroup from './CellGroup';

const CellGroup = withInstall(_CellGroup);

export default CellGroup;
export { CellGroup };

declare module 'vue' {
  export interface GlobalComponents {
    CCellGroup: typeof CellGroup;
  }
}
