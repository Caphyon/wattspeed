<template>
  <div>
    <div class="preview-card in-view">
      <div>
        <Breadcrumb>
          <Title
            name="Performance"
            icon="pagespeed"
            :class="{ inactive: $route.name === 'mobile' }"
            @click="goTo('performance')" />
          <Title
            name="Mobile"
            icon="mobile"
            :class="{ inactive: $route.name === 'performance' }"
            @click="goTo('mobile')" />
        </Breadcrumb>
      </div>
      <div class="content in-view">
        <LoadingWrapper
          :loading="loading.performance"
          class="mt-2 h-16">
          <PerformancePreview class="mt-2" />
        </LoadingWrapper>
        <div class="description">
          Performance measures the performance of a page for mobile devices and desktop devices. It fetches the url
          twice, once with a mobile user-agent, and once with a desktop-user agent.
        </div>
      </div>
    </div>
    <div
      class="in-view-content"
      :class="{ loading: loading.performance }">
      <LoadingWrapper :loading="loading.performance">
        <div class="flex justify-center gap-4">
          <div class="flex-1">
            <h3 class="sticky-area">Mobile</h3>
            <div class="h-full space-y-3">
              <PerformanceItem
                v-for="(audit, index) in filteredMobileData"
                :key="index"
                :audit="audit" />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="sticky-area">Desktop</h3>
            <div class="h-full space-y-3">
              <PerformanceItem
                v-for="(audit, index) in filteredDesktopData"
                :key="index"
                :audit="audit" />
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </div>
    <Filters
      v-if="!loading.performance"
      :filters="filters"
      @emitFilter="onFilterChange" />
  </div>
</template>

<script>
import { marked } from 'marked';
import Title from '../components/Title.vue';
import LoadingWrapper from '../components/LoadingWrapper.vue';
import { ERROR, WARNING, SUCCESS, DESKTOP, MOBILE } from '../assets/scripts/constants.js';
import PerformancePreview from '../components/previews/PerformancePreview.vue';
import PerformanceItem from '../components/items/PerformanceItem.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import Filters from '../components/Filters.vue';
import { sortObjectsArrayData } from '../assets/scripts/helper.js';

export default {
  name: 'Performance',
  components: {
    Filters,
    Breadcrumb,
    PerformanceItem,
    PerformancePreview,
    LoadingWrapper,
    Title,
  },
  inject: {
    performance: {
      default: () => {},
    },
    loading: {
      default: () => false,
    },
  },
  data() {
    const filters = {
      'bg-rose-500': [ERROR],
      'bg-amber-500': [WARNING],
      'bg-emerald-500': [SUCCESS],
    };

    return {
      filters,
      activeFilters: Object.keys(filters)
        .map((key) => filters[key])
        .flat(),
      initialMobileData: [],
      initialDesktopData: [],
      filteredMobileData: [],
      filteredDesktopData: [],
    };
  },
  watch: {
    '[performance.mobile.lighthouse, performance.desktop.lighthouse]': {
      handler() {
        if (this.performance[MOBILE].lighthouse && this.performance[DESKTOP].lighthouse) {
          this.filteredMobileData = this.initialMobileData = this.filterData(
            this.sortData(this.computeInitialData(this.performance[MOBILE].lighthouse))
          );
          this.filteredDesktopData = this.initialDesktopData = this.filterData(
            this.sortData(this.computeInitialData(this.performance[DESKTOP].lighthouse))
          );
        }
      },
      immediate: true,
    },
  },
  methods: {
    sortData(arr) {
      const orderArray = [ERROR, WARNING, SUCCESS];
      return sortObjectsArrayData(arr, orderArray, 'type');
    },
    filterData(arr) {
      const filteredArr = [];

      arr.forEach((object) => {
        if (this.activeFilters.indexOf(object.type) >= 0) {
          filteredArr.push(object);
        }
      });

      return filteredArr;
    },
    onFilterChange(payload) {
      this.activeFilters = payload;
      this.filteredMobileData = this.filterData(this.initialMobileData);
      this.filteredDesktopData = this.filterData(this.initialDesktopData);
    },
    computeFilterCategories(initialData) {
      return [...new Set(initialData.map((item) => item.type))];
    },
    computeInitialData(audits) {
      const renderer = new marked.Renderer();
      renderer.link = function (href, title, text) {
        const link = marked.Renderer.prototype.link.call(this, href, title, text);
        return link.replace('<a', '<a target="_blank" ');
      };
      marked.setOptions({
        renderer,
      });

      return audits.map((audit) => {
        const newItem = {};
        newItem.title = marked.parseInline(audit.title);
        newItem.level = audit.score;
        newItem.description = marked.parseInline(audit.description);

        if (audit.score >= 0.9) {
          newItem.type = SUCCESS;
        } else if (audit.score >= 0.65) {
          newItem.type = WARNING;
        } else {
          newItem.type = ERROR;
        }

        return newItem;
      });
    },
  },
};
</script>
