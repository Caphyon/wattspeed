<template>
  <container>
    <template slot="header">
      <div v-if="!error" class="section__header--stats px2 py1">
        <security-grade :grade="grades.headersGrade" section="Headers"></security-grade>
        <security-grade :grade="grades.sslGrade" section="SSL"></security-grade>
      </div>
    </template>
    <div class="scrollable__container">
      <div>
        <h4 class="text--center text--muted mt0 mb1">Headers</h4>
        <security-headers-item v-for="(data, key) in headersData" :title="key" :data="data" :key="key"/>
      </div>
      <div>
        <h4 class="text--center text--muted mt0 mb1">SSL</h4>
        <security-ssl-item v-for="(message, key) in sslData.errors" :key="key" :message="message" type="error"/>
        <security-ssl-item v-for="(message, key) in sslData.warnings" :key="key" :message="message" type="warning"/>
        <security-ssl-item v-for="(message, key) in sslData.success" :key="key" :message="message" type="success"/>
      </div>
    </div>
  </container>
</template>

<script>
import Vue from "vue";
import SecuritySection from "../../sections/security-section";
import Container from "./container";
import HeadersItem from "./items/security-headers-item";
import SSLItem from "./items/security-ssl-item";

Vue.component("container", Container);
Vue.component("security-headers-item", HeadersItem);
Vue.component("security-ssl-item", SSLItem);

export default {
  mixins: [SecuritySection],
  data() {
    return {
      headersData: {},
      sslData: {},
      desc: `Web security is the process of protecting websites and online services
             against different security threats that exploit vulnerabilities in an
             application's code or server's configuration.`,
    };
  },
  watch: {
    securityData: function() {
      if (this.securityData) {
        this.headersData = this.securityData.headersFeedback.headers;
        this.sslData = this.securityData.sslFeedback;
      }
    }
  },
};
</script>
