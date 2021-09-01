import { withInstall } from '../utils';
import _Input, { InputSize } from './Input';

const Input = withInstall<typeof _Input>(_Input);

export default Input;
export { Input, InputSize };
export { InputType } from './shared';
