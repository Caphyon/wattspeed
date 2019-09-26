<template>
    <section-container>
        <p v-if="isValid" class="alert--success">No errors found.</p>
        <template v-else>
          <p class="alert--danger">Errors found while checking the page.</p>
          <ul class="list-unstyled">
            <li v-for="(message, index) in getMessages()" :key="index" v-bind:class="[message.class]">
              <p class="mt0">{{message.msg}}</p>
              <p clss="code">{{message.mark}}</p>
            </li>
          </ul>
        </template>
    </section-container>
</template>
<script>
const W3_API_URL = "https://validator.w3.org/nu/";

import Vue from "vue";
import BaseSection from "./base-section.vue";
import SectionContainer from "./section-container.vue";

Vue.component("section-container", SectionContainer);

const typeToClasses = {
  warning: "alert--warning",
  info: "alert--warning",
  error: "alert--danger"
};

const getClass = type => {
  return typeToClasses[type] || "alert--success";
};

export default {
  mixins: [BaseSection],
  data() {
    return {
      title: "HTML5",
      panelName: "html5",
      htmlData: [],
      icon: "html5"
    };
  },
  mounted() {
    this.allHtml();

    EventBus.$on("refreshData", () => {
      this.allHtml();
    });
  },
  methods: {
    allHtml() {
      this.loading = true;
      const url = encodeURI(`${W3_API_URL}?doc=${this.tab.url}&out=json`);
      const request = new Request(url, {
        method: "GET"
      });
      this.makeRequest(request, data => {
        this.htmlData = data;
        this.loading = false;
      });
    },
    /**
     * Using W3 Api, this function iterates through returned messages
     * returning an array with formatted messages
     */
    getMessages: function() {
      if (!this.loading && this.htmlData.messages)
        return this.htmlData.messages.map(message => {
          return {
            msg: message.message,
            type: message.subType || message.type,
            mark: message.extract,
            class: getClass(message.type)
          };
        });
      return [];
    }
  },
  computed: {
    /**
     * Using W3 Api, this function iterates through returned messages
     * and checks if there are warnings or errors
     */
    isValid() {
      if (this.loading) return false;
      for (let i in this.htmlData.messages) {
        const message = this.htmlData.messages[i];
        if (message.type == "warning" || message.type == "error") {
          return false;
        }
      }
      return true;
    },

    hasData() {
      return !this.error && !this.loading && this.htmlData.messages.length > 0;
    }
  }
};
</script>
