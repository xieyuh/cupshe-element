import { withInstall } from '../utils';
import _Image from './Image';

export const Image = withInstall(_Image);
export default Image;
export type { ImageFit } from './Image';

declare module 'vue' {
  export interface GlobalComponents {
    CImage: typeof Image;
  }
}
