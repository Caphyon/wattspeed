<template>
  <div class="preview-card-metrics">
    <div>
      <h3 class="badge font-semibold"
          :class="getCWVStatusText(passesCoreVitals('url'))">
        {{ getCWVStatusText(passesCoreVitals("url"), true) }}
      </h3>
      <span class="uppercase">URL</span>
    </div>
    <div>
      <h3 class="badge font-semibold"
          :class="getCWVStatusText(passesCoreVitals('origin'))">
        {{ getCWVStatusText(passesCoreVitals("origin"), true) }}
      </h3>
      <span class="uppercase">Origin</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CrUXPreview",
  inject: {
    crux: {
      default: () => ({})
    }
  },
  methods: {
    passesCoreVitals(groupId) {
      const LCP = "largest_contentful_paint";
      const FID = "first_input_delay";
      const CLS = "cumulative_layout_shift";

      const cwvMetrics = [LCP, FID, CLS];
      let metrics = [];
      let passesAll = true;

      if (this.crux[groupId] === null) {
        return 2;
      }

      if (this.crux[groupId] && this.crux[groupId].record && this.crux[groupId].record.metrics) {
        metrics = Object.keys(this.crux[groupId].record.metrics);
      }
      metrics.forEach((item) => {
        if (cwvMetrics.includes(item)) {
          const percentile = this.crux[groupId].record.metrics[item].percentiles.p75;
          for (let i = 0; i <= 2; i++) {
            const { start } = this.crux[groupId].record.metrics[item].histogram[i];
            const { end } = this.crux[groupId].record.metrics[item].histogram[i];

            switch (i) {
              case 1:
                if (percentile >= start && percentile <= end) {
                  passesAll = false;
                }
                break;
              case 2:
                if (percentile >= start) {
                  passesAll = false;
                }
                break;
              default:
                break;
            }
          }
        }
      });

      const hasMandatoryMetrics = [LCP, CLS].every((metric) => metrics.includes(metric));
      if (!hasMandatoryMetrics) {
        return 2;
      }

      return passesAll ? 1 : 0;
    },
    getCWVStatusText(status, getText) {
      if (getText) {
        if (status === 0) return "Failed";
        if (status === 1) return "Passed";

        return "Not Available";
      }
      if (status === 0) return "badge-danger";
      if (status === 1) return "badge-success";

      return "badge-secondary";
    }
  }
};
</script>
