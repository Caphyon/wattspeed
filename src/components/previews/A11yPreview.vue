<template>
  <div class="preview-card-metrics">
    <div>
      <h3
        class="badge font-semibold"
        :class="getIssuesClass()">
        {{ a11y.issuesCount }}
      </h3>
      <span class="metric-title">{{ pluralSingularConverter(a11y.issuesCount, 'issues', 'issue') }}</span>
    </div>
    <div>
      <h3
        class="badge font-semibold"
        :class="getScoreClass(a11y.score)">
        {{ a11y.score }}%
      </h3>
      <span class="metric-title">Score</span>
    </div>
  </div>
</template>

<script>
import { pluralSingularConverter } from '../../assets/scripts/helper';

export default {
  name: 'A11yPreview',
  inject: {
    a11y: {
      default: () => ({}),
    },
  },
  methods: {
    pluralSingularConverter(count, pl, sg) {
      return pluralSingularConverter(count, pl, sg);
    },
    getScoreClass(score) {
      if (score < 0.5) return 'badge-danger';
      if (score < 0.9) return 'badge-warning';
      return 'badge-success';
    },
    getIssuesClass() {
      if (this.a11y.issuesCount === 0) return 'badge-success';
      return 'badge-danger';
    },
  },
};
</script>
