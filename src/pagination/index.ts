import { withInstall } from '../utils';
import _Pagination from './Pagination';

const Pagination = withInstall(_Pagination);

export default Pagination;
export { Pagination };

declare module 'vue' {
  export interface GlobalComponents {
    CPagination: typeof Pagination;
  }
}
