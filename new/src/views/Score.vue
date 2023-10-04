<template>
  <div>
    <div class="preview-card in-view">
      <div>
        <Title name="Score"
               icon="pagespeed" />
        <button class="absolute right-4 z-10 text-xl"
                @click="goTo(true, 'home')"
                aria-label="Close button"
                title="Close">×
        </button>
      </div>
      <div class="content in-view">
        <LoadingWrapper :loading="loading.score" class="h-16 mt-2">
            <ScorePreview :chart-size="116" chart-class="-mt-12"/>
        </LoadingWrapper>
        <div class="description mt-0">
          Best practices and requirements of the SEO, Content and Technical analysis
        </div>
      </div>
    </div>
    <div class="in-view-content" :class="{ 'loading' : loading.score }">
      <LoadingWrapper :loading="loading.score">
        <div class="space-y-2">
          <div v-for="(issue, index) in filteredData"
               :key="index" class="flex gap-2 items-center">
            <div class="relative">
              <div class="min-w-[.5rem] min-h-[2rem] w-2 h-2 rounded opacity-20"
                   :class="`bg-${METRICS[issue.key].color}`" />
              <div class="min-w-[.5rem] w-2 h-2 rounded opacity-70 absolute bottom-0 left-0 z-10"
                   :class="`bg-${METRICS[issue.key].color}`"
                   :style="`min-height: ${getMetricFill(issue.score, METRICS[issue.key].weight)}rem`" />
            </div>
            <div class="badge flex-1"
                 :class="getIssueClass(issue.passed)">
              <h4>
                {{ issue.title }}.
                <template v-if="!issue.passed">
                  <router-link class="text-sm"
                               :to="{
                                      name: METRICS[issue.key].routeName,
                                      query: {
                                        from: 'score',
                                      }
                                    }">
                    View more details
                  </router-link>
                </template>
              </h4>
              <p class="code">
                <code>
                  {{ issue.passed ? 'Passed' : 'Failed' }} with the score of
                  {{ +issue.score.toFixed(1) }} out of {{ METRICS[issue.key].weight }}</code>
              </p>
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </div>
    <Filters v-if="!loading.score" :filters="filters" @emitFilter="onFilterChange"/>
  </div>
</template>

<script>
import Title from "../components/Title.vue";
import LoadingWrapper from "../components/LoadingWrapper.vue";
import ScoreChart from "../components/ScoreChart.vue";
import ScorePreview from "../components/previews/ScorePreview.vue";
import {sortObjectsArrayData} from "../assets/scripts/helper.js";
import Filters from "../components/Filters.vue";

export default {
  name: "Score",
  components: {Filters, ScorePreview, ScoreChart, LoadingWrapper, Title },
  inject: {
    loading: {
      default: () => false
    },
    METRICS: {
      default: () => {}
    },
    score: {
      default: () => {}
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
      'bg-rose-500': [false],
      'bg-emerald-500': [true],
    };

    return {
      filters: filters,
      activeFilters: Object.keys(filters).map((key) => filters[key]).flat(),
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
