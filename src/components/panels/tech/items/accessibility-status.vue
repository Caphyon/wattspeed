<template>
    <div class="section__header--stats px2 py1">
        <div class="text--center" v-if="issues">
          <h3 class="alert--danger mt0 mb0">{{issues}}</h3>
          <span class="text--uppercase">issues</span>
        </div>
        <div class="text--center" v-if="warnings">
          <h3 class="alert--warning mt0 mb0">{{warnings}}</h3>
          <span class="text--uppercase">warnings</span>
        </div>
        <div class="text--center" v-if="score">
          <h3 class="mt0 mb0" v-bind:class="classObject">{{score.toFixed(0)}}%</h3>
          <span class="text--uppercase">score</span>
        </div>
    </div>
</template>
<script>
export default {
  props: ["issues", "warnings", "score"],
  computed: {
    classObject() {
      if (this.score < 65) return ["alert--danger"];
      if (this.score < 90) return ["alert--warning"];
      return ["alert--success"];
    }
  }
};
</script>

<style lang="scss" scoped>
  .section__header--stats {
    display: flex;

    div {
      margin: 0 auto;
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
