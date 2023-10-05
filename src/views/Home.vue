<template>
  <main class="grid grid-cols-2 gap-4 p-4">
    <div
      v-for="(section, index) in sections"
      :key="index"
      class="preview-card"
      @click="goTo(section.routeName, !loading[section.loadingKey])"
      :class="{ loading: loading[section.loadingKey] }">
      <Title
        :name="section.title"
        :icon="section.icon" />
      <div class="content">
        <LoadingWrapper :loading="loading[section.loadingKey]">
          <component :is="section.componentName" />
        </LoadingWrapper>
      </div>
    </div>
  </main>
</template>
<script>
import PerformancePreview from '../components/previews/PerformancePreview.vue';
import CrUXPreview from '../components/previews/CrUXPreview.vue';
import LoadingWrapper from '../components/LoadingWrapper.vue';
import SecurityPreview from '../components/previews/SecurityPreview.vue';
import HTMLPreview from '../components/previews/HTMLPreview.vue';
import A11yPreview from '../components/previews/A11yPreview.vue';
import ScorePreview from '../components/previews/ScorePreview.vue';
import Title from '../components/Title.vue';

export default {
  name: 'Home',
  components: {
    ScorePreview,
    Title,
    SecurityPreview,
    PerformancePreview,
    CrUXPreview,
    LoadingWrapper,
    HTMLPreview,
    A11yPreview,
  },
  inject: {
    loading: {
      default: () => ({}),
    },
  },
  data() {
    return {
      sections: [
        {
          title: 'Score',
          icon: 'pagespeed',
          routeName: 'score',
          loadingKey: 'score',
          componentName: 'ScorePreview',
        },
        {
          title: 'CrUX',
          icon: 'crux',
          routeName: 'crux-url',
          loadingKey: 'crux',
          componentName: 'CrUXPreview',
        },
        {
          title: 'Performance',
          icon: 'pagespeed',
          routeName: 'performance',
          loadingKey: 'performance',
          componentName: 'PerformancePreview',
        },
        {
          title: 'Security',
          icon: 'shield',
          routeName: 'security',
          loadingKey: 'security',
          componentName: 'SecurityPreview',
        },
        {
          title: 'HTML',
          icon: 'html5',
          routeName: 'html',
          loadingKey: 'html',
          componentName: 'HTMLPreview',
        },
        {
          title: 'Accessibility',
          icon: 'a11y',
          routeName: 'a11y',
          loadingKey: 'a11y',
          componentName: 'A11yPreview',
        },
      ],
    };
  },
};
</script>
