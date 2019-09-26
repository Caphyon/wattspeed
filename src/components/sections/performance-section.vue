<template>
    <section-container>
      <div class="section__header--stats px2 py1">
        <performance-score :score="mobileScore" type="Mobile"></performance-score>
        <performance-score :score="desktopScore" type="Desktop"></performance-score>
      </div>
    </section-container>
</template>
<script>
const PAGE_SPEED_URL =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

import Vue from "vue";
import BaseSection from "./base-section.vue";
import SectionContainer from "./section-container.vue";
import PerformanceScore from "../panels/tech/items/performance-score.vue";

Vue.component("section-container", SectionContainer);
Vue.component("performance-score", PerformanceScore);

export default {
  mixins: [BaseSection],
  data() {
    return {
      title: "Performance",
      panelName: "performance",
      data: {},
      icon: "pagespeed",
      essentialData: {}
    };
  },
  mounted() {
    this.getPerformance("mobile");
    this.getPerformance("desktop");

    EventBus.$on("refreshData", () => {
      this.getPerformance("mobile");
      this.getPerformance("desktop");
    });
  },
  methods: {
    getPerformance(strategy) {
      this.loading = true;
      const request = new Request(
        encodeURI(`${PAGE_SPEED_URL}?url=${this.tab.url}&strategy=${strategy}`),
        {
          method: "GET"
        }
      );
      this.makeRequest(request, data => {
        let temp = [];

        this.essentialData[strategy] = data.lighthouseResult.categories.performance.auditRefs;
        this.essentialData[strategy].forEach(element => {
          if (data.lighthouseResult.audits[element.id].score != null) {
            temp.push(data.lighthouseResult.audits[element.id]);
          }
        });

        this.essentialData[strategy] = temp
        this.data[strategy] = data;
        if (this.data.desktop && this.data.mobile) this.loading = false;
      });
    }
  },
  computed: {
    mobileScore() {
      if (this.loading || !this.data) return 0;
      return this.data.mobile.lighthouseResult.categories.performance.score;
    },
    desktopScore() {
      if (this.loading || !this.data) return 0;
      return this.data.desktop.lighthouseResult.categories.performance.score;
    }
  }
};
</script>

<style lang="scss" scoped>
  .section__header--stats {
    display: flex;
}
</style>
