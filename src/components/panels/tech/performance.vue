<template>
    <container>
      <template slot="header">
        <div v-if="!error" class="section__header--stats px2 py1">
          <performance-score :score="mobileScore" type="Mobile"></performance-score>
          <performance-score :score="desktopScore" type="Desktop"></performance-score>
        </div>
      </template>
      <div class="scrollable__container">
        <div>
          <h4 class="text--center text--muted mt0 mb1">Mobile</h4>
         <performance-item v-for="(msg,index) in filteredMobileData" :data="msg" :key="index"></performance-item>
        </div>
        <div>
          <h4 class="text--center text--muted mt0 mb1">Desktop</h4>
          <performance-item v-for="(msg, index) in filteredDesktopData" :data="msg" :key="index"></performance-item>
        </div>
      </div>
      <template slot="filters">
        <filter-item :filterCategories="this.initialFilterTypes"
                     @onFilter="updateFilteredResults">
        </filter-item>
      </template>
    </container>
</template>

<script>

import Vue from "vue";
import PerformanceSection from "../../sections/performance-section";
import Container from "./container";
import Item from "./items/performance-item";
import FilterItem from "./items/filter-item";

let Constant = require('./../../../assets/utils/consts.js')

Vue.component("container", Container);
Vue.component("performance-item", Item);
Vue.component("filter-item", FilterItem);

export default {
  mixins: [PerformanceSection],

  data() {
    return {
      initialDesktopData: [],
      initialMobileData: [],
      initialFilterTypes: [],
      filteredMobileData: [],
      filteredDesktopData: [],
      desc:
        "Performance measures the performance of a page for mobile devices and desktop devices. It fetches the url twice, once with a mobile user-agent, and once with a desktop-user agent."
    };
  },

  watch: {
    essentialData: function() {
      if (this.essentialData[Constant.DESKTOP] && this.essentialData[Constant.MOBILE]) {
        this.initialDesktopData = this.filteredDesktopData = this.computeInitialData(this.essentialData[Constant.DESKTOP]);
        this.initialMobileData = this.filteredMobileData = this.computeInitialData(this.essentialData[Constant.MOBILE]);
        this.initialFilterTypes = this.computeFilterCategories(this.initialMobileData, this.initialDesktopData);
      }
    },
  },

  methods: {
    computeInitialData(data) {
      return data.map(crtItem=> {
        let newItem ={};
        newItem.title = crtItem.title;
        newItem.level = crtItem.score;
        newItem.msg = crtItem.description;

        if (crtItem.score >= 0.9) {
          newItem.type = Constant.SUCCESS;
        } else if (crtItem.score >= 0.65) {
          newItem.type = Constant.WARNINGS;
        } else  {
          newItem.type = Constant.ERRORS;
        }

        return newItem;
      });
    },

    computeFilterCategories(initialMobileData, initialDesktopData) {
      let a =  [...new Set(initialMobileData.map(item => item.type))];
      let b =  [...new Set(initialDesktopData.map(item => item.type))];

      return [...new Set(a.concat(b))];
    },
    mobileMessages() {
      return this.extractMessages("mobile");
    },
    desktopMessages() {
      return this.extractMessages("desktop");
    },

    updateFilteredResults(value) {
      this.filteredMobileData = this.initialMobileData.filter(crtItem => {
        return value.includes(crtItem.type);
      });
      this.filteredDesktopData = this.initialDesktopData.filter(crtItem => {
        return value.includes(crtItem.type);
      });

    }
  }
};
</script>
