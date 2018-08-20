<template>
    <section-container>
      <div class="section__header--stats">
        <speed-score :score="mobileScore" type="Mobile"></speed-score>
        <speed-score :score="desktopScore" type="Desktop"></speed-score>
      </div>
    </section-container>
</template>
<script>
const PAGE_SPEED_URL =
  "https://www.googleapis.com/pagespeedonline/v2/runPagespeed";

import Vue from "vue";
import BaseSection from "./base-section.vue";
import SectionContainer from "./section-container.vue";
import SpeedScore from "./../panels/tech/items/speed-score.vue";

Vue.component("section-container", SectionContainer);
Vue.component("speed-score", SpeedScore);

export default {
  mixins: [BaseSection],
  data() {
    return {
      title: "Page Speed Insights",
      panelName: "speed",
      data: {},
      icon: "pagespeed"
    };
  },
  mounted() {
    this.getSpeed("mobile");
    this.getSpeed("desktop");
  },
  methods: {
    getSpeed(strategy) {
      const request = new Request(
        encodeURI(`${PAGE_SPEED_URL}?url=${this.tab.url}&strategy=${strategy}`),
        {
          method: "GET"
        }
      );
      this.makeRequest(request, data => {
        this.data[strategy] = data;
        if (this.data.desktop && this.data.mobile) this.loading = false;
      });
    }
  },
  computed: {
    mobileScore() {
      if (this.loading || !this.hasData) return 0;
      return this.data.mobile.ruleGroups.SPEED.score;
    },
    desktopScore() {
      if (this.loading || !this.hasData) return 0;
      return this.data.desktop.ruleGroups.SPEED.score;
    }
  }
};
</script>

<style lang="scss" scoped>
  .section__header--stats {
    display: flex;
  }
</style>