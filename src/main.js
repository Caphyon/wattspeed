import 'core-js/fn/string/includes/'
import Vue from "vue";
import App from "./app.vue";

window.EventBus = new Vue();

new Vue({
  el: "#app",
  render: h => h(App)
});
