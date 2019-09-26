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
const MOBILE_READY_URL =
  "https://www.googleapis.com/pagespeedonline/v3beta1/mobileReady";

import Vue from "vue";
import BaseSection from "./base-section.vue";
import SectionContainer from "./section-container.vue";

Vue.component("section-container", SectionContainer);

export default {
  mixins: [BaseSection],
  data() {
    return {
      panelName: "mobile",
      title: "Mobile",
      data: {},
      icon: "mobile",
      mobile_friendly: "",
      not_mobile_friendly: ""
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
      const request = new Request(
        `${MOBILE_READY_URL}?url=${this.tab.url}&strategy=mobile`,
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "x-api-key": process.env.MOBILE_KEY
          }
        }
      );
      this.makeRequest(request, data => {
        this.data = data;
        if (data.audits["viewport"].score === 0 || data.audits['viewport'].score === null) {
          this.not_mobile_friendly = "This page is not mobile friendly!";
        } else {
          this.mobile_friendly = "Awesome! This page is mobile friendly!"
        }
        this.loading = false;
      });
    }
  },
  computed: {
    hasErrors() {
      return !this.loading && !!this.data.error;
    },
    isMobileFriendly() {
      return !this.loading && this.data.ruleGroups && !!this.data.ruleGroups.USABILITY.pass;
    }
  }
};
</script>
