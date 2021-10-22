import { withInstall } from '../utils';
import _ABTest from './ABTest';

const ABTest = withInstall<typeof _ABTest>(_ABTest);

export default ABTest;
export { ABTest };
