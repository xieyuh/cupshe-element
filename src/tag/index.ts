import { withInstall } from '../utils';
import _Tag from './Tag';

const Tag = withInstall(_Tag);

export default Tag;
export { Tag };

declare module 'vue' {
  export interface GlobalComponents {
    CTag: typeof Tag;
  }
}
