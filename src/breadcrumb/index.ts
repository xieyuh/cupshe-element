import { withInstall } from '../utils';
import _Breadcrumb from './Breadcrumb';

const Breadcrumb = withInstall<typeof _Breadcrumb>(_Breadcrumb);

export default Breadcrumb;
export { Breadcrumb };

declare module 'vue' {
  export interface GlobalComponents {
    CBreadcrumb: typeof Breadcrumb;
  }
}
