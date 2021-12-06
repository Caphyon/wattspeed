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
        <security-headers-item v-for="(data, key) in this.initialHeadersData" :title="key" :data="data" :key="key"/>
      </div>
      <div>
        <h4 class="text--center text--muted mt0 mb1">SSL</h4>
        <security-ssl-item v-for="(message, key) in this.initialSSLData.errors" :key="key" :message="message" type="error"/>
        <security-ssl-item v-for="(message, key) in this.initialSSLData.warnings" :key="key" :message="message" type="warning"/>
        <security-ssl-item v-for="(message, key) in this.initialSSLData.success" :key="key" :message="message" type="success"/>
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
      initialHeadersData: [],
      initialSSLData: [],
      desc: "Security evaluates response headers and SSL to detect any vulnerabilities against common threats. Included in the report are a list of headers we look for and information on what they represent. SSL displays a short validation summary of certificates, protocols and ciphers.",
    };
  },
};
</script>