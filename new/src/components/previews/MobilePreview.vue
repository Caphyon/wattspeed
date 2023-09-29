<template>
  <div class="text-center">
    <span v-if="!loading.performanceMobile"
          class="badge"
       :class="passed ? 'badge-danger' : 'badge-success'">
      {{ message }}
    </span>
  </div>
</template>

<script>

export default {
  name: "MobilePreview",
  inject: {
    performanceMobile: {
      default: () => ({})
    },
    loading: {
      default: () => ({})
    },
    errors: {
      default: () => ({})
    }
  },
  data() {
    return {
      message: null,
    };
  },
  mounted() {
    if (this.passed) {
      this.message = "This page is not mobile friendly!";
    } else {
      this.message = "Awesome! This page is mobile friendly!";
    }
  },
  computed: {
    passed() {
      const { viewport } = this.performanceMobile?.audits;
      return viewport.score === 0 || viewport.score === null;
    },
  }
};
</script>
