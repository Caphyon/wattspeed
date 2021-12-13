<template>
    <section-container>
      <accessibility-status :score="score" :issues="issues" :warnings="warnings" v-if="score != 100"></accessibility-status>
      <p v-else class="alert--success">
        No accessibility issues found.
      </p>
    </section-container>
</template>
<script>

import Vue from "vue";
import BaseSection from "./base-section.vue";
import SectionContainer from "./section-container.vue";
import Status from "./../panels/tech/items/accessibility-status.vue";

import { marked } from 'marked';
let Constant = require("../../assets/utils/consts.js");

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
    this.allAccessibility();
    EventBus.$on("refreshData", () => {
      this.allAccessibility();
    });
  },
  methods: {
    allAccessibility() {
      this.loading = true;
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const request = new Request(Constant.API_URL, {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({ params: { url: this.tab.url, action: "lighthouse", section: "accessibility", device: "desktop" }}),
        });
      this.makeRequest(request, this.panelName, Constant.ANY, data => {
        if (data.code == 1) {
          this.$emit('tooManyRequests');
        } else if (data.code == 2) {
          this.error = "Something went wrong, please try again!";
          this.loading = false;
        } else {
          let resData = JSON.parse(data.body);
          if (resData == null || Object.keys(resData).length === 0)
            throw new Error("Response body for accessibility is empty or null");

          let temp = [];
          resData.categories.accessibility.auditRefs.forEach(element => {
            if (element.weight > 0) {
              if (resData.audits[element.id].score !== 1) {
                temp.push(resData.audits[element.id]);
              }
            }
          });
          this.issues = temp.length;
          if (resData.categories.accessibility.score) {
            this.score = (resData.categories.accessibility.score * 100);
          } else {
            this.score = 1;
          }
          this.data = this.parse(temp);
          this.loading = false;
        }
      });
    },
    parse(data) {
      const renderer = new marked.Renderer();
      renderer.link = function(href, title, text) {
        let link = marked.Renderer.prototype.link.call(this, href, title, text);
        return link.replace('<a','<a target="_blank" ');
      };
      marked.setOptions({
        renderer: renderer,
      });

      let issues = [];
      for (const audit of data) {
        let obj = {
          title: '',
          description: '',
          severity: '',
          snippets: [],
        };

        obj.title = marked.parseInline(audit.title);
        // Use marked on description too, just in case
        obj.description = marked.parseInline(audit.description);
        // Change severity path if the version of ligthouse changes (5.2.0 now)
        if (audit.details) {
          obj.severity = audit.details.debugData.impact;
        }
        let snippets = [];
        if (audit.details)
          snippets = audit.details.items.map(item => item.node.snippet);
        obj.snippets = snippets;
        issues.push(obj);
      };

      return issues;
    },
  },
  computed: {
    getPanelName() {
      return this.panelName;
    },
  },
};
</script>
