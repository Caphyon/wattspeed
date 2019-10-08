<template>
  <div class="text--right text--extrasmall py1">
    <label class="cursor--pointer filter__checkbox filter--success"
           v-if="this.filterCategories.includes(Success)"
           :class="updatedCategories.includes(Success) ? 'text--success' : 'text--muted'"
           @click="setFilter(Success)"
           title="Toggle success checks">
    </label>
    <label class="cursor--pointer filter__checkbox filter--warning"
           v-if="this.filterCategories.includes(Warnings)"
           :class="updatedCategories.includes(Warnings) ? 'text--warning' : 'text--muted'"
           @click="setFilter(Warnings)"
           title="Toggle warning checks">
    </label>
    <label class="cursor--pointer filter__checkbox filter--danger"
           v-if="this.filterCategories.includes(Errors)"
           :class="updatedCategories.includes(Errors) ? 'text--danger' : 'text--muted'"
           @click="setFilter(Errors)"
           title="Toggle error checks"></label>
  </div>
</template>
<script>
import { SUCCESS, WARNINGS, ERRORS} from './../../../../assets/utils/consts';

export default {
  props: {filterCategories: {type: Array, required: true}},

  data: function () {
    return {
      Success: SUCCESS,
      Warnings: WARNINGS,
      Errors: ERRORS,
      updatedCategories: this.filterCategories,
    }
  },

  methods: {
    setFilter(a_field) {
      if (this.updatedCategories.length == 1 && a_field == this.updatedCategories[0]) {
        return;
      }
      if (this.updatedCategories.includes(a_field)) {
        this.updatedCategories = this.updatedCategories.filter(elem => elem !== a_field);
        this.$emit('onFilter', this.updatedCategories);
      } else {
        this.updatedCategories.push(a_field);
        this.$emit('onFilter', this.updatedCategories);
      }
    }

  }
};
</script>
