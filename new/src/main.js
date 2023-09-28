import { createApp, h } from 'vue';
import App from './App.vue';
import getRouter from './router';
import mitt from 'mitt';
import { Buffer } from 'buffer';
const emitter = mitt();

window.wattspeedApp = createApp({
  render: () => h(App),
});

const initVue = () => {
  window.wattspeedRouter = getRouter();
  window.wattspeedApp.use(window.wattspeedRouter);

  const plugins = {
    install(app) {
      app.config.globalProperties.$emitter = emitter;
      app.config.globalProperties.Buffer = window.Buffer || Buffer;
      app.config.globalProperties.goTo = (permissionGranted, routeName) => {
        if (permissionGranted) {
          window.wattspeedRouter.push(routeName);
        }
      };
    },
  };
  window.wattspeedApp.use(plugins);
  window.wattspeedApp.mount('#app');
};

initVue();
