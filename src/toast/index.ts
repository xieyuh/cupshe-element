import { Toast, ToastOptions } from './function-call';
import type { ToastType, ToastPosition } from './Toast';

export default Toast;
export { Toast };
export type { ToastType, ToastOptions, ToastPosition };

declare module 'vue' {
  export interface GlobalComponents {
    CToast: typeof Toast;
  }
}
