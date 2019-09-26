<template>
  <div class="text--center">
    <h3 class="mt0 mb0" v-bind:class="classObject">{{(score * 100).toFixed(0)}}</h3>
    <span class="text--uppercase">{{type}}</span>
  </div>
</template>
<script>
export default {
  props: ["score", "type"],
  computed: {
    classObject() {
      if (this.score < 0.65) return ["alert--danger"];
      if (this.score < 0.9) return ["alert--warning"];
      return ["alert--success"];
    }
  }
};
</script>

<style lang="scss" scoped>
  .section__header--stats {

    div {
      width: 100%;

      &:not(:last-of-type) {
        border-right: 1px solid rgba(255,255,255,.3);
      }

      h3 {
        display: inline-block;
      }

      span {
        display: block;
      }
    }
  }
</style>
