<template>
  <container>
    <div class="scrollable__container">
      <a class="tech" v-for="(item, index) in tech" :key="index" :href="item.url" target="_blank">
        <img v-bind:src=" 'https://www.google.com/s2/favicons?domain=' + item.url " width="16" height="16" class="text--vcenter"/>
        <span class="text--vcenter">{{item.name}}</span>
      </a>
      <template v-if="JSON_LD_TYPE.length > 0">
        <a href="https://json-ld.org" target="_blank" class="tech">
        <img src="https://www.google.com/s2/favicons?domain=https://json-ld.org" alt="json-ld favicon" width="16" height="16" class="text--vcenter"/>
        <span>
          JSON-LD:
          <template v-if="JSON_LD_TYPE.length > 1">
            [ {{JSON_LD_TYPE.join(', ')}} ]
          </template>
          <template v-else>
            {{JSON_LD_TYPE[0]}}
          </template>
        </span>
        </a>
      </template>
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
