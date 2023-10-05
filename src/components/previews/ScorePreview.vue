<template>
  <div class="preview-card-metrics">
    <ScoreChart
      :id="`${$route.name}-score-preview-chart`"
      class="mx-auto w-1/2"
      :class="chartClass"
      :size="chartSize"
      :circle-radius="46"
      :strokes="getScoreDistributionStrokes()" />
  </div>
</template>

<script>
import ScoreChart from '../ScoreChart.vue';
export default {
  name: 'ScorePreview',
  components: {
    ScoreChart,
  },
  props: {
    chartSize: {
      type: Number,
      default: () => 80,
    },
    chartClass: {
      type: String,
      default: () => '',
    },
  },
  inject: {
    loading: {
      default: () => ({}),
    },
    score: {
      default: () => ({}),
    },
    METRICS: {
      default: () => ({}),
    },
  },
  methods: {
    normalizedFillWeight(value, inMax) {
      return this.intervalNormalization(value, 0, inMax, 0, 100);
    },
    getScoreDistributionStrokes() {
      const strokes = {};
      const cruxScore = this.score['crux-url'] + this.score['crux-origin'];
      const cruxWeight = this.METRICS['crux-url'].weight + this.METRICS['crux-origin'].weight;

      const performanceScore =
        this.score['performance-mobile'] +
        this.score['performance-desktop'] +
        this.score['performance-mobile-subsection'];
      const performanceWeight =
        this.METRICS['performance-mobile'].weight +
        this.METRICS['performance-desktop'].weight +
        this.METRICS['performance-mobile-subsection'].weight;

      const securityScore = this.score['security-headers'] + this.score['security-ssl'];
      const securityWeight = this.METRICS['security-headers'].weight + this.METRICS['security-ssl'].weight;

      const htmlScore = this.score['html-errors'] + this.score['html-warnings'];
      const htmlWeight = this.METRICS['html-errors'].weight + this.METRICS['html-warnings'].weight;

      const a11yScore = this.score['a11y-score'];
      const a11yWeight = this.METRICS['a11y-score'].weight;

      const normalizations = {
        crux: +Number(this.normalizedFillWeight(cruxScore, cruxWeight)),
        performance: +Number(this.normalizedFillWeight(performanceScore, performanceWeight)),
        security: +Number(this.normalizedFillWeight(securityScore, securityWeight)),
        html: +Number(this.normalizedFillWeight(htmlScore, htmlWeight)),
        a11y: +Number(this.normalizedFillWeight(a11yScore, a11yWeight)),
      };

      console.log(htmlScore);
      console.log(htmlWeight);
      console.log(normalizations.html);
      strokes['first'] = [
        {
          id: 1,
          name: 'CrUX',
          color: 'lime-500',
          weight: cruxWeight || 0,
          fillWeight: cruxScore || 0,
          normalized: normalizations.crux || 0,
        },
        {
          id: 2,
          name: 'Performance',
          color: 'cyan-500',
          weight: performanceWeight || 0,
          fillWeight: performanceScore || 0,
          normalized: normalizations.performance || 0,
        },
        {
          id: 3,
          name: 'Security',
          color: 'emerald-500',
          weight: securityWeight || 0,
          fillWeight: securityScore || 0,
          normalized: normalizations.security || 0,
        },
        {
          id: 4,
          name: 'HTML',
          color: 'rose-500',
          weight: htmlWeight || 0,
          fillWeight: htmlScore || 0,
          normalized: normalizations.html || 0,
        },
        {
          id: 5,
          name: 'Accessibility',
          color: 'orange-500',
          weight: a11yWeight || 0,
          fillWeight: a11yScore || 0,
          normalized: normalizations.a11y || 0,
        },
      ];

      return strokes;
    },
  },
};
</script>
