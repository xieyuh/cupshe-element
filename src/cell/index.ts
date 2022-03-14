import { withInstall } from '../utils';
import _Cell from './Cell';

const Cell = withInstall(_Cell);

export default Cell;
export { Cell };
export type { CellArrowDirection } from './Cell';

declare module 'vue' {
  export interface GlobalComponents {
    CCell: typeof Cell;
  }
}
