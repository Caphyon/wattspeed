<template>
    <section-container>
      <ul class="list-unstyled">
          <li v-for="(item, index) in techs" :key="index">
            <img v-bind:src=" 'https://www.google.com/s2/favicons?domain=' + item.url " class="text--vcenter"/>
            <span class="text--vcenter">{{ item.name }}</span>
          </li>
          <li v-if="JSON_LD_TYPE.length > 0">
            <img src="https://www.google.com/s2/favicons?domain=https://json-ld.org" alt = "json-ld favicon" class="text--vcenter"/>
            <span>
              JSON-LD:
              <template v-if="JSON_LD_TYPE.length > 1">[ {{JSON_LD_TYPE.join(', ')}} ]</template>
              <template v-else>{{JSON_LD_TYPE[0]}}</template>
            </span>
          </li>
      </ul>
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
      noDataMsg: "No technologies found.",
      title: "Technologies",
      panelName: "technology",
      techs: [],
      icon: "technologies",
      JSON_LD_TYPE: [],
      noErrorMessage: "This page does not contain any technologies"
    };
  },
  mounted() {
    this.getTechnologies();
    EventBus.$on("refreshData", () => {
      this.getTechnologies();
    });
  },
  methods: {
    getTechnologies() {
      this.loading = true;
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const request = new Request(Constant.API_URL, {
        method: 'POST',
        headers: myHeaders,
        body: `{"params": {"url": "${this.tab.url}", "action":"get_technologies"}}`,
      });

      this.makeRequest(request, this.panelName,  this.panelName, data => {
        if (data.code == 1) {
          this.$emit('tooManyRequets');
        } else if (data.code == 2) {
          this.error = "Something went wrong, please try again!";
          this.loading = false;
        } else {
          this.techs = JSON.parse(data.body).tech;
          this.JSON_LD_TYPE = JSON.parse(data.body).json_ld;
          this.loading = false;
        }
      });
    },
  },
  computed: {
    isValid() {
      return this.techs.length === 0;
    },
    hasData() {
      return this.techs.length > 0;
    }
  }
};
</script>

<style lang="scss" scoped>
  ul {
    li {
      margin-bottom: .5rem;

      img {
        margin-right: .3rem;
      }
    }
  }
</style>
