<template>
    <section-container>
      <accessibility-status :score="score" :issues="issues" :warnings="warnings" v-if="score != 100"></accessibility-status>
      <p v-else class="alert--success">
        No accessibility issues found.
      </p>
    </section-container>
</template>
<script>
const ACCESSIBILITY_URL =
  "https://cux80nnn5f.execute-api.us-east-1.amazonaws.com/dev/audit";

// const ACCESSIBILITY_URL = "http://localhost:3000/audit";

import Vue from "vue";
import BaseSection from "./base-section.vue";
import SectionContainer from "./section-container.vue";
import Status from "./../panels/tech/items/accessibility-status.vue";

Vue.component("section-container", SectionContainer);
Vue.component("accessibility-status", Status);

export default {
  mixins: [BaseSection],
  data() {
    return {
      panelName: "accessibility",
      title: "Accessibility",
      data: [],
      issues: 0,
      warnings: 0,
      score: 0,
      icon: "accessibility"
    };
  },
  mounted() {
    const request = new Request(`${ACCESSIBILITY_URL}?url=${this.tab.url}`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "x-api-key": process.env.ACCESSIBILITY_KEY
      }
    });
    this.makeRequest(request, data => {
      this.issues = data.issuesCount;
      this.score = data.score;
      this.data = data.issues;
      this.loading = false;
    });
  }
};
</script>
