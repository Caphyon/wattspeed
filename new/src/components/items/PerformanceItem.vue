<template>
  <div :class="getScoreClass">
    <h4 v-html="audit.title"/>
    <p class="mb-2 text-sm" v-html="audit.description"/>
  </div>
</template>

<script>
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
      if (this.audit.level < 0.5) return "badge badge-danger";
      if (this.audit.level < 0.9) return "badge badge-warning";
      return "badge badge-success";
    }
  }
};
</script>
