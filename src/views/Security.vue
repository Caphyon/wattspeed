<template>
  <div>
    <div class="preview-card in-view">
      <Breadcrumb>
        <Title
          name="Security"
          icon="shield" />
      </Breadcrumb>
      <div class="content in-view">
        <LoadingWrapper
          :loading="loading.security"
          class="mt-2 h-16">
          <SecurityPreview class="mt-2" />
        </LoadingWrapper>
        <div class="description">
          Web security is the process of protecting websites and online services against different security threats that
          exploit vulnerabilities in an application's code or server's configuration.
        </div>
      </div>
    </div>
    <div
      class="in-view-content"
      :class="{ loading: loading.security }">
      <LoadingWrapper :loading="loading.security">
        <div class="flex justify-center gap-4">
          <div class="flex-1">
            <h3 class="sticky-area">Headers</h3>
            <div class="h-full space-y-3">
              <SecurityHeadersItem
                v-for="(header, key) in Object.keys(filteredHeaders)"
                :key="key"
                :title="header"
                :header="filteredHeaders[header]" />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="sticky-area">SSL</h3>
            <div class="h-full space-y-3">
              <template v-if="sslErrorsFilterActive">
                <SecuritySSLItem
                  v-for="(message, key) in security.sslFeedback.errors"
                  :key="key"
                  :message="message"
                  type="error" />
              </template>
              <template v-if="sslWarningsFilterActive">
                <SecuritySSLItem
                  v-for="(message, key) in security.sslFeedback.warnings"
                  :key="key"
                  :message="message"
                  type="warning" />
              </template>
              <template v-if="sslSuccessFilterActive">
                <SecuritySSLItem
                  v-for="(message, key) in security.sslFeedback.success"
                  :key="key"
                  :message="message"
                  type="success" />
              </template>
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </div>
    <Filters
      v-if="!loading.security"
      :filters="filters"
      @emitFilter="onFilterChange" />
  </div>
</template>

<script>
import Title from '../components/Title.vue';
import SecurityPreview from '../components/previews/SecurityPreview.vue';
import LoadingWrapper from '../components/LoadingWrapper.vue';
import SecurityHeadersItem from '../components/items/SecurityHeadersItem.vue';
import SecuritySSLItem from '../components/items/SecuritySSLItem.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import Filters from '../components/Filters.vue';
import { sortObjectsData } from '../assets/scripts/helper.js';

export default {
  name: 'Security',
  components: {
    Filters,
    Breadcrumb,
    SecuritySSLItem,
    SecurityHeadersItem,
    LoadingWrapper,
    SecurityPreview,
    Title,
  },
  inject: {
    security: {
      default: () => {},
    },
    loading: {
      default: () => false,
    },
  },
  data() {
    const filters = {
      'bg-rose-500': ['danger', 'red'],
      'bg-amber-500': ['warning', 'yellow', 'orange'],
      'bg-emerald-500': ['success', 'green'],
    };

    return {
      filters: filters,
      activeFilters: Object.keys(filters)
        .map((key) => filters[key])
        .flat(),
    };
  },
  methods: {
    onFilterChange(payload) {
      this.activeFilters = payload;
    },
  },
  computed: {
    headersKeys() {
      return Object.keys(this.security.headersFeedback.headers);
    },
    filteredHeaders() {
      const headers = {};
      if (this.headersKeys) {
        this.headersKeys.forEach((header) => {
          if (this.activeFilters.indexOf(this.security.headersFeedback.headers[header].color) >= 0) {
            headers[header] = this.security.headersFeedback.headers[header];
          }
        });
      }

      return sortObjectsData(headers, ['red', 'orange', 'yellow', 'green'], 'color');
    },
    sslErrorsFilterActive() {
      let show = false;

      this.filters['bg-rose-500'].forEach((key) => {
        if (this.activeFilters.includes(key)) {
          show = true;
        }
      });

      return show;
    },
    sslWarningsFilterActive() {
      let show = false;

      this.filters['bg-amber-500'].forEach((key) => {
        if (this.activeFilters.includes(key)) {
          show = true;
        }
      });

      return show;
    },
    sslSuccessFilterActive() {
      let show = false;

      this.filters['bg-emerald-500'].forEach((key) => {
        if (this.activeFilters.includes(key)) {
          show = true;
        }
      });

      return show;
    },
  },
};
</script>
