import TrackClass from './track';

export const Track = {
  /*
   * install function
   * @param  {App} app
   * @param  {object} options track options
   */
  install(app, options = {}) {
    const track = new TrackClass(options);

    app.config.globalProperties.$track = track;

    app.directive('track', {
      beforeMount: track.add.bind(track),
      updated: track.update.bind(track),
    });
  },
};
