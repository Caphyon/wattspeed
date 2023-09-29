<template>
  <div>
    <div class="preview-card in-view">
      <div>
        <Title name="Performance"
               icon="pagespeed"
               @click="goTo(true, 'performance')"
               :class="{ 'inactive' : $route.name === 'mobile' }" />
        <Title name="Mobile"
               icon="mobile"
               @click="goTo(true, 'mobile')"
               :class="{ 'inactive' : $route.name === 'performance' }" />
        <button class="absolute right-4 z-10 text-xl"
                @click="goTo(true, 'home')"
                aria-label="Close button"
                title="Close">×
        </button>
      </div>
      <div class="content in-view">
        <LoadingWrapper :loading="loading.performanceMobile" class="h-16 mt-2">
          <MobilePreview class="mt-2" />
        </LoadingWrapper>
        <div class="description">
          The Google's Mobile-Friendly test will analyze a URL and report if the page has a mobile-friendly design.
        </div>
      </div>
    </div>
    <div class="in-view-content" :class="{ 'loading' : loading.performanceMobile }">
      <LoadingWrapper :loading="loading.performanceMobile">
        <div class="flex items-start gap-4">
          <div class="space-y-2 flex-1">
            <div v-for="(audit, index) in audits"
                 :key="index">
              <div>
                <h4 v-html="audit.title"
                    class="badge py-2 font-normal text-sm"
                    :class="audit.passed ? 'badge-success' : 'badge-danger'"/>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <div class="mobile">
              <img class="mobile-screen" v-if="screenshot" :src="screenshot" alt="webpage screenshot"/>
              <img class="mobile-frame h-72" src="../assets/icons/mobile-frame.svg" alt="mobile frame"/>
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </div>
  </div>
</template>

<script>
import Title from "../components/Title.vue";
import MobilePreview from "../components/previews/MobilePreview.vue";
import LoadingWrapper from "../components/LoadingWrapper.vue";
import { marked } from "marked";

export default {
  name: "Mobile",
  components: { LoadingWrapper, MobilePreview, Title },
  inject: {
    performanceMobile: {
      default: () => {
      }
    },
    loading: {
      default: () => false
    }
  },
  methods: {
    //
  },
  computed: {
    audits() {
      const items = [];

      if (this.loading.performanceMobile || !this.performanceMobile.audits) {
        return {};
      }

      Object.keys(this.performanceMobile.audits).forEach((auditKey) => {
        if (auditKey === "viewport" || auditKey === "font-size" || auditKey === "plugins" || auditKey === "content-width") {
          items.push({
            passed: this.performanceMobile.audits[auditKey].score !== null ? this.performanceMobile.audits[auditKey].score : 0,
            title: marked.parseInline(this.performanceMobile.audits[auditKey].title),
          });
        }
      })

      return items;
    },
    screenshot() {
      if (this.loading.performanceMobile || !this.performanceMobile?.audits) {
        return '';
      }
      const finalScreenshot = this.performanceMobile?.audits['final-screenshot']?.details?.data;

      return finalScreenshot || '';
    },
  }
};
</script>
