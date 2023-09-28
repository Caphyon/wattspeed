<template>
  <div>
    <div class="preview-card in-view">
      <div>
        <Title name="Security" icon="shield" />
        <button class="absolute right-4 z-10 text-xl"
                @click="goTo(true, 'home')"
                aria-label="Close button"
                title="Close">×
        </button>
      </div>
      <div class="content in-view">
        <LoadingWrapper :loading="loading.performance" class="h-16 mt-2">
          <PerformancePreview class=" mt-2" />
        </LoadingWrapper>
        <div class="description">
          Performance measures the performance of a page for mobile devices and desktop devices. It fetches the url
          twice, once with a mobile user-agent, and once with a desktop-user agent.
        </div>
      </div>
    </div>
    <div class="in-view-content" :class="{ 'loading' : loading.performance }">
      <LoadingWrapper :loading="loading.performance">
        <div class="flex justify-center gap-4">
          <div class="flex-1">
            <h3 class="sticky-area">Mobile</h3>
            <div class="space-y-3 h-full">
              <PerformanceItem v-for="(audit, index) in filteredMobileData"
                               :audit="audit"
                               :key="index" />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="sticky-area">Desktop</h3>
            <div class="space-y-3 h-full">
              <PerformanceItem v-for="(audit, index) in filteredDesktopData"
                               :audit="audit"
                               :key="index" />
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </div>
  </div>
</template>

<script>
import Title from "../components/Title.vue";
import LoadingWrapper from "../components/LoadingWrapper.vue";
import { ERRORS, WARNINGS, SUCCESS, DESKTOP, MOBILE } from "../../../src/assets/utils/consts.js";
import PerformancePreview from "../components/previews/PerformancePreview.vue";
import PerformanceItem from "../components/items/PerformanceItem.vue";
import { marked } from "marked";

export default {
  name: "Performance",
  components: { PerformanceItem, PerformancePreview, LoadingWrapper, Title },
  inject: {
    performance: {
      default: () => {
      }
    },
    loading: {
      default: () => false
    }
  },
  watch: {
    "performance.mobile.lighthouse": {
      handler() {
        if (this.performance[MOBILE].lighthouse) {
          this.initialMobileData = this.filteredMobileData = this.computeInitialData(this.performance[MOBILE].lighthouse);
          this.initialFilterTypes = this.computeFilterCategories(this.initialMobileData, this.initialDesktopData);
        }
      },
      immediate: true,
    },
    "performance.desktop.lighthouse": {
      handler() {
        if (this.performance[DESKTOP].lighthouse) {
          this.initialDesktopData = this.filteredDesktopData = this.computeInitialData(this.performance[DESKTOP].lighthouse);
          this.initialFilterTypes = this.computeFilterCategories(this.initialMobileData, this.initialDesktopData);
        }
      },
      immediate: true,
    }
  },
  data() {
    return {
      initialDesktopData: [],
      initialMobileData: [],
      initialFilterTypes: [],
      filteredMobileData: [],
      filteredDesktopData: []
    };
  },
  methods: {
    computeFilterCategories(initialData) {
      return [...new Set(initialData.map(item => item.type))];
    },
    computeInitialData(audits) {
      const renderer = new marked.Renderer();
      renderer.link = function(href, title, text) {
        let link = marked.Renderer.prototype.link.call(this, href, title, text);
        return link.replace('<a','<a target="_blank" ');
      };
      marked.setOptions({
        renderer: renderer
      });

      return audits.map((audit) => {
        let newItem = {};
        newItem.title = marked.parseInline(audit.title);
        newItem.level = audit.score;
        newItem.description = marked.parseInline(audit.description);

        if (audit.score >= 0.9) {
          newItem.type = SUCCESS;
        } else if (audit.score >= 0.65) {
          newItem.type = WARNINGS;
        } else  {
          newItem.type = ERRORS;
        }

        return newItem;
      });
    },
    getIssueClass(severity) {
      switch (severity) {
        case "critical":
        case "serious":
          return "badge badge-danger";
        default:
          return "badge badge-warning";
      }
    }
  }
};
</script>
