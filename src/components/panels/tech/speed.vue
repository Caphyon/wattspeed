<template>
    <container>
      <template slot="header">
        <div class="section__header--stats">
          <speed-score :score="mobileScore" type="Mobile"></speed-score>
          <speed-score :score="desktopScore" type="Desktop"></speed-score>
        </div>
      </template>
      <div class="scrollable__container">
        <div>
          <h4 class="text--center text--muted mt0">Mobile</h4>
          <speed-item v-for="msg in mobileMessages" :data="msg" :key="msg.title"></speed-item>
        </div>
        <div>
          <h4 class="text--center text--muted mt0">Desktop</h4>
          <speed-item v-for="msg in desktopMessages" :data="msg" :key="msg.title"></speed-item>                
        </div>
      </div>
    </container>
</template>

<script>
import Vue from "vue";
import SpeedSection from "./../../sections/speed-section";
import Container from "./container";
import Item from "./items/speed-item";
Vue.component("container", Container);
Vue.component("speed-item", Item);
export default {
  mixins: [SpeedSection],
  data() {
    return {
      desc:
        "Page Speed Insights measures the performance of a page for mobile devices and desktop devices. It fetches the url twice, once with a mobile user-agent, and once with a desktop-user agent."
    };
  },
  methods: {
    extractMessages(type) {
      if (this.loading || !this.hasData) return [];
      const messages = this.data[type].formattedResults.ruleResults;
      const results = [];
      for (let key in messages) {
        const msg = messages[key];
        results.push({
          title: msg.localizedRuleName,
          level: msg.ruleImpact,
          msg: msg.summary
        });
      }
      return results;
    }
  },
  computed: {
    mobileMessages() {
      return this.extractMessages("mobile");
    },
    desktopMessages() {
      return this.extractMessages("desktop");
    }
  }
};
</script>