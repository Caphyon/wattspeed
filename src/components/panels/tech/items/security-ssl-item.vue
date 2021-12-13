<template>
  <div class="scrollable--issue" :class="getItemColourClass">
    <p class="mb0 mt0">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ["message", "type"],
  computed: {
    getItemColourClass() {
      switch(this.type) {
        case 'success':
          return 'alert--success';
        case 'warning':
          return 'alert--warning';
        case 'error':
          return 'alert--danger';
        default:
          return 'alert--secondary';
      }
    },
  },
}
</script>
