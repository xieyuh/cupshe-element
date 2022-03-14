import { Dialog, DialogOptions } from './function-call';
import type { DialogMessage } from './Dialog';

export default Dialog;
export { Dialog };
export type { DialogMessage, DialogOptions };

declare module 'vue' {
  export interface GlobalComponents {
    CDialog: typeof Dialog;
  }
}
