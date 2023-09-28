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
        <LoadingWrapper :loading="loading.security" class="h-16 mt-2">
          <SecurityPreview class=" mt-2" />
        </LoadingWrapper>
        <div class="description">
          Web security is the process of protecting websites and online services against different security threats that
          exploit vulnerabilities in an application's code or server's configuration.
        </div>
      </div>
    </div>
    <div class="in-view-content" :class="{ 'loading' : loading.security }">
      <LoadingWrapper :loading="loading.security">
        <div class="flex justify-center gap-4">
          <div class="flex-1">
            <h3 class="sticky-area">Headers</h3>
            <div class="space-y-3 h-full">
              <SecurityHeadersItem v-for="(header, key) in security.headersFeedback.headers"
                                   :key="key"
                                   :title="key"
                                   :header="header" />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="sticky-area">SSL</h3>
            <div class="space-y-3 h-full">
              <SecuritySSLItem v-for="(message, key) in security.sslFeedback.errors"
                               :key="key"
                               :message="message"
                               type="error" />
              <SecuritySSLItem v-for="(message, key) in security.sslFeedback.warnings"
                               :key="key"
                               :message="message"
                               type="warning" />
              <SecuritySSLItem v-for="(message, key) in security.sslFeedback.success"
                               :key="key"
                               :message="message"
                               type="success" />
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </div>
  </div>
</template>

<script>
import Title from "../components/Title.vue";
import SecurityPreview from "../components/previews/SecurityPreview.vue";
import LoadingWrapper from "../components/LoadingWrapper.vue";
import SecurityHeadersItem from "../components/items/SecurityHeadersItem.vue";
import SecuritySSLItem from "../components/items/SecuritySSLItem.vue";

export default {
  name: "Security",
  components: { SecuritySSLItem, SecurityHeadersItem, LoadingWrapper, SecurityPreview, Title },
  inject: {
    security: {
      default: () => {
      }
    },
    loading: {
      default: () => false
    }
  },
  methods: {
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
