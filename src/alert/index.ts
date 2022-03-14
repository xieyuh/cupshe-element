import { withInstall } from '../utils';
import _Alert from './Alert';

const Alert = withInstall<typeof _Alert>(_Alert);

export default Alert;
export { Alert };
export type { AlertType } from './Alert';

declare module 'vue' {
  export interface GlobalComponents {
    CAlert: typeof Alert;
  }
}
