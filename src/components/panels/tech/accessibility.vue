<template>
    <container>
      <template slot="header">
        <accessibility-status :score="score" :issues="issues" :warnings="warnings" v-if="score != 100"></accessibility-status>
        <h3 v-else class="text--success text--center text--strong mb0">
          No accessibility issues found.
        </h3>
      </template>

      <div v-if="data.length === 0" class="state">
        <svg viewBox="0 0 386.9 345.3" xmlns="http://www.w3.org/2000/svg" width="250">
          <path d="m121.7 215.3 54.5 54.5 120-120c14.1 19.7 22.5 43.9 22.5 70 0 66.6-53.9 120.5-120.5 120.5s-120.5-54-120.5-120.5 54-120.5 120.5-120.5c25.6 0 49.4 8 68.9 21.6" fill="none" stroke="#6ed499" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="10" class="state--success"/>
          <g class="state--sparks" style="transform-origin: center center">
            <path d="m157 23.5c-1.6 4.7-3 6.9-6.4 10.4-1.1-.9-1.7-1.4-2.8-2.3 2.3-3.5 3.1-5.5 3.6-9.5 2.2.5 3.3.8 5.6 1.4zm-71 79c-2.9 0-5.2 2.3-5.2 5.2s2.3 5.2 5.2 5.2 5.2-2.3 5.2-5.2-2.3-5.2-5.2-5.2zm155.4-60.5c0-2.1-1.7-3.7-3.7-3.7s-3.7 1.7-3.7 3.7c0 2.1 1.7 3.7 3.7 3.7s3.7-1.6 3.7-3.7zm113.5 92.9c-.4-3.7-3.7-6.3-7.3-5.9-3.7.4-6.3 3.7-5.9 7.3.4 3.7 3.7 6.3 7.3 5.9 3.7-.4 6.3-3.7 5.9-7.3z" fill="#ffd600"/>
            <path d="m336.8 103.3c-7.4 2.6-10.9 4.8-16.6 10.4-2.1-1.8-3.2-2.6-5.3-4.4 5.3-7.8 8.9-11.1 17.2-16 1.9 4 2.8 6 4.7 10zm-146.7-31.3c0-2.1-1.7-3.7-3.7-3.7-2.1 0-3.7 1.7-3.7 3.7s1.7 3.7 3.7 3.7 3.7-1.6 3.7-3.7zm-143.1-6.3c-.7-4-1.4-5.9-3.7-9.1-1 .6-1.5.9-2.5 1.4 1.3 3.1 1.7 4.8 1.6 8.1 1.9-.2 2.8-.3 4.6-.4zm4 85.9c-.2-1.8-1.8-3.1-3.7-2.9s-3.1 1.8-2.9 3.7c.2 1.8 1.8 3.1 3.7 2.9s3.1-1.8 2.9-3.7zm-30.9 91.4c10.8-.7 16.2-2.3 25.5-7.5-1.3-2.9-1.9-4.3-3.2-7.1-8.6 2.8-13.2 3.3-22.1 2.2 0 4.9-.1 7.4-.2 12.4z" fill="#f7931e"/>
            <path d="m205.3 0c1.1 7.8 2.6 11.6 7 18.3-2.1 1.8-3.2 2.6-5.3 4.4-6.6-6.7-9.2-10.9-12.3-20 4.2-1.1 6.3-1.6 10.6-2.7zm-95.5 2.6c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4 1 2.4 2.4 2.4 2.4-1 2.4-2.4zm184.2 21.9c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4 1.1 2.4 2.4 2.4c1.4 0 2.4-1.1 2.4-2.4zm-268.5 87.3c-6 3.5-8.6 5.9-12.4 11.5 1.5 1.3 2.3 1.9 3.9 3.2 4.1-4.1 6.6-5.6 12-7.5-1.5-2.9-2.2-4.3-3.5-7.2zm361.4 70.7c-9.4-5.3-14.8-6.9-25.5-7.7-.5 3.1-.7 4.6-1.2 7.7 8.7 2.4 12.9 4.5 19.6 10.3 2.9-4.1 4.3-6.2 7.1-10.3z" fill="#f93556"/>
            <path d="m110.5 74.3c-8.7-3.7-12.5-7-17.7-15 3.6-1.9 5.5-2.9 9.1-4.8 2.8 6.9 5.3 10 11.6 14.2-1.2 2.2-1.8 3.4-3 5.6zm178.8-11.6c-3.4 3.6-5.5 5-10.2 6.9.5 1.7.7 2.5 1.2 4.2 5.8-1.1 8.7-2.3 13.6-5.8-1.9-2.1-2.8-3.2-4.6-5.3zm-108.4-49.2c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4 1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4zm204 89.3c-.2-2.1-2.1-3.5-4.1-3.3-2.1.2-3.5 2.1-3.3 4.1s2.1 3.5 4.1 3.3 3.5-2 3.3-4.1zm-384.6 85.7c-.8 2.2.3 4.6 2.5 5.4s4.6-.3 5.4-2.5-.3-4.6-2.5-5.4-4.6.3-5.4 2.5z" fill="#7ddafb"/>
          </g>
        </svg>
      </div>
      <accessibility-item v-for="item in data" :data="item" :key="item.title"></accessibility-item>
    </container>
</template>
<script>
import Vue from "vue";
import Container from "./container";
import Item from "./items/accessibility-item";
Vue.component("container", Container);
Vue.component("accessibility-item", Item);

import AccessibilitySection from "./../../sections/accesibility-section.vue";

export default {
  mixins: [AccessibilitySection],
  data() {
    return {
      desc:
        "The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect. (Tim Berners-Lee, W3C Director and inventor of the World Wide Web)"
    };
  }
};
</script>
