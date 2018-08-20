<template>
<div class="mainContent">
    <div class="sections">
      <tech-section></tech-section>
      <html5-section></html5-section>
      <speed-section></speed-section>
      <mobile-section></mobile-section>
      <mixed-section></mixed-section>
      <accesibility-section></accesibility-section>
    </div>
</div>
</template>

<script>
import Vue from "vue";
import BaseSection from "./../sections/base-section.vue";
import Tech from "./../sections/tech-section.vue";
import Html5 from "./../sections/html5-section.vue";
import Speed from "./../sections/speed-section.vue";
import Mobile from "./../sections/mobile-section.vue";
import Mixed from "./../sections/mixed-section.vue";
import Accesibility from "./../sections/accesibility-section.vue";

Vue.component("base-section", BaseSection);
Vue.component("tech-section", Tech);
Vue.component("html5-section", Html5);
Vue.component("speed-section", Speed);
Vue.component("mobile-section", Mobile);
Vue.component("mixed-section", Mixed);
Vue.component("accesibility-section", Accesibility);

export default {
  computed: {
    tab() {
      return this.$parent.tab;
    }
  },
  methods: {
    changePanel(tab) {
      this.$parent.changePanel(tab);
    }
  }
};
</script>


