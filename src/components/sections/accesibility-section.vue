<template>
    <section-container>
      <accessibility-status :score="score" :issues="issues" :warnings="warnings" v-if="score != 100"></accessibility-status>
      <p v-else class="alert--success">
        No accessibility issues found.
      </p>
    </section-container>
</template>
<script>
const ACCESSIBILITY_URL = "https://tenon.io/api/";

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
    const request = new Request(ACCESSIBILITY_URL, {
      method: "POST",
      body: `key=${process.env.TENON_KEY}&url=${this.tab.url}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    this.makeRequest(request, data => {
      this.issues += data.resultSummary.issues.totalErrors || 0;
      this.warnings += data.resultSummary.issues.totalWarnings || 0;
      const tests = data.resultSummary.tests;
      this.score = (tests.passing / tests.total * 100).toFixed(0) || 0;
      if (data.resultSet) data.resultSet.forEach(this.addResult);
      this.data = this.data.filter(v => !!v);
      this.loading = false;
    });
  },
  methods: {
    addResult(result) {
      let obj = this.data[result.bpID];
      if (obj) {
        obj.snippets.push(result.errorSnippet);
        return;
      }
      obj = {};
      obj["title"] = result.errorTitle;
      obj["description"] = result.errorDescription;
      obj["severity"] = result.priority;
      obj["resTitle"] = result.resultTitle;
      obj["certainty"] = result.certainty;
      obj["snippets"] = [result.errorSnippet];
      obj["standard"] = result.standards[0];
      this.data[result.bpID] = obj;
    }
  }
};
</script>
