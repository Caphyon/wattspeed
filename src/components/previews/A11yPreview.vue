<template>
  <div class="preview-card-metrics">
    <div>
      <h3 class="badge badge-danger font-semibold">
        {{ a11y.issuesCount }}
      </h3>
      <span class="uppercase">Issues</span>
    </div>
    <div>
      <h3
        class="badge font-semibold"
        :class="getScoreClass(a11y.score)">
        {{ a11y.score }}%
      </h3>
      <span class="uppercase">Score</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'A11yPreview',
  inject: {
    a11y: {
      default: () => ({}),
    },
  },
  methods: {
    getScoreClass(score) {
      if (score < 0.5) return 'badge-danger';
      if (score < 0.9) return 'badge-warning';
      return 'badge-success';
    },
  },
};
</script>
