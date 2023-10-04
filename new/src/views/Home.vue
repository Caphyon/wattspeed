<template>
  <main class="grid grid-cols-2 gap-4 p-4">
    <div class="preview-card" @click="goTo(!loading.score, 'score')"
         :class="{ 'loading' : loading.score }">
      <Title name="Score" icon="pagespeed" />
      <div class="content">
        <LoadingWrapper :loading="loading.score">
          <ScorePreview />
        </LoadingWrapper>
      </div>
    </div>
    <div class="preview-card" @click="goTo(!loading.crux, 'crux-url')"
         :class="{ 'loading' : loading.crux }">
      <Title name="CrUX" icon="crux" />
      <div class="content">
        <LoadingWrapper :loading="loading.crux">
          <CrUXPreview />
        </LoadingWrapper>
      </div>
    </div>
    <div class="preview-card" @click="goTo(!loading.performance, 'performance')"
         :class="{ 'loading' : loading.performance }">
      <Title name="Performance" icon="pagespeed" />
      <div class="content">
        <LoadingWrapper :loading="loading.performance">
          <PerformancePreview />
        </LoadingWrapper>
      </div>
    </div>
    <div class="preview-card" @click="goTo(!loading.security, 'security')"
         :class="{ 'loading' : loading.security }">
      <Title name="Security" icon="shield" />
      <div class="content">
        <LoadingWrapper :loading="loading.security">
          <SecurityPreview />
        </LoadingWrapper>
      </div>
    </div>
    <div class="preview-card" @click="goTo(!loading.html, 'html')"
         :class="{ 'loading' : loading.html }">
      <Title name="HTML5" icon="html5" />
      <div class="content">
        <LoadingWrapper :loading="loading.html">
          <HTMLPreview />
        </LoadingWrapper>
      </div>
    </div>
    <div class="preview-card" @click="goTo(!loading.a11y, 'a11y')"
         :class="{ 'loading' : loading.a11y }">
      <Title name="Accessibility" icon="a11y" />
      <div class="content">
        <LoadingWrapper :loading="loading.a11y">
          <A11yPreview />
        </LoadingWrapper>
      </div>
    </div>
  </main>
</template>
<script>
import TechnologiesPreview from "../components/previews/TechnologiesPreview.vue";
import PerformancePreview from "../components/previews/PerformancePreview.vue";
import CrUXPreview from "../components/previews/CrUXPreview.vue";
import LoadingWrapper from "../components/LoadingWrapper.vue";
import SecurityPreview from "../components/previews/SecurityPreview.vue";
import HTMLPreview from "../components/previews/HTMLPreview.vue";
import A11yPreview from "../components/previews/A11yPreview.vue";
import ScorePreview from "../components/previews/ScorePreview.vue";
import Title from "../components/Title.vue";

export default {
  name: "Home",
  components: {
    ScorePreview,
    Title,
    SecurityPreview,
    TechnologiesPreview,
    PerformancePreview,
    CrUXPreview,
    LoadingWrapper,
    HTMLPreview,
    A11yPreview
  },
  inject: {
    loading: {
      default: () => ({})
    }
  },
};
</script>
