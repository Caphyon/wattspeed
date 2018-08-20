<template>
  <container>
    <div class="scrollable__container">
      <a class="tech" v-for="tech in techs" :href="tech.url" target="_blank">
        <img v-bind:src=" 'https://www.google.com/s2/favicons?domain=' + tech.url " width="16" height="16" class="text--vcenter">
        <span class="text--vcenter">{{tech.name}}</span>
      </a>
    </div>
  </container>
</template>
<script>
import Vue from "vue";
import Container from "./container";
Vue.component("container", Container);

import TechSection from "./../../sections/tech-section.vue";
export default {
  mixins: [TechSection],
  data() {
    return {
      desc:
        "The Technologies section contains a list of frameworks, libraries and other web tools that we found while analyzing the web page."
    };
  }
};
</script>

<style lang="scss" scoped>
  .tech {
    background-color: rgba(0,0,0,.3);
    padding: .5rem;
    color: #fff;
    text-decoration: none;
    font-weight: 400;
    transition: .1s ease-in;

    &:hover {
      padding-left: 1rem;

      span {
        text-decoration: underline;
      }
    }

    img {
      margin-right: .3rem;
    }
  }
</style>
