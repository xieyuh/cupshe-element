import { withInstall } from '../utils';
import _Form, { FormProps } from './Form';

const Form = withInstall(_Form);
export default Form;
export { Form };
export type { FormProps };
export type { FormInstance } from './types';

declare module 'vue' {
  export interface GlobalComponents {
    CForm: typeof Form;
  }
}
