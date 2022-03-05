import { withInstall } from '../utils';
import _SwipeItem from './SwipeItem';

const SwipeItem = withInstall<typeof _SwipeItem>(_SwipeItem);

export default SwipeItem;
export { SwipeItem };

declare module 'vue' {
  export interface GlobalComponents {
    CSwipeItem: typeof SwipeItem;
  }
}
