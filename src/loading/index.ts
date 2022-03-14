import { withInstall } from '../utils';
import _Loading from './Loading';

export const Loading = withInstall(_Loading);
export default Loading;

declare module 'vue' {
  export interface GlobalComponents {
    CLoading: typeof Loading;
  }
}
