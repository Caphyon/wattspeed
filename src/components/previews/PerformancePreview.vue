<template>
  <div class="preview-card-metrics">
    <div>
      <h3 class="badge font-semibold"
          :class="getScoreClass(performance.mobile.score)">
        {{ (performance.mobile.score * 100).toFixed(0) }}
      </h3>
      <span class="uppercase">Mobile</span>
    </div>
    <div>
      <h3 class="badge font-semibold"
          :class="getScoreClass(performance.desktop.score)">
        {{ (performance.desktop.score * 100).toFixed(0) }}
      </h3>
      <span class="uppercase">Desktop</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PerformancePreview",
  inject: {
    performance: {
      default: () => ({})
    }
  },
  methods: {
    getScoreClass(score) {
      if (score < 0.5) return "badge-danger";
      if (score < 0.9) return "badge-warning";
      return "badge-success";
    }
  }
};
</script>
