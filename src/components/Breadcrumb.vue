<template>
  <div class="breadcrumb">
    <Title
      v-if="routeFromScore"
      @click="goTo('score')"
      name="Score"
      icon="pagespeed"
      class="inactive" />
    <slot></slot>
    <button
      class="absolute right-4 z-10 text-xl"
      @click="goTo('home')"
      aria-label="Close button"
      title="Close">
      ×
    </button>
  </div>
</template>

<script>
import Title from './Title.vue';

export default {
  name: 'Breadcrumb',
  components: { Title },
  computed: {
    routeFromScore() {
      return this.$route?.query?.from === 'score';
    },
  },
};
</script>
