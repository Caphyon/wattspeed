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
import marked from 'marked'

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
          body: `{"params": {"url": "${this.tab.url}", "action":"lighthouse", "section":"acccessibility", "device":"desktop"}}`,
        });
      this.makeRequest(request, this.panelName, 'desktop', data => {
        if (data.code == 1) {
          this.$emit('tooManyRequests');
        } else if (data.code == 2) {
          this.error = "Something went wrong, please try again!";
          this.loading = false;
        } else {
          let resData = JSON.parse(data.body)
          let temp = [];
          resData.categories.accessibility.auditRefs.forEach(element => {
            if (element.weight > 0){
              if(resData.audits[element.id].score !== 1){
                temp.push(resData.audits[element.id])
              }
            }
          });
          let finaldata = this.parse(temp);
          this.issues = temp.length;
          if (resData.categories.accessibility.score) {
            this.score = (resData.categories.accessibility.score * 100);
          } else {
            this.score = 1;
          }
          this.data = finaldata.issues;
          this.loading = false;
        }
      });
    },
    /* UTILS */
    getLink(description){
      description = description.toString();
      let i = description.indexOf("[Learn more]");
      if (i === -1) return "";
      description = description.substr(i);
      i = description.indexOf("(");
      if (i === -1) return "";
      const end = description.indexOf(")");
      return description.slice(i+1, end);
    },
    removeLink(description){
      let i = description.indexOf("[Learn more]");
      if (i === -1) return description;
      return description.substr(0, i);
    },
    parse(data){
      let result = {};
      let issues = [];
      for (let e in data){
        let obj = {};
          e = data[e];
          obj.title = marked(e.title);
          // Use marked on description too, just in case
          let desc = marked(this.removeLink(e.description));
          // Remove enclosing <p></p>
          desc = desc.substr(desc.indexOf('<p>')+3, desc.length-8);
          obj.description = desc;
          obj.link = this.getLink(e.description);
          //change severity path if the version of ligthouse changes (5.2.0 now)
          if (e.details) {
            obj.severity = e.details.debugData.impact;
          }
          let snippets = [];
          if (e.details)
              snippets = e.details.items.map(e => e.node.snippet);
          obj.snippets = snippets;
          issues.push(obj);
          result['issues'] = issues
      };
      return result;
  },
  }
};
</script>
