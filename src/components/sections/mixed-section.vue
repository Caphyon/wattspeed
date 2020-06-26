<template>
    <section-container>
        <template v-if="isHttps">
          <p v-if="hasMixedContent" class="alert--danger">
            This site contains mixed content.
          </p>
          <p v-else class="alert--success">
            This page does not contain mixed content.
          </p>
        </template>
        <p v-else class="alert--warning">
            Does not apply to non HTTPS pages.
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
      title: "Mixed Content",
      panelName: "mixed",
      data: {},
      isHttps: true,
      icon: "mixed",
      mixedContent: null,
    };
  },
  mounted() {
    this.allMixed();
    EventBus.$on("refreshData", () => {
      this.allMixed();
    });
  },
  methods: {
    allMixed() {
      this.loading = true;
      this.isHttps = this.tab.url.indexOf("https") > -1;
      if (this.isHttps) {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const request = new Request(Constant.API_URL, {
          method: 'POST',
          headers: myHeaders,
          body: `{"params": {"url": "${this.tab.url}", "action":"get_mixed_content"}}`,
        });

        this.makeRequest(request, this.panelName,  this.panelName, data => {
          if (data.code == 1) {
            this.$emit('tooManyRequests');
          } else if (data.code == 2) {
            this.error = "Something went wrong, please try again!";
            this.loading = false;
          } else {
            this.mixedContent = JSON.parse(data.body);
            this.checkContent(this.mixedContent);
            this.loading = false;
          }
        });
      } else {
        this.loading = false;
      }
    },
    checkContent(contents) {
      const result = {
        status: false,
        results: []
      };
      Object.keys(contents).forEach(type => {
        const content = contents[type];
        content.forEach(element => {
          if (element)
            if (element.indexOf("http:") > -1)
              if (
                element.match(
                  /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/
                )
              ) {
                result.status = true;
                result.results.push(element);
              }
        });
      });
      this.data = result;
      this.loading = false;
    }
  },
  computed: {
    hasMixedContent() {
      if (this.loading) return false;
      return this.data.status;
    }
  }
};
</script>
