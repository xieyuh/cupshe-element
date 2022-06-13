import type { App } from 'vue';

declare type EventCallback<T = any> = (data: any, el: T) => void;

export declare type TrackOptions = {
  onEvent: EventCallback;
};

export declare const Track: {
  install(app: App, options?: TrackOptions): void;
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $track: {
      emit: EventCallback;
    };
  }
}
