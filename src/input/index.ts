import { withInstall } from '../utils';
import _Input from './Input';

const Input = withInstall<typeof _Input>(_Input);

export default Input;
export { Input };
export type { InputType, InputSize } from './shared';
