<template>
  <div class="filters-wrapper flex items-center justify-end gap-1 py-2 pr-6">
    <template
      v-for="key in filtersKeys"
      :key="key">
      <label
        class="filter-item"
        :class="getFilterClass(key)"
        @click="toggleFilter(key)"
        title="Toggle success checks">
      </label>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  props: {
    filters: {
      type: Object,
      default: () => [],
    },
  },
  data() {
    return {
      activeFilters: Object.keys(this.filters),
    };
  },
  methods: {
    emitFilters() {
      this.$emit(
        'emitFilter',
        Object.keys(this.filters)
          .filter((key) => this.activeFilters.includes(key))
          .map((key) => this.filters[key])
          .flat()
      );
    },
    toggleFilter(key) {
      const filterIndex = this.activeFilters.indexOf(key);
      const isFilterActive = filterIndex >= 0;

      if (isFilterActive) {
        if (this.activeFilters.length > 1) {
          this.activeFilters.splice(filterIndex, 1);
          this.emitFilters();
        }
      } else {
        this.activeFilters.push(key);
        this.emitFilters();
      }
    },
    getFilterClass(key) {
      const classes = [key];
      if (this.activeFilters.includes(key)) {
        classes.push('active');
      }
      return classes;
    },
  },
  computed: {
    filtersKeys() {
      return Object.keys(this.filters);
    },
  },
};
</script>
