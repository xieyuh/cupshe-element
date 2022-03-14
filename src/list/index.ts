import { withInstall } from '../utils';
import _List from './List';

const List = withInstall(_List);

export default List;
export { List };
export type { ListInstance, ListDirection } from './types';

declare module 'vue' {
  export interface GlobalComponents {
    CList: typeof List;
  }
}
