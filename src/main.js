import { createApp, h } from 'vue';
import App from './App.vue';
import getRouter from './router';
import { Buffer } from 'buffer';

window.wattspeedApp = createApp({
  render: () => h(App),
});

const initVue = () => {
  window.wattspeedRouter = getRouter();
  window.wattspeedApp.use(window.wattspeedRouter);

  const plugins = {
    install(app) {
      app.config.globalProperties.Buffer = window.Buffer || Buffer;
      app.config.globalProperties.intervalNormalization = (value, inMin, inMax, outMin, outMax, reverse) => {
        if (value === null || value === 0) return outMin || 0;

        const normalizedValue = ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
        return reverse ? outMax - normalizedValue : normalizedValue;
      };
      app.config.globalProperties.goTo = (routeName, permissionGranted) => {
        if (permissionGranted || permissionGranted === undefined) {
          const hrefURL = new URL(window.location.href);
          const keepQuery =
            ['home', 'score'].indexOf(routeName) === -1 &&
            hrefURL.searchParams.has('from') &&
            hrefURL.searchParams.get('from') === 'score';
          const queryParams = keepQuery ? { from: 'score' } : {};

          window.wattspeedRouter.push({ name: routeName, query: queryParams });
        }
      };
    },
  };
  window.wattspeedApp.use(plugins);
  window.wattspeedApp.mount('#app');
};

initVue();
