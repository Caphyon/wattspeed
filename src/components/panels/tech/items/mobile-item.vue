<template>
  <div class="scrollable--issue" :class="classObject">
    <p class="mt0 mb0" v-html="msg"></p>
  </div>
</template>

<script>
export default {
  props: ["data"],
  computed: {
    msg() {
      return this.data.title;
    },
    classObject() {
      return this.data.passed ? 'alert--success' : 'alert--danger';
    },
  },
};
</script>
