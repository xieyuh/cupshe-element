import { withInstall } from '../utils';
import _Collapse from './Collapse';

const Collapse = withInstall(_Collapse);

export default Collapse;
export { Collapse };
export { COLLAPSE_KEY } from './Collapse';

declare module 'vue' {
  export interface GlobalComponents {
    CCollapse: typeof Collapse;
  }
}
