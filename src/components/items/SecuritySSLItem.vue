<template>
  <div
    class="py-2"
    :class="getItemColourClass">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getItemColourClass() {
      switch (this.type) {
        case 'success':
          return 'badge badge-success';
        case 'warning':
          return 'badge badge-warning';
        case 'error':
          return 'badge badge-danger';
        default:
          return 'badge badge-secondary';
      }
    },
  },
};
</script>
