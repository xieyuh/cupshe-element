import { withInstall } from '../utils';
import _FormItem, { FormItemProps } from './FormItem';

const FormItem = withInstall(_FormItem);
export default FormItem;
export { FormItem };
export type { FormItemProps };
export type {
  FormValidateStatus,
  FormValidateTrigger,
  FormValidateError,
  FormLayout,
  FormAlign,
} from './types';

declare module 'vue' {
  export interface GlobalComponents {
    CFormItem: typeof FormItem;
  }
}
