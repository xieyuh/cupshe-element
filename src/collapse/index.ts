import { withInstall } from '../utils';
import _Collapse from './Collapse';

const Collapse = withInstall<typeof _Collapse>(_Collapse);

export default Collapse;
export { Collapse };
export { COLLAPSE_KEY } from './Collapse';
