<template>
    <container>
      <template slot="header">
        <div class="section__header--stats px2 py1">
          <performance-score :score="mobileScore" type="Mobile"></performance-score>
          <performance-score :score="desktopScore" type="Desktop"></performance-score>
        </div>
      </template>
      <div class="scrollable__container">
        <div>
          <h4 class="text--center text--muted mt0 mb1">Mobile</h4>
          <performance-item v-for="(msg,index) in mobileMessages" :data="msg" :key="index"></performance-item>
        </div>
        <div>
          <h4 class="text--center text--muted mt0 mb1">Desktop</h4>
          <performance-item v-for="(msg, index) in desktopMessages" :data="msg" :key="index"></performance-item>
        </div>
      </div>
      <template slot="filters" v-if="legendBool()">
        <div class="text--center text--small py1">
          <input hidden type="checkbox" id="Success" value="Success" v-model="filtered_results"/>
          <label :class="setDisabled('Success', 'text--success')" class="cursor--pointer px2" for="Success" v-if="this.types[0] === true">
            Success
          </label>
          <input hidden type="checkbox" id="Warnings" value="Warnings" v-model="filtered_results"/>
          <label class="cursor--pointer px2" :class="setDisabled('Warnings', 'text--warning')" for="Warnings" v-if="this.types[1] === true">
            Warnings
          </label>
          <input hidden type="checkbox" id="Errors" value="Errors" v-model="filtered_results"/>
          <label class="cursor--pointer px2" :class="setDisabled('Errors', 'text--danger')" for="Errors" v-if="this.types[2] === true">
            Errors
          </label>
        </div>
      </template>
    </container>
</template>

<script>
import Vue from "vue";
import PerformanceSection from "../../sections/performance-section";
import Container from "./container";
import Item from "./items/performance-item";
Vue.component("container", Container);
Vue.component("performance-item", Item);
export default {
  mixins: [PerformanceSection],
  data() {
    return {
      filtered_results: ["Success", "Warnings", "Errors"],
      types: [ false, false, false ],
      desc:
        "Performance fetches the URL twice, once with a mobile user-agent, and once with a desktop-user agent."
    };
  },
  methods: {
    extractMessages(type) {
      if (this.loading || !this.hasData) return [];
      const messages = this.essentialData[type];
      const results = [];
      for (let key in messages) {
        const msg = messages[key];
        if (this.filtered_results.length == 0)
          results.push({
            title: msg.title,
            level: msg.score,
            msg: msg.description
          });
        if (this.filtered_results.includes("Success") && msg.score >= 0.9) {
          results.push({
            title: msg.title,
            level: msg.score,
            msg: msg.description
          });
          if(!this.types[0]) this.types[0] = true;
        }
        if (this.filtered_results.includes("Warnings") && msg.score < 0.9 && msg.score >= 0.65) {
          results.push({
            title: msg.title,
            level: msg.score,
            msg: msg.description
          });
          if(!this.types[1]) this.types[1] = true;
        }
        if (this.filtered_results.includes("Errors") && msg.score < 0.65) {
          results.push({
            title: msg.title,
            level: msg.score,
            msg: msg.description
          });
          if(!this.types[2]) this.types[2] = true;
        }
      }
      return results;
    },
    setDisabled(the_field, selected_color) {
      if (!this.filtered_results.includes(the_field)) {
        return 'text--muted';
      }
      return selected_color;
    },
    legendBool() {
      if(this.types[0] === true || this.types[1] === true || this.types[2] === true) {
        return true;
      }
    }
  },
  computed: {
    mobileMessages() {
      return this.extractMessages("mobile");
    },
    desktopMessages() {
      return this.extractMessages("desktop");
    },
  }
};
</script>
