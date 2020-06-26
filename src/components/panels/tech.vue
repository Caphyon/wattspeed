<template>
  <div class="mainContent">
    <template v-if="requestLimit">
      <div class="quota-exceeded">
        <h3 class="text--center text--danger text--strong">
          You have reached your request quota per hour, try again later.
        </h3>
        <svg class="watch" width="200" height="200" viewBox="0 0 185 185" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M92.5 185C143.586 185 185 143.586 185 92.5C185 41.4137 143.586 0 92.5 0C41.4137 0 0 41.4137 0 92.5C0 143.586 41.4137 185 92.5 185Z" fill="url(#paint0_linear)"/>
          <path d="M174.4 92.2998C174.4 137.3 137.9 173.8 92.8999 173.8C47.8999 173.8 11.3999 137.3 11.3999 92.2998C11.3999 47.2998 47.8999 10.7998 92.8999 10.7998C137.9 10.7998 174.4 47.1998 174.4 92.2998Z" stroke="url(#paint2_linear)" stroke-width="2" fill="none"/>
          <path d="M92.8999 161.8C131.284 161.8 162.4 130.684 162.4 92.2998C162.4 53.916 131.284 22.7998 92.8999 22.7998C54.5161 22.7998 23.3999 53.916 23.3999 92.2998C23.3999 130.684 54.5161 161.8 92.8999 161.8Z" stroke="url(#paint1_linear)" stroke-width="2" fill="none"/>
          <path opacity="0.5" d="M92.6001 92.7002V42.7002" stroke="white" stroke-width="2" stroke-linecap="round" class="line"/>
          <path opacity="0.5" d="M112.6 113.3L92.6001 92.7998" stroke="white" stroke-width="2" stroke-linecap="round" class="line line--alt"/>
          <path d="M92.5 97.5C95.2614 97.5 97.5 95.2614 97.5 92.5C97.5 89.7386 95.2614 87.5 92.5 87.5C89.7386 87.5 87.5 89.7386 87.5 92.5C87.5 95.2614 89.7386 97.5 92.5 97.5Z" fill="white"/>
          <defs>
          <linearGradient id="paint0_linear" x1="92.5" y1="0" x2="92.5" y2="322.5" gradientUnits="userSpaceOnUse">
          <stop stop-opacity="0"/>
          <stop offset="1"/>
          </linearGradient>
          <linearGradient id="paint1_linear" x1="92.55" y1="162.749" x2="93.05" y2="54.2491" gradientUnits="userSpaceOnUse">
          <stop stop-color="#fff"/>
          <stop offset="1" stop-color="#fff" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="paint2_linear" x1="93.255" y1="9.7507" x2="92.67" y2="136.719" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FF8282"/>
          <stop offset="1" stop-color="#FF8282" stop-opacity="0"/>
          </linearGradient>
          </defs>
      </svg>
      </div>
    </template>
    <div v-else class="sections">
        <tech-section @tooManyRequests="handleTooManyRequests"></tech-section>
        <html5-section @tooManyRequests="handleTooManyRequests"></html5-section>
        <performance-section @tooManyRequests="handleTooManyRequests"></performance-section>
        <mobile-section @tooManyRequests="handleTooManyRequests"></mobile-section>
        <mixed-section @tooManyRequests="handleTooManyRequests"></mixed-section>
        <accesibility-section @tooManyRequests="handleTooManyRequests"></accesibility-section>
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
