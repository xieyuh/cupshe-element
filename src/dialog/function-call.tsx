import { App, CSSProperties, TeleportProps } from 'vue';
import {
  extend,
  inBrowser,
  withInstall,
  Interceptor,
  ComponentInstance,
} from '../utils';
import { mountComponent, usePopupState } from '../utils/mount-component';
import CDialog, { DialogAction, DialogMessage } from './Dialog';

export type DialogOptions = {
  title?: string;
  width?: string | number;
  closeable?: boolean;
  message?: DialogMessage;
  overlay?: boolean;
  teleport?: TeleportProps['to'];
  className?: unknown;
  allowHtml?: boolean;
  lockScroll?: boolean;
  transition?: string;
  beforeClose?: Interceptor;
  overlayClass?: string;
  overlayStyle?: CSSProperties;
  closeOnPopstate?: boolean;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  closeOnClickOverlay?: boolean;
};

let instance: ComponentInstance;

function initInstance() {
  const Wrapper = {
    setup() {
      const { state, toggle } = usePopupState();
      return () => <CDialog {...state} {...{ 'onUpdate:show': toggle }} />;
    },
  };

  ({ instance } = mountComponent(Wrapper));
}

function Dialog(options: DialogOptions) {
  if (!inBrowser) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance();
    }

    instance.open(
      extend({}, Dialog.currentOptions, options, {
        callback: (action: DialogAction) => {
          (action === 'confirm' ? resolve : reject)(action);
        },
      })
    );
  });
}

Dialog.defaultOptions = {
  title: '',
  width: '',
  message: '',
  closeable: false,
  overlay: true,
  callback: null,
  teleport: 'body',
  className: '',
  allowHtml: false,
  lockScroll: true,
  transition: 'c-dialog-bounce',
  beforeClose: null,
  overlayClass: '',
  overlayStyle: undefined,
  cancelButtonText: 'CANCEL',
  confirmButtonText: 'CONFIRM',
  showConfirmButton: true,
  showCancelButton: false,
  closeOnPopstate: true,
  closeOnClickOverlay: false,
};

Dialog.currentOptions = extend({}, Dialog.defaultOptions);

Dialog.alert = Dialog;

Dialog.confirm = (options: DialogOptions) =>
  Dialog(extend({ showCancelButton: true }, options));

Dialog.close = () => {
  if (instance) {
    instance.toggle(false);
  }
};

Dialog.setDefaultOptions = (options: DialogOptions) => {
  extend(Dialog.currentOptions, options);
};

Dialog.resetDefaultOptions = () => {
  Dialog.currentOptions = extend({}, Dialog.defaultOptions);
};

Dialog.Component = withInstall(CDialog);

Dialog.install = (app: App) => {
  app.use(Dialog.Component);
  app.config.globalProperties.$dialog = Dialog;
};

export { Dialog };
