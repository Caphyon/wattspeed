<template>
    <section-container>
        <p v-if="mobile_friendly" class="alert--success">
          {{mobile_friendly}}
        </p>
        <p v-else class="alert--danger">
          {{not_mobile_friendly}}
        </p>
    </section-container>
</template>
<script>

import Vue from "vue";
import BaseSection from "./base-section.vue";
import SectionContainer from "./section-container.vue";

let Constant = require("../../assets/utils/consts.js");

Vue.component("section-container", SectionContainer);

export default {
  mixins: [BaseSection],
  data() {
    return {
      panelName: "mobile",
      title: "Performance",
      title2: "Mobile",
      data: {},
      icon: "pagespeed",
      icon2: "mobile",
      mobile_friendly: "",
      not_mobile_friendly: "",
      activeFirst: false,
      activeSecond: true,
    };
  },
  mounted() {
    this.allMobile();
    EventBus.$on("refreshData", () => {
      this.allMobile();
    });
  },
  methods: {
    allMobile() {
      this.loading = true;
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const request = new Request(Constant.API_URL, {
          method: 'POST',
          headers: myHeaders,
          body: `{"params": {"url": "${this.tab.url}", "action":"lighthouse", "section":"mobile"}}`,
        });
      this.makeRequest(request, this.panelName, Constant.ANY, data => {
        if (data.code == 1) {
          this.$emit('tooManyRequests');
        } else if (data.code == 2) {
          this.error = "Something went wrong, please try again!";
          this.loading = false;
        } else {
          this.data = JSON.parse(data.body);
          if (this.data.audits.viewport.score === 0 || this.data.audits.viewport.score === null) {
            this.not_mobile_friendly = "This page is not mobile friendly!";
          } else {
            this.mobile_friendly = "Awesome! This page is mobile friendly!"
          }
          this.loading = false;
        }
      });
    }
  },
  computed: {
    hasErrors() {
      return !this.loading && this.data.error;
    },
    isMobileFriendly() {
      return !this.loading && this.data.ruleGroups && this.data.ruleGroups.USABILITY.pass;
    },
    getPanelName() {
      return this.panelName;
    },
  }
};
</script>
