<template>
  <div class="preview-card-metrics">
    <div>
      <h3
        class="badge font-semibold"
        :class="getClass(errors)">
        <template v-if="errors > 999"> 999+ </template>
        <template v-else>
          {{ errors }}
        </template>
      </h3>
      <span class="metric-title">{{ pluralSingularConverter(errors, 'errors', 'error') }}</span>
    </div>
    <div>
      <h3
        class="badge font-semibold"
        :class="getClass(warnings)">
        {{ warnings }}
      </h3>
      <span class="metric-title">{{ pluralSingularConverter(warnings, 'warnings', 'warning') }}</span>
    </div>
  </div>
</template>

<script>
import { pluralSingularConverter } from '../../assets/scripts/helper';

export default {
  name: 'HTMLPreview',
  inject: {
    html: {
      default: () => ({}),
    },
    errors: {
      default: () => ({}),
    },
  },
  props: {
    hideMessages: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    pluralSingularConverter(count, pl, sg) {
      return pluralSingularConverter(count, pl, sg);
    },
    getClass(count) {
      if (count > 0) {
        return 'badge-danger';
      }
      return 'badge-success';
    },
  },
  computed: {
    errors() {
      return this.html?.messages?.filter((message) => message.type === 'error')?.length || 0;
    },
    warnings() {
      return this.html?.messages?.filter((message) => message.type !== 'error')?.length || 0;
    },
  },
};
</script>
