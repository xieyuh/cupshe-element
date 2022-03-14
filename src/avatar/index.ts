import { withInstall } from '../utils';
import _Avatar from './Avatar';

const Avatar = withInstall(_Avatar);

export default Avatar;
export { Avatar };

declare module 'vue' {
  export interface GlobalComponents {
    CAvatar: typeof Avatar;
  }
}
