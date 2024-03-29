<template>
  <div>
    <div class="preview-card in-view">
      <Breadcrumb>
        <Title
          name="HTML5"
          icon="html5" />
      </Breadcrumb>
      <div class="content in-view mt-6">
        <LoadingWrapper
          :loading="loading.html"
          class="mt-2 h-16">
          <HTMLPreview
            class="items-center"
            :hide-messages="true" />
        </LoadingWrapper>
        <div class="description">
          This validator checks the markup validity of a web page and can help you catch unintended mistakes you might
          have otherwise missed.
        </div>
      </div>
    </div>
    <div
      class="in-view-content"
      :class="{ loading: loading.html }">
      <LoadingWrapper
        :loading="loading.html"
        :show-yeey="showYeey">
        <div class="space-y-2">
          <div
            v-for="(issue, index) in filteredData"
            :key="index">
            <div
              class="badge"
              :class="issue.class">
              <h4 v-html="issue.msg"></h4>
              <p class="code">
                <code>{{ issue.mark }}</code>
              </p>
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </div>
    <Filters
      v-if="!loading.html && !showYeey"
      :filters="filters"
      @emitFilter="onFilterChange" />
  </div>
</template>

<script>
import Title from '../components/Title.vue';
import HTMLPreview from '../components/previews/HTMLPreview.vue';
import LoadingWrapper from '../components/LoadingWrapper.vue';
import { ERROR, SUCCESS, WARNING } from '../assets/scripts/constants.js';
import { marked } from 'marked';
import Breadcrumb from '../components/Breadcrumb.vue';
import { sortObjectsArrayData } from '../assets/scripts/helper.js';
import Filters from '../components/Filters.vue';

export default {
  name: 'HTML',
  components: { Filters, Breadcrumb, LoadingWrapper, HTMLPreview, Title },
  inject: {
    html: {
      default: () => {},
    },
    loading: {
      default: () => false,
    },
  },
  data() {
    const filters = {
      'bg-rose-500': {
        identifiers: [ERROR],
        title: 'Toggle errors',
      },
      'bg-amber-500': {
        identifiers: [WARNING],
        title: 'Toggle warnings',
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
  watch: {
    'html.messages': {
      handler() {
        if (this.html && this.html?.messages.length) {
          this.initialData = this.filteredData = this.filterData(this.sortData(this.computeInitialData(this.html)));
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
    computeInitialData(data) {
      return data.messages.map((data) => {
        let newItem = {};
        newItem.msg = marked.parseInline(data.message);
        newItem.mark = data.extract;

        if (data.type === 'error') {
          newItem.class = 'badge-danger';
          newItem.type = ERROR;
        } else if (data.type === 'info') {
          newItem.class = 'badge-warning';
          newItem.type = WARNING;
        }

        return newItem;
      });
    },
  },
  computed: {
    errors() {
      return this.html?.messages?.filter((message) => message.type === 'error')?.length || 0;
    },
    warnings() {
      return this.html?.messages?.filter((message) => message.type !== 'error')?.length || 0;
    },
    showYeey() {
      return this.errors === 0 && this.warnings === 0;
    },
  },
};
</script>
