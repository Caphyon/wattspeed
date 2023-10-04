<template>
  <Title v-if="routeFromScore"
         @click="goTo(true, 'score')"
         name="Score" icon="pagespeed"
         class="inactive" />
  <slot></slot>
  <button class="absolute right-4 z-10 text-xl"
          @click="goTo(true, 'home')"
          aria-label="Close button"
          title="Close">×
  </button>
</template>

<script>
import Title from "./Title.vue";

export default {
  name: "Breadcrumb",
  components: {Title},
  computed: {
    routeFromScore() {
      return this.$route?.query?.from === 'score';
    }
  },
}
</script>
