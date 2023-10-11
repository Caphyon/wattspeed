<template>
  <div>
    <div class="preview-card in-view">
      <div>
        <Title
          name="Score"
          icon="score" />
        <button
          class="absolute right-4 z-10 text-xl"
          @click="goTo('home')"
          aria-label="Close button"
          title="Close">
          ×
        </button>
      </div>
      <div class="content in-view">
        <LoadingWrapper
          :loading="loading.score"
          class="mt-2 h-16">
          <ScorePreview
            :chart-size="116"
            chart-class="-mt-12" />
        </LoadingWrapper>
        <div class="description mt-0">
          Aggregated issues from the key areas of CrUX, Performance, Security, HTML and Accessibility
        </div>
      </div>
    </div>
    <div
      class="in-view-content"
      :class="{ loading: loading.score }">
      <LoadingWrapper :loading="loading.score">
        <div class="space-y-2">
          <div
            v-for="(issue, index) in filteredData"
            :key="index"
            class="flex items-center gap-2">
            <div class="relative">
              <div
                class="h-2 min-h-[2rem] w-2 min-w-[.5rem] rounded opacity-20"
                :class="`bg-${METRICS[issue.key].color}`" />
              <div
                class="absolute bottom-0 left-0 z-10 h-2 w-2 min-w-[.5rem] rounded opacity-70"
                :class="`bg-${METRICS[issue.key].color}`"
                :style="`min-height: ${getMetricFill(issue.score, METRICS[issue.key].weight)}rem`" />
            </div>
            <div
              class="badge flex-1"
              :class="getIssueClass(issue.passed)">
              <h4>
                {{ issue.title }}.
                <template v-if="!issue.passed">
                  <router-link
                    class="text-sm"
                    :to="{
                      name: METRICS[issue.key].routeName,
                      query: {
                        from: 'score',
                      },
                    }">
                    View more details
                  </router-link>
                </template>
              </h4>
              <p class="code">
                <code>
                  {{ issue.passed ? 'Passed' : 'Failed' }} with the score of
                  {{ +intervalNormalization(+issue?.score, 0, METRICS[issue.key].weight, 0, 10)?.toFixed(1) }} / 10
                </code>
              </p>
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </div>
    <Filters
      v-if="!loading.score"
      :filters="filters"
      @emitFilter="onFilterChange" />
  </div>
</template>

<script>
import Title from '../components/Title.vue';
import LoadingWrapper from '../components/LoadingWrapper.vue';
import ScoreChart from '../components/ScoreChart.vue';
import ScorePreview from '../components/previews/ScorePreview.vue';
import { sortObjectsArrayData } from '../assets/scripts/helper.js';
import Filters from '../components/Filters.vue';

export default {
  name: 'Score',
  components: { Filters, ScorePreview, ScoreChart, LoadingWrapper, Title },
  inject: {
    loading: {
      default: () => false,
    },
    METRICS: {
      default: () => {},
    },
    score: {
      default: () => {},
    },
  },
  watch: {
    'loading.score': {
      handler() {
        if (!this.loading.score) {
          this.initialData = this.filteredData = this.filterData(this.sortData(this.score.issues));
        }
      },
      immediate: true,
    },
  },
  data() {
    const filters = {
      'bg-rose-500': {
        identifiers: [false],
        title: 'Toggle failed',
      },
      'bg-emerald-500': {
        identifiers: [true],
        title: 'Toggle passed',
      },
    };

    return {
      filters: filters,
      activeFilters: Object.keys(filters)
        .map((key) => filters[key].identifiers)
        .flat(),
      initialData: [],
      filteredData: [],
    };
  },
  methods: {
    getIssueClass(status) {
      if (status) {
        return 'badge-success';
      }
      return 'badge-danger';
    },
    getMetricFill(value, inMax) {
      if (value === inMax) {
        return 2;
      }
      return this.intervalNormalization(value, 0, inMax, 0.5, 1.7);
    },
    sortData(arr) {
      const orderArray = [false, true];
      return sortObjectsArrayData(arr, orderArray, 'passed');
    },
    filterData(arr) {
      const filteredArr = [];

      arr.forEach((object) => {
        if (this.activeFilters.indexOf(object.passed) >= 0) {
          filteredArr.push(object);
        }
      });

      return filteredArr;
    },
    onFilterChange(payload) {
      this.activeFilters = payload;
      this.filteredData = this.filterData(this.initialData);
    },
  },
};
</script>
