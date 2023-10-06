<template>
  <div>
    <div class="preview-card in-view">
      <Breadcrumb>
        <Title
          name="Accessibility"
          icon="a11y" />
      </Breadcrumb>
      <div class="content in-view">
        <LoadingWrapper
          :loading="loading.a11y"
          class="mt-2 h-16">
          <A11yPreview class="mt-2" />
        </LoadingWrapper>
        <div class="description">
          The power of the Web is in its universality. Access by everyone regardless of disability is an essential
          aspect. (Tim Berners-Lee, W3C Director and inventor of the World Wide Web)
        </div>
      </div>
    </div>
    <div
      class="in-view-content"
      :class="{ loading: loading.a11y }">
      <LoadingWrapper :loading="loading.a11y">
        <div class="space-y-2">
          <div
            v-for="(audit, index) in filteredData"
            :key="index">
            <div
              class="badge"
              :class="audit.class">
              <h4 v-html="audit.title"></h4>
              <p
                class="text-sm"
                v-html="audit.description"></p>
              <ul class="list-unstyled">
                <li
                  class="code"
                  v-for="(snippet, index) in audit.snippets"
                  :key="index">
                  <code>{{ snippet }}</code>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </div>
    <Filters
      v-if="!loading.a11y"
      :filters="filters"
      @emitFilter="onFilterChange" />
  </div>
</template>

<script>
import Title from '../components/Title.vue';
import A11yPreview from '../components/previews/A11yPreview.vue';
import LoadingWrapper from '../components/LoadingWrapper.vue';
import { ERROR, SUCCESS, WARNING } from '../assets/scripts/constants.js';
import Breadcrumb from '../components/Breadcrumb.vue';
import { sortObjectsArrayData } from '../assets/scripts/helper.js';
import Filters from '../components/Filters.vue';

export default {
  name: 'A11y',
  components: { Filters, Breadcrumb, LoadingWrapper, A11yPreview, Title },
  inject: {
    a11y: {
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
      filters: filters,
      activeFilters: Object.keys(filters)
        .map((key) => filters[key])
        .flat(),
      initialData: [],
      filteredData: [],
      initialFilterTypes: [],
    };
  },
  watch: {
    'a11y.audits': {
      handler() {
        if (this.a11y.audits && this.a11y.audits.length) {
          this.initialData = this.filteredData = this.filterData(
            this.sortData(this.computeInitialData(this.a11y.audits))
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
      this.filteredData = this.filterData(this.initialData);
    },
    computeFilterCategories(initialData) {
      return [...new Set(initialData.map((item) => item.type))];
    },
    computeInitialData(audits) {
      return audits.map((audit) => {
        if (audit.severity === 'critical' || audit.severity === 'serious') {
          audit.class = 'badge-danger';
          audit.type = ERROR;
        } else if (audit.severity === 'moderate' || audit.severity === 'minor') {
          audit.class = 'badge-warning';
          audit.type = WARNING;
        }

        return audit;
      });
    },
  },
};
</script>
