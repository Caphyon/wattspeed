<template>
  <div class="text--center">
    <h3 class="security-grade-letter mt0 mb0" :class="gradeClass">{{ hasGrade ? grade.grade : 'NA' }}</h3>
    <span class="security-grade-section text--uppercase text--small">{{ section }}</span>
  </div>
</template>

<script>
export default {
  name: 'security-grade',
  props: ["grade", "section"],
  computed: {
    gradeClass() {
      const colour = this.hasGrade ? this.grade.colour : 'default';
      switch(colour) {
        case 'green':
          return ['alert--success'];
        case 'yellow':
          return ['alert--warning'];
        case 'orange':
          return ['alert--orange'];
        case 'red':
          return ['alert--danger'];
        default:
          return ['alert--secondary'];
      }
    },
    hasGrade() {
      return this.grade != null && Object.keys(this.grade).indexOf("grade") >= 0
             && Object.keys(this.grade).indexOf("colour") >= 0;
    },
  },
}
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
