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
      this.loading = true;
      const request = new Request(`${Constant.API_URL}?url=${this.tab.url}&action=lighthouse&section=mobile`, {
          method: 'GET',
        });
      this.makeRequest(request, this.panelName, this.panelName, data => {
        if (data.code == 1) {
          this.$emit('tooManyRequets');
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
    }
  }
};
</script>
