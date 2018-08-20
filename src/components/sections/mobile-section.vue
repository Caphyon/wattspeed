<template>
    <section-container>
        <p v-if="isMobileFriendly" class="alert--success">
            Awesome! This page is mobile-friendly.
        </p>
        <p v-else class="alert--danger">
            Not mobile-friendly.
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
      icon: "mobile"
    };
  },
  mounted() {
    const request = new Request(
      encodeURI(`${MOBILE_READY_URL}?url=${this.tab.url}`),
      {
        method: "GET"
      }
    );
    this.makeRequest(request, data => {
      this.data = data;
      this.loading = false;
    });
  },
  computed: {
    hasErrors() {
      return !this.loading && !!this.data.error;
    },
    isMobileFriendly() {
      return !this.loading && !!this.data.ruleGroups.USABILITY.pass;
    }
  }
};
</script>
