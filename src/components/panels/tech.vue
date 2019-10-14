<template>
  <div class="mainContent">
    <template v-if="requestLimit">
      <p class="text--center text--danger">
        You have reached you request quota per hour, try again later :)
      </p>
    </template>
    <div v-else class="sections">
        <tech-section></tech-section>
        <html5-section @tooManyRequets="handleTooManyRequests"></html5-section>
        <performance-section @tooManyRequets="handleTooManyRequests"></performance-section>
        <mobile-section @tooManyRequets="handleTooManyRequests"></mobile-section>
        <mixed-section></mixed-section>
        <accesibility-section @tooManyRequets="handleTooManyRequests"></accesibility-section>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BaseSection from "./../sections/base-section.vue";
import Tech from "./../sections/tech-section.vue";
import Html5 from "./../sections/html5-section.vue";
import Performance from "./../sections/performance-section.vue";
import Mobile from "./../sections/mobile-section.vue";
import Mixed from "./../sections/mixed-section.vue";
import Accesibility from "./../sections/accesibility-section.vue";

Vue.component("base-section", BaseSection);
Vue.component("tech-section", Tech);
Vue.component("html5-section", Html5);
Vue.component("performance-section", Performance);
Vue.component("mobile-section", Mobile);
Vue.component("mixed-section", Mixed);
Vue.component("accesibility-section", Accesibility);

export default {
  data: function(){
    return {
      requestLimit: false
    }
  },
  computed: {
    tab() {
      return this.$parent.tab;
    }
  },
  methods: {
    changePanel(tab) {
      this.$parent.changePanel(tab);
    },
    handleTooManyRequests(){
      this.requestLimit = true;
    }
  }
};
</script>
