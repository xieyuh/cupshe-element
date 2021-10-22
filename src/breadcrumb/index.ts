import { withInstall } from '../utils';
import _Breadcrumb from './Breadcrumb';

const Breadcrumb = withInstall<typeof _Breadcrumb>(_Breadcrumb);

export default Breadcrumb;
export { Breadcrumb };
