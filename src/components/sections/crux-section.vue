<template>
  <section-container>
    <div class="section__header--stats px2 py1">
      <div class="text--center">
        <h3 class="mt0 mb0" :class="getCWVStatusText(passesCoreVitals('url'))">
          {{ getCWVStatusText(passesCoreVitals('url'), true) }}
        </h3>
        <span class="text--uppercase">URL</span>
      </div>
      <div class="text--center">
        <h3 class="mt0 mb0" :class="getCWVStatusText(passesCoreVitals('origin'))">
          {{ getCWVStatusText(passesCoreVitals('origin'), true) }}
        </h3>
        <span class="text--uppercase">Origin</span>
      </div>
    </div>
  </section-container>
</template>
<script>
import Vue from "vue";
import BaseSection from "./base-section.vue";
import SectionContainer from "./section-container.vue";
import passSVG from "../../assets/cwv-pass.svg";
import failSVG from "../../assets/cwv-fail.svg";
import noDataSVG from "../../assets/cwv-no-data.svg";

let Constant = require("../../assets/utils/consts.js");

Vue.component("section-container", SectionContainer);

export default {
  mixins: [BaseSection],
  props: {
    initTitle: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
      title: "CrUX URL",
      title2: "CrUX Origin",
      panelName: "crux-url",
      icon: "crux",
      icon2: "crux",
      activeFirst: true,
      activeSecond: false,
      data: {},
      sections: {
        largest_contentful_paint: {
          id: 'largest_contentful_paint',
          title: 'Largest Contentful Paint',
          coreVitals: true,
        },
        first_input_delay: {
          id: 'first_input_delay',
          title: 'First Input Delay',
          coreVitals: true,
        },
        cumulative_layout_shift: {
          id: 'cumulative_layout_shift',
          title: 'Cumulative Layout Shift',
          coreVitals: true,
        },
        first_contentful_paint: {
          id: 'first_contentful_paint',
          title: 'First Contentful Paint',
        },
        experimental_interaction_to_next_paint: {
          id: 'experimental_interaction_to_next_paint',
          title: 'Interaction to Next Paint',
          coreVitals: false,
        },
        experimental_time_to_first_byte: {
          id: 'experimental_time_to_first_byte',
          title: 'Time to First Byte',
        },
      },
      desc:
        "Core Web Vitals are a set of standardized metrics from Google that help developers understand how users experience a web page."
    };
  },
  mounted() {
    if (this.initTitle) {
      this.title = this.initTitle;
    }
    this.getCrUX();
    EventBus.$on("refreshData", () => {
      this.getCrUX();
    });
  },
  methods: {
    getData(group, section, metricIndex, round) {
      const value = this.data[group].record.metrics[section].histogram[metricIndex].density
        * 100;
      if (!round) {
        return value;
      }
      return Math.round(value);
    },
    getCWVStatus(groupId) {
      const cwvAssesment = this.passesCoreVitals(groupId);

      switch (cwvAssesment) {
        case 2:
          return 'no_data';
        case 1:
          return 'pass';
        case 0:
          return 'fail';
        default:
          return '';
      }
    },
    fastHasNext(group, section) {
      return this.getData(group, section, 1, true) || this.getData(group, section, 2, true);
    },
    avgHasNext(group, section) {
      return this.getData(group, section, 2, true);
    },
    passesCoreVitals(groupId) {
      const LCP = 'largest_contentful_paint';
      const FID = 'first_input_delay';
      const CLS = 'cumulative_layout_shift';

      const cwvMetrics = [LCP, FID, CLS];
      let metrics = [];
      let passesAll = true;

      if (this.data[groupId] === null) {
        return 2;
      }

      if (this.data[groupId] && this.data[groupId].record && this.data[groupId].record.metrics) {
        metrics = Object.keys(this.data[groupId].record.metrics);
      }
      metrics.forEach((item) => {
        if (cwvMetrics.includes(item)) {
          const percentile = this.data[groupId].record.metrics[item].percentiles.p75;
          for (let i = 0; i <= 2; i++) {
            const {start} = this.data[groupId].record.metrics[item].histogram[i];
            const {end} = this.data[groupId].record.metrics[item].histogram[i];

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
    getCWVStatusSvg(groupId) {
      try {
        const status = this.getCWVStatus(groupId);

        switch (status) {
          case 'pass':
            return passSVG;
          case 'fail':
            return failSVG;
          default:
            return noDataSVG;
        }
      } catch (err) {
        return '';
      }
    },
    getGroupText(groupId) {
      let compareVitalsClass = '';
      let vitalsClass = '';
      let text = '';

      const cwvAssesment = this.passesCoreVitals(groupId);

      switch (cwvAssesment) {
        case 2:
          compareVitalsClass = 'lh-audit--notapplicable';
          vitalsClass = 'crux_vitals--notapplicable';
          text = 'is not applicable';
          break;
        case 1:
          compareVitalsClass = 'lh-audit--pass';
          vitalsClass = 'crux_vitals--passes';
          text = 'passes';
          break;
        case 0:
          compareVitalsClass = 'lh-audit--fail';
          vitalsClass = 'crux_vitals--fails';
          text = 'does not pass';
          break;
        default:
          compareVitalsClass = '';
          vitalsClass = '';
          text = '';
      }

      const status = `<span class="${vitalsClass}">${text}</span>`;

      if (cwvAssesment === 2) {
        return (
          'The <a href="https://web.dev/vitals/" target="_blank" rel="noopener nofollow">'
          + `📈Core Web Vitals</a> assessment ${status}`
        );
      }

      if (groupId === 'origin') {
        return (
          `The aggregate experience of all pages served from this origin ${status} the `
          + '<a href="https://web.dev/vitals/" target="_blank" rel="noopener nofollow">'
          + '📈Core Web Vitals</a> assessment over the previous <strong>28-day</strong> period.'
        );
      }

      return (
        `This page ${status} the <a href="https://web.dev/vitals/" target="_blank" `
        + 'rel="noopener nofollow">📈Core Web Vitals</a> assessment over the previous '
        + '<strong>28-day</strong> period.'
      );
    },
    getNoDataText(groupId) {
      let page = 'page';
      if (groupId === 'origin') {
        page = 'origin';
      }
      return (
        ' - The <strong>Chrome User Experience Report</strong> does not have sufficient '
        + `real-world speed data for this ${page}.`
      );
    },
    getStatusClass(groupId, sectionId) {
      const percentile = this.data[groupId].record.metrics[sectionId].percentiles.p75;
      for (let i = 0; i <= 2; i++) {
        const {start} = this.data[groupId].record.metrics[sectionId].histogram[i];
        const {end} = this.data[groupId].record.metrics[sectionId].histogram[i];

        switch (i) {
          case 0:
            if (percentile >= start && percentile <= end) {
              return 'pass';
            }
            break;
          case 1:
            if (percentile >= start && percentile <= end) {
              return 'average';
            }
            break;
          case 2:
            if (percentile >= start) {
              return 'fail';
            }
            break;
          default:
            break;
        }
      }

      return 'lh-metric--pass';
    },
    getPercentileText(section, value) {
      if (!value) {
        return '-';
      }
      let suffix = 'ms';

      if (section === 'cumulative_layout_shift' || section === 'cls') {
        suffix = '';
      }

      if (value >= 1000) {
        value /= 1000;
        if (section !== 'cumulative_layout_shift' && section !== 'cls') {
          suffix = 's';
        }
      } else {
        if (value === 0) {
          return value + suffix;
        }
        return Math.round(value * 100) / 100 + suffix;
      }

      if (value === 0) {
        return value + suffix;
      }
      return Math.round(value * 10) / 10 + suffix;
    },
    getPercentile(group, section) {
      return this.getPercentileText(
        section,
        this.data[group].record.metrics[section].percentiles.p75,
      );
    },
    getCrUX() {
      this.loading = true;
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const request = new Request(Constant.API_URL, {
        method: "POST",
        headers: myHeaders,
        body: `{"params": {"url": "${this.tab.url}", "action":"crux", "device":"desktop"}}`,
      });

      this.makeRequest(request, this.panelName, Constant.ANY, data => {
        if (data.code == 1) {
          this.$emit('tooManyRequests');
        } else if (data.code == 2) {
          this.error = "Something went wrong, please try again!";
          this.loading = false;
        } else {
          this.data = data;

          if (this.data === null || Object.keys(this.data).length === 0)
            throw new Error("Response body for crux is empty or null");

          this.loading = false;
        }
      });
    },
    getCWVStatusText(status, getText) {
      if (getText) {
        if (status === 0) return 'Failed';
        if (status === 1) return 'Passed';

        return 'Not Available';
      }
      if (status === 0) return 'alert--danger';
      if (status === 1) return 'alert--success';

      return 'alert--secondary';
    },
  },
  computed: {
    hasData() {
      return this.data && Object.keys(this.data).every((k) => ['url', 'origin'].includes(k));
    },
    getPanelName() {
      return this.panelName;
    },
  },
};
</script>

<style lang="scss" scoped>
.section__header--stats {
  display: flex;

  div {
    width: 100%;

    &:not(:last-of-type) {
      border-right: 1px solid rgba(255, 255, 255, 0.3);
    }

    h3 {
      display: inline-block;
    }

    span {
      display: block;
    }
  }
}
</style>
