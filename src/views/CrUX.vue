<template>
  <div class="lh-vars">
    <div class="preview-card in-view">
      <Breadcrumb>
        <Title
          name="CrUX URL"
          icon="crux"
          @click="goTo('crux-url')"
          :class="{ inactive: $route.name === 'crux-origin' }" />
        <Title
          name="CrUX Origin"
          icon="crux"
          @click="goTo('crux-origin')"
          :class="{ inactive: $route.name === 'crux-url' }" />
      </Breadcrumb>
      <div class="content in-view mt-4">
        <LoadingWrapper
          :loading="loading.crux"
          class="mt-2 h-16">
          <CrUXPreview />
        </LoadingWrapper>
        <div class="description">
          Core Web Vitals are a set of standardized metrics from Google that help developers understand how users
          experience a web page.
        </div>
      </div>
    </div>
    <div
      class="in-view-content"
      :class="{ loading: loading.crux }">
      <LoadingWrapper :loading="loading.crux">
        <div
          class="lh-audit-group--metrics"
          :class="crux[getCrUXGroup] ? 'lh-audit-group' : ''">
          <div>
            <div class="flex items-center pt-2">
              <div>
                <svg
                  height="60"
                  class="w-[200px]">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    :xlink:href="`#${getCWVStatusSvg()}`" />
                </svg>
              </div>
              <div
                v-if="crux[getCrUXGroup]"
                class="my-auto">
                <span v-html="getGroupText()" />
              </div>
              <p
                v-else
                class="my-auto">
                <span class="lh-audit-group__title">
                  <template v-if="$route.name === 'crux-url'">Field Data</template>
                  <template v-else>Origin Summary</template>
                </span>
                <span v-html="getNoDataText()" />
              </p>
            </div>
          </div>
          <div class="lh-metrics-container">
            <template v-for="metricId in Object.keys(sections)">
              <div
                v-if="
                  crux[getCrUXGroup] &&
                  crux[getCrUXGroup].record &&
                  crux[getCrUXGroup].record.metrics[sections[metricId].id]
                "
                class="lh-metric lh-metric--numeric border-0"
                :class="`lh-metric--${getStatusClass(sections[metricId].id)}`">
                <div class="lh-metric__innerwrap_old gap-y-1">
                  <div class="lh-metric__title">
                    {{ sections[metricId].title }}
                    <span
                      v-if="sections[metricId].coreVitals"
                      title="Core Web Vitals">
                      📈
                    </span>
                  </div>
                  <div class="lh-metric__value_old">
                    {{ getPercentile(sections[metricId].id) }}
                  </div>
                  <div class="progress crux_progress col-span-2 col-start-2 h-auto">
                    <div
                      class="progress-bar crux_progress--fast rounded-lg font-bold"
                      :class="{ '-mr-3 pr-4': fastHasNext(sections[metricId].id) }"
                      role="progressbar"
                      v-if="getData(sections[metricId].id, 0, true)"
                      :style="'flex-grow:' + getData(sections[metricId].id, 0)"
                      :aria-valuenow="getData(sections[metricId].id, 0)"
                      aria-valuemin="0"
                      aria-valuemax="100">
                      {{ getData(sections[metricId].id, 0, true) }}%
                    </div>
                    <div
                      class="progress-bar crux_progress--avg rounded-lg font-bold"
                      :class="{ '-mr-3 pr-4': avgHasNext(sections[metricId].id) }"
                      role="progressbar"
                      v-if="getData(sections[metricId].id, 1, true)"
                      :style="'flex-grow:' + getData(sections[metricId].id, 1)"
                      :aria-valuenow="getData(sections[metricId].id, 1)"
                      aria-valuemin="0"
                      aria-valuemax="100">
                      {{ getData(sections[metricId].id, 1, true) }}%
                    </div>
                    <div
                      class="progress-bar crux_progress--slow rounded-lg font-bold"
                      role="progressbar"
                      v-if="getData(sections[metricId].id, 2, true)"
                      :style="'flex-grow:' + getData(sections[metricId].id, 2)"
                      :aria-valuenow="getData(sections[metricId].id, 2)"
                      aria-valuemin="0"
                      aria-valuemax="100">
                      {{ getData(sections[metricId].id, 2, true) }}%
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-else
                class="lh-metric lh-metric--numeric border-0"
                :class="`lh-metric--notapplicable`">
                <div class="lh-metric__innerwrap_old gap-y-1">
                  <div class="lh-metric__title">
                    {{ sections[metricId].title }}
                    <span
                      v-if="sections[metricId].coreVitals"
                      title="Core Web Vitals">
                      📈
                    </span>
                  </div>
                  <div class="lh-metric__value_old">N/A</div>
                  <div class="progress crux_progress col-span-2 col-start-2 h-auto">
                    <div
                      class="progress-bar crux_progress--notapplicable rounded-lg text-sm font-bold"
                      role="progressbar"
                      :style="'flex-grow: 100'"
                      :aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100">
                      N/A
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </LoadingWrapper>
    </div>
  </div>
</template>

<script>
import Title from '../components/Title.vue';
import LoadingWrapper from '../components/LoadingWrapper.vue';
import HTMLPreview from '../components/previews/HTMLPreview.vue';
import CrUXPreview from '../components/previews/CrUXPreview.vue';
import Breadcrumb from '../components/Breadcrumb.vue';

export default {
  name: 'CrUXURL',
  components: { Breadcrumb, CrUXPreview, HTMLPreview, LoadingWrapper, Title },
  inject: {
    crux: {
      default: () => {},
    },
    loading: {
      default: () => false,
    },
  },
  data() {
    return {
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
        interaction_to_next_paint: {
          id: 'interaction_to_next_paint',
          title: 'Interaction to Next Paint',
          coreVitals: false,
        },
        experimental_time_to_first_byte: {
          id: 'experimental_time_to_first_byte',
          title: 'Time to First Byte',
        },
      },
    };
  },
  methods: {
    getData(section, metricIndex, round) {
      const value = this.crux[this.getCrUXGroup].record.metrics[section].histogram[metricIndex].density * 100;
      if (!round) {
        return value;
      }
      return Math.round(value);
    },
    getCWVStatus() {
      const cwvAssesment = this.passesCoreVitals();

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
    fastHasNext(section) {
      return this.getData(section, 1, true) || this.getData(section, 2, true);
    },
    avgHasNext(section) {
      return this.getData(section, 2, true);
    },
    passesCoreVitals() {
      const LCP = 'largest_contentful_paint';
      const FID = 'first_input_delay';
      const CLS = 'cumulative_layout_shift';

      const cwvMetrics = [LCP, FID, CLS];
      let metrics = [];
      let passesAll = true;

      if (this.crux[this.getCrUXGroup] === null) {
        return 2;
      }

      if (
        this.crux[this.getCrUXGroup] &&
        this.crux[this.getCrUXGroup].record &&
        this.crux[this.getCrUXGroup].record.metrics
      ) {
        metrics = Object.keys(this.crux[this.getCrUXGroup].record.metrics);
      }
      metrics.forEach((item) => {
        if (cwvMetrics.includes(item)) {
          const percentile = this.crux[this.getCrUXGroup].record.metrics[item].percentiles.p75;
          for (let i = 0; i <= 2; i++) {
            const { start } = this.crux[this.getCrUXGroup].record.metrics[item].histogram[i];
            const { end } = this.crux[this.getCrUXGroup].record.metrics[item].histogram[i];

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
    getCWVStatusSvg() {
      try {
        const status = this.getCWVStatus();

        switch (status) {
          case 'pass':
            return 'cwv-passed';
          case 'fail':
            return 'cwv-failed';
          default:
            return 'cwv-no-data';
        }
      } catch (err) {
        return '';
      }
    },
    getGroupText() {
      let compareVitalsClass = '';
      let vitalsClass = '';
      let text = '';

      const cwvAssesment = this.passesCoreVitals();

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
          'The <a href="https://web.dev/vitals/" target="_blank" rel="noopener nofollow">' +
          `📈Core Web Vitals</a> assessment ${status}`
        );
      }

      if (this.getCrUXGroup === 'origin') {
        return (
          `The aggregate experience of all pages served from this origin ${status} the ` +
          '<a href="https://web.dev/vitals/" target="_blank" rel="noopener nofollow">' +
          '📈Core Web Vitals</a> assessment over the previous <strong>28-day</strong> period.'
        );
      }

      return (
        `This page ${status} the <a href="https://web.dev/vitals/" target="_blank" ` +
        'rel="noopener nofollow">📈Core Web Vitals</a> assessment over the previous ' +
        '<strong>28-day</strong> period.'
      );
    },
    getNoDataText() {
      let page = 'page';
      if (this.getCrUXGroup === 'origin') {
        page = 'origin';
      }
      return (
        ' - The <strong>Chrome User Experience Report</strong> does not have sufficient ' +
        `real-world speed data for this ${page}.`
      );
    },
    getStatusClass(sectionId) {
      const percentile = this.crux[this.getCrUXGroup].record.metrics[sectionId].percentiles.p75;
      for (let i = 0; i <= 2; i++) {
        const { start } = this.crux[this.getCrUXGroup].record.metrics[sectionId].histogram[i];
        const { end } = this.crux[this.getCrUXGroup].record.metrics[sectionId].histogram[i];

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
    getPercentile(section) {
      return this.getPercentileText(section, this.crux[this.getCrUXGroup].record.metrics[section].percentiles.p75);
    },
  },
  computed: {
    getCrUXGroup() {
      if (this.$route.name === 'crux-url') {
        return 'url';
      } else if (this.$route.name === 'crux-origin') {
        return 'origin';
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
.lh-vars {
  --color-not-applicable: var(--color-gray-600);
  --default-padding: 8px;
  --audit-group-margin-bottom: calc(var(--default-padding) * 6);
  --report-line-height: 24px;
  --report-border-color-secondary: var(--color-blue-border);
  --color-blue-border: #374060;
  --score-icon-size: 12px;
  --score-icon-margin-left: 6px;
  --score-icon-margin-right: 14px;
  --score-icon-margin: 0 var(--score-icon-margin-right) 0 var(--score-icon-margin-left);
  --audit-description-padding-left: calc(
    var(--score-icon-size) + var(--score-icon-margin-left) + var(--score-icon-margin-right)
  );
  --color-gray-100: #f5f5f5;
  --color-gray-200: #e0e0e0;
  --color-gray-600: #757575;
  --color-gray-700: #616161;
  --color-gray-800: #424242;
  --color-bg-container: #272e38;
  --color-red: rgba(206, 55, 77);
  --color-orange: rgba(225, 167, 48);
  --color-green: rgba(57, 176, 126);

  color: rgb(203, 213, 225);
}

ul {
  li:not(:last-of-type) {
    margin-bottom: 1rem;
  }
}

.lh-audit-group {
  margin-bottom: var(--audit-group-margin-bottom);
  position: relative;
}

.lh-audit-group--metrics {
  margin-bottom: calc(var(--audit-group-margin-bottom) / 2);
}

.lh-audit-group__title {
  text-transform: uppercase;
  font-weight: 500;
}

.lh-metrics-container {
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: var(--report-line-height);
  margin-bottom: var(--default-padding);
}

.lh-metric {
  border-top: 1px solid var(--report-border-color-secondary);
}

.lh-table-column--numeric {
  text-align: right;
  word-break: normal;
}

.lh-metric__innerwrap_old {
  display: grid;
  grid-template-columns: var(--audit-description-padding-left) 10fr 3fr;
  align-items: center;
  padding: 10px 0;
}

.lh-metric__value_old {
  white-space: nowrap; /* No wrapping between metric value and the icon */
  font-weight: 500;
  justify-self: end;
}

/* Progress */
.crux_progress--fast {
  background-color: var(--color-green);
}

.crux_progress--avg {
  background-color: var(--color-orange);
}

.crux_progress--slow {
  background-color: var(--color-red);
}

.crux_progress--notapplicable {
  background-color: var(--color-gray-800);
  color: var(--color-gray-700) !important;
}

.progress {
  display: flex;
  overflow: hidden;
  border-radius: 4px;
  background-color: var(--color-bg-container);

  &-bar {
    height: 17px !important;
    font-size: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    white-space: nowrap;
    text-align: center;
    line-height: 1rem;
    color: var(--color-gray-100);
  }
}

.lh-metric .lh-metric__innerwrap:before,
.lh-metric .lh-metric__innerwrap_old:before,
.lh-scorescale-range:before {
  content: '';
  width: var(--score-icon-size);
  height: var(--score-icon-size);
  display: inline-block;
  margin: var(--score-icon-margin);
  margin-top: 2px;
}

.lh-metric--pass .lh-metric__innerwrap::before,
.lh-metric--pass .lh-metric__innerwrap_old::before {
  border-radius: 100%;
  background: var(--color-green);
}

.lh-metric--pass .lh-metric__value,
.lh-metric--pass .lh-metric__value_old {
  color: var(--color-green);
}

.lh-metric--average .lh-metric__innerwrap::before,
.lh-metric--average .lh-metric__innerwrap_old::before {
  background: var(--color-orange);
}

.lh-metric--average .lh-metric__value,
.lh-metric--average .lh-metric__value_old {
  color: var(--color-orange);
}

.lh-metric--fail .lh-metric__innerwrap::before,
.lh-metric--error .lh-metric__innerwrap::before,
.lh-metric--fail .lh-metric__innerwrap_old::before,
.lh-metric--error .lh-metric__innerwrap_old::before {
  border-left: calc(var(--score-icon-size) / 2) solid transparent;
  border-right: calc(var(--score-icon-size) / 2) solid transparent;
  border-bottom: var(--score-icon-size) solid var(--color-red);
  height: 0px;
  width: 0px;
}

.lh-metric--fail .lh-metric__value,
.lh-metric--fail .lh-metric__value_old {
  color: var(--color-red);
}

.lh-metric--notapplicable .lh-metric__innerwrap::before,
.lh-metric--notapplicable .lh-metric__innerwrap_old::before {
  border-radius: 100%;
  background: var(--color-not-applicable);
}
.lh-metric--notapplicable .lh-metric__value,
.lh-metric--notapplicable .lh-metric__value_old {
  color: var(--color-not-applicable);
}
</style>
