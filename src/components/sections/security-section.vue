<template>
  <section-container>
    <div class="section__header--stats px2 py1">
      <security-grade :grade="grades.headersGrade"
                      section="Headers"></security-grade>
      <security-grade :grade="grades.sslGrade"
                      section="SSL"></security-grade>
    </div>
  </section-container>
</template>

<script>
import Vue from "vue";
import BaseSection from "./base-section.vue";
import SectionContainer from "./section-container.vue";
import SecurityGrade from "../panels/tech/items/security-grade.vue";

const Constant = require("../../assets/utils/consts.js");

Vue.component('section-container', SectionContainer);
Vue.component('security-grade', SecurityGrade);

export default {
  mixins: [BaseSection],
  data() {
    return {
      title: "Security",
      panelName: "security",
      dataFinal: {},
      icon: "shield",
      securityData: {
        type: Object,
        default: () => {},
      },
      grades: {
        headersGrade: {},
        sslGrade: {},
      },
    };
  },
  mounted() {
    this.loading = true;
    this.getSecurity();

    EventBus.$on("refreshData", () => {
      this.getSecurity();
    });
  },
  methods: {
    getSecurity() {
      this.loading = true;
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const params = {
        params: {
          url: this.tab.url,
          action: 'security',
        },
      };

      const request = new Request(Constant.API_URL, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(params),
      });

      this.makeRequest(request, this.panelName, Constant.ANY, data => {
        if (data.code == 1) {
          this.$emit('tooManyRequests');
        } else if (data.code == 2) {
          this.error = "Something went wrong, please try again!";
        } else {
          this.securityData = data.body;
          this.grades = this.securityData.grades;
        }
        this.loading = false;
      });
    },
  },
  computed: {
    getPanelName() {
      return this.panelName;
    },
  },
}
</script>

<style lang="scss" scoped>
.section__header--stats {
  display: flex;
}
</style>
