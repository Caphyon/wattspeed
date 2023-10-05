<template>
  <div :class="getScoreClass">
    <h4 v-html="audit.title"/>
    <p class="mb-2 text-sm" v-html="audit.description"/>
  </div>
</template>

<script>
import { ERROR, WARNING } from "../../assets/scripts/constants.js";

export default {
  name: "PerformanceItem",
  props: {
    audit: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getScoreClass() {
      if (this.audit.type === ERROR) return "badge badge-danger";
      if (this.audit.type === WARNING) return "badge badge-warning";
      return "badge badge-success";
    }
  }
};
</script>
