<template>
  <pair-container class="lh-vars">
    <div class="lh-audit-group--metrics"
         :class="data.origin ? 'lh-audit-group mb0' : ''">
        <div class="mb2">
          <div class="flex pt-2">
            <div>
              <img
                :alt="`Core web vitals ${getCWVStatus('origin')}`"
                :src="getCWVStatusSvg('origin')"
                height="60"
                class="mx-auto block"
                style="max-height: 60px;"/>
            </div>
            <p v-if="data.origin" class="my-auto">
              <span v-html="getGroupText('origin')"/>
            </p>
            <p v-else class="my-auto">
              <span class="lh-audit-group__title">Origin summary</span>
              <span v-html="getNoDataText('origin')"/>
            </p>
          </div>
        </div>
        <div class="lh-metrics-container">
          <template v-for="(metricId, index) in Object.keys(sections)">
            <div
              v-if="data.origin
                && data.origin.record
                && data.origin.record.metrics[sections[metricId].id]"
              class="lh-metric lh-metric--numeric border-0"
              :class="`lh-metric--${getStatusClass('origin', sections[metricId].id)}`"
              :key="index">
              <div class="lh-metric__innerwrap_old gap-y-1">
                <div class="lh-metric__title">
                  {{ sections[metricId].title }}
                  <span v-if="sections[metricId].coreVitals" title="Core Web Vitals"> 📈 </span>
                </div>
                <div class="lh-metric__value_old">
                  {{ getPercentile('origin', sections[metricId].id) }}
                </div>
                <div class="progress crux_progress col-span-2 col-start-2 h-auto">
                  <div
                    class="progress-bar crux_progress--fast font-bold rounded-lg"
                    :class="{ '-mr-3 pr-4' : fastHasNext('origin', sections[metricId].id) }"
                    role="progressbar"
                    v-if="getData('origin', sections[metricId].id, 0, true)"
                    :style="'flex-grow:' + getData('origin', sections[metricId].id, 0)"
                    :aria-valuenow="getData('origin', sections[metricId].id, 0)"
                    aria-valuemin="0"
                    aria-valuemax="100">
                    {{ getData('origin', sections[metricId].id, 0, true) }}%
                  </div>
                  <div
                    class="progress-bar crux_progress--avg font-bold rounded-lg"
                    :class="{ '-mr-3 pr-4' : avgHasNext('origin', sections[metricId].id) }"
                    role="progressbar"
                    v-if="getData('origin', sections[metricId].id, 1, true)"
                    :style="'flex-grow:' + getData('origin', sections[metricId].id, 1)"
                    :aria-valuenow="getData('origin', sections[metricId].id, 1)"
                    aria-valuemin="0"
                    aria-valuemax="100">
                    {{ getData('origin', sections[metricId].id, 1, true) }}%
                  </div>
                  <div
                    class="progress-bar crux_progress--slow rounded-lg font-bold"
                    role="progressbar"
                    v-if="getData('origin', sections[metricId].id, 2, true)"
                    :style="'flex-grow:' + getData('origin', sections[metricId].id, 2)"
                    :aria-valuenow="getData('origin', sections[metricId].id, 2)"
                    aria-valuemin="0"
                    aria-valuemax="100">
                    {{ getData('origin', sections[metricId].id, 2, true) }}%
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="lh-metric lh-metric--numeric border-0"
              :class="`lh-metric--notapplicable`"
              :key="index">
              <div class="lh-metric__innerwrap_old gap-y-1">
                <div class="lh-metric__title">
                  {{ sections[metricId].title }}
                  <span v-if="sections[metricId].coreVitals" title="Core Web Vitals"> 📈 </span>
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
  </pair-container>
</template>
<script>
import Vue from "vue";
import PairContainer from "./pair-container.vue";

Vue.component("pair-container", PairContainer);

import CrUXSection from "../../sections/crux-section.vue";

export default {
  mixins: [CrUXSection],
  data() {
    return {
      panelName: "crux-origin",
      activeFirst: false,
      activeSecond: true,
    };
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
  --audit-description-padding-left: calc(var(--score-icon-size) + var(--score-icon-margin-left) + var(--score-icon-margin-right));
  --color-gray-100: #F5F5F5;
  --color-gray-200: #E0E0E0;
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
    height: 17px!important;
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
.flex {
  display: flex;
}
.-mr-3 {
  margin-right: -0.75rem!important;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.pr-4 {
  padding-right: 1rem!important;
}
.pt-2 {
  padding-right: .5rem!important;
}
.w-full {
  width: 100%;
}
.text-sm {
  font-size: 0.875rem;
}

.font-bold {
  font-weight: 700;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.my-auto {
  margin-top: auto;
  margin-bottom: auto;
}

.block {
  display: block;
}

.col-span-2 {
  grid-column: span 2 / span 2;
}

.col-start-2 {
  grid-column-start: 2;
}

.h-auto {
  height: auto;
}

.gap-y-1 {
  row-gap: 0.25rem!important;
}

.p-1 {
  padding-top: .25rem;
  padding-bottom: .25rem;
}

.lh-metric .lh-metric__innerwrap:before,
.lh-metric .lh-metric__innerwrap_old:before,
.lh-scorescale-range:before {
  content: "";
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
.lh-metric--average .lh-metric__innerwrap_old::before{
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
