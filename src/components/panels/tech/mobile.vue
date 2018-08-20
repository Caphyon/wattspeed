<template>
    <container>
        <template slot="header">
          <h3 v-if="isMobileFriendly" class="text--success text--center text--strong mb0">
            Awesome! This page is mobile-friendly.
          </h3>
          <h3 v-else class="text--danger text--center text--strong mb0">
            Not mobile-friendly.
          </h3>
        </template>
        <div class="scrollable__container">
          <div>
            <mobile-item v-for="item in items" :data="item" :key="item.msg"></mobile-item>
          </div>
          <div class="mobile">
            <img class="mobile--screen" v-if="screenshot" :src="screenshot"/>
            <img class="mobile--frame" src="/assets/icons/mobile-frame.svg" height="305">
          </div>
        </div>
    </container>
</template>
<script>
import Vue from "vue";
import MobileSection from "./../../sections/mobile-section";
import Container from "./container";
import Item from "./items/mobile-item";
Vue.component("container", Container);
Vue.component("mobile-item", Item);

export default {
  mixins: [MobileSection],
  data() {
    return {
      desc:
        "The Google's Mobile-Friendly test will analyze a URL and report if the page has a mobile-friendly design."
    };
  },
  computed: {
    screenshot() {
      if (this.loading) return "";
      var str = [
        "data:",
        this.data.screenshot.mime_type,
        ";base64,",
        this.data.screenshot.data
      ].join("");
      str = str.replace(/\-/g, "+");
      str = str.replace(/_/g, "/");
      return str;
    },
    items() {
      const ruleToString = (name, passed) => {
        const ruleStrings = {
          ConfigureViewport: passed
            ? "Mobile viewport is set."
            : "Mobile viewport not set.",
          UseLegibleFontSizes: passed
            ? "Text isn't too small to read."
            : "Text too small to read.",
          AvoidPlugins: passed
            ? "Doesn't use incompatible plugins."
            : "Uses incompatible plugins.",
          SizeContentToViewport: passed
            ? "Content not wider than screen."
            : "Content wider than screen.",
          SizeTapTargetsAppropriately: passed
            ? "Links not too far away from each other."
            : "Links too close together.",
          AvoidInterstitials: passed
            ? "Content not blocked by app install interstitial."
            : "Content blocked by app install interstitial."
        };
        return ruleStrings[name];
      };
      if (this.loading) return {};
      const ruleResults = this.data.formattedResults.ruleResults;
      const items = [];
      for (let key in ruleResults) {
        const value = ruleResults[key];
        items.push({
          passed: value.ruleImpact == 0.0,
          msg: ruleToString(key, value.ruleImpact == 0.0)
        });
      }
      return items;
    }
  }
};
</script>
<style lang="scss" scoped>
.mobile {
  position: relative;
  margin: auto;

  &--frame {
    transform: translateZ(0);
  }

  &::before {
    content: "";
    position: absolute;
    background-image: url(data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1NTQuNSA3MTIuNSIgdmlld0JveD0iMCAwIDU1NC41IDcxMi41IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48bGluZWFyR3JhZGllbnQgaWQ9ImEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iODkuNSIgeDI9Ijg5LjUiIHhsaW5rOmhyZWY9IiNhIiB5MT0iNzIwIiB5Mj0iMy41ODUzIi8+PGxpbmVhckdyYWRpZW50IGlkPSJjIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjQ1OS41IiB4Mj0iNDU5LjUiIHhsaW5rOmhyZWY9IiNhIiB5MT0iNzE0IiB5Mj0iLS4zNTMyIi8+PGxpbmVhckdyYWRpZW50IGlkPSJkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAiIHgyPSI1NTUuMTEwMiIgeGxpbms6aHJlZj0iI2EiIHkxPSI5MC43NSIgeTI9IjkwLjc1Ii8+PGxpbmVhckdyYWRpZW50IGlkPSJlIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAiIHgyPSI1NTUuMTEwMiIgeGxpbms6aHJlZj0iI2EiIHkxPSIyNjUuMjUiIHkyPSIyNjUuMjUiLz48bGluZWFyR3JhZGllbnQgaWQ9ImYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMCIgeDI9IjU1NS4xMTAyIiB4bGluazpocmVmPSIjYSIgeTE9IjQzOS43NSIgeTI9IjQzOS43NSIvPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIwIiB4Mj0iNTU0LjUiIHhsaW5rOmhyZWY9IiNhIiB5MT0iNjE0LjI1IiB5Mj0iNjE0LjI1Ii8+PHBhdGggZD0ibTg4IDBoM3Y3MTIuNWgtM3oiIGZpbGw9InVybCgjYikiLz48cGF0aCBkPSJtNDU4IDBoM3Y3MTIuNWgtM3oiIGZpbGw9InVybCgjYykiLz48cGF0aCBkPSJtMCA4OS4zaDU1NC41djNoLTU1NC41eiIgZmlsbD0idXJsKCNkKSIvPjxwYXRoIGQ9Im0wIDI2My44aDU1NC41djNoLTU1NC41eiIgZmlsbD0idXJsKCNlKSIvPjxwYXRoIGQ9Im0wIDQzOC4zaDU1NC41djNoLTU1NC41eiIgZmlsbD0idXJsKCNmKSIvPjxwYXRoIGQ9Im0wIDYxMi44aDU1NC41djNoLTU1NC41eiIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==);
    width: 250px;
    background-position: center;
    background-size: cover;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: .3;
  }

  &--screen {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 90%;
    z-index: 1;
  }
}
</style>
