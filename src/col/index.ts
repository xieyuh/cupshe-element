import { withInstall } from '../utils';
import _Col from './Col';

const Col = withInstall(_Col);

export default Col;
export { Col };

declare module 'vue' {
  export interface GlobalComponents {
    CCol: typeof Col;
  }
}
