import { withInstall } from '../utils';
import _Row from './Row';

const Row = withInstall(_Row);

export default Row;
export { Row };
export type { RowAlign, RowJustify } from './Row';

declare module 'vue' {
  export interface GlobalComponents {
    CRow: typeof Row;
  }
}
