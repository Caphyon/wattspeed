<template>
  <div class="preview-card-metrics">
    <div>
      <h3
        class="badge font-semibold"
        :class="getGradeClass(security.grades.headersGrade)">
        {{ getGrade(security.grades.headersGrade) }}
      </h3>
      <span class="uppercase">Headers</span>
    </div>
    <div>
      <h3
        class="badge font-semibold"
        :class="getGradeClass(security.grades.sslGrade)">
        {{ getGrade(security.grades.sslGrade) }}
      </h3>
      <span class="uppercase">SSL</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecurityPreview',
  inject: {
    security: {
      default: () => ({}),
    },
  },
  methods: {
    getGrade(grade) {
      return this.hasGrade(grade) ? grade.grade : 'N/A';
    },
    getGradeClass(grade) {
      const color = this.hasGrade(grade) ? grade.colour : 'default';
      switch (color) {
        case 'green':
          return 'badge-success';
        case 'yellow':
          return 'badge-warning';
        case 'orange':
          return 'badge-orange';
        case 'red':
          return 'badge-danger';
        default:
          return 'badge-secondary';
      }
    },
    hasGrade(grade) {
      return grade != null && Object.keys(grade).indexOf('grade') >= 0 && Object.keys(grade).indexOf('colour') >= 0;
    },
  },
};
</script>
