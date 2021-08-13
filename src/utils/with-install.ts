import { App } from 'vue';
import { camelize } from './format/string';

type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};

export type WithInstall<T> = T & {
  install(app: App): void;
} & EventShim;

export function withInstall<T>(options: any): WithInstall<T> {
  (options as Record<string, unknown>).install = (app: App) => {
    const { name } = options as any;
    app.component(name, options);
    app.component(camelize(`-${name}`), options);
  };

  return options;
}
