import { withInstall } from '../utils';
import _Image from './Image';

export const Image = withInstall<typeof _Image>(_Image);
export default Image;
export type { ImageFit } from './Image';
