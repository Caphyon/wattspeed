<template>
  <div>
    <div class="preview-card in-view">
      <div>
        <Title name="Accessibility" icon="a11y" />
<!--        <Title name="Accessibility2" icon="a11y" class="inactive"/>-->
        <button class="absolute right-4 z-10 text-xl"
                @click="goTo(true, 'home')"
                aria-label="Close button"
                title="Close">×</button>
      </div>
      <div class="content in-view">
        <LoadingWrapper :loading="loading.a11y" class="h-16 mt-2">
          <A11yPreview class=" mt-2"/>
        </LoadingWrapper>
        <div class="description">
          The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect. (Tim Berners-Lee, W3C Director and inventor of the World Wide Web)
        </div>
      </div>
    </div>
    <div class="in-view-content" :class="{ 'loading' : loading.a11y }">
      <LoadingWrapper :loading="loading.a11y">
        <div v-for="(audit, index) in filteredData" :key="index">
          <div :class="getIssueClass(audit.severity)">
            <h4 v-html="audit.title"></h4>
            <p class="text-sm" v-html="audit.description"></p>
            <ul class="list-unstyled">
              <li class="code" v-for="(snippet, index) in audit.snippets" :key="index">
                <code>{{ snippet }}</code>
              </li>
            </ul>
          </div>
        </div>
      </LoadingWrapper>
    </div>
  </div>
</template>

<script>
import Title from "../components/Title.vue";
import A11yPreview from "../components/previews/A11yPreview.vue";
import LoadingWrapper from "../components/LoadingWrapper.vue";
import { ERRORS, WARNINGS } from "../../../src/assets/utils/consts.js";

export default {
  name: "A11y",
  components: { LoadingWrapper, A11yPreview, Title },
  inject: {
    a11y: {
      default: () => {},
    },
    loading: {
      default: () => false,
    },
  },
  data() {
    return {
      initialData: [],
      filteredData: [],
      initialFilterTypes: [],
    };
  },
  watch: {
    'a11y.audits': {
      handler() {
        if (this.a11y.audits && this.a11y.audits.length) {
          this.initialData = this.filteredData = this.computeInitialData(this.a11y.audits);
          this.initialFilterTypes = this.computeFilterCategories(this.initialData);
        }
      },
      immediate: true,
    },
  },
  methods: {
    computeFilterCategories(initialData) {
      return [... new Set(initialData.map(item => item.type))];
    },
    computeInitialData(audits) {
      return audits.map((audit)=> {
        if(audit.severity === 'critical' || audit.severity === "serious") {
          audit.class = 'badge badge-danger';
          audit.type = ERRORS;
        } else if(audit.severity === 'moderate' || audit.severity === "minor") {
          audit.class = 'badge badge-warning';
          audit.type = WARNINGS;
        }

        return audit;
      });
    },
    getIssueClass(severity) {
      switch (severity) {
        case 'critical':
        case 'serious':
          return 'badge badge-danger';
        default:
          return 'badge badge-warning';
      }
    },
  }
};
</script>
