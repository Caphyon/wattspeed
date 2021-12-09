<template>
    <div class="scrollable--issue" :class="classObject">
        <h4 class="mt0 mb0" v-html="title"></h4>
        <p class="mb0" v-html="msg"></p>
    </div>
</template>
<script>
export default {
  props: ["data"],
  computed: {
    title() {
      return this.data.title;
    },
    level() {
      return this.data.level;
    },
    classObject() {
      if (this.level >= 0.9) {
        return 'alert--success';
      }

      if (this.level >= 0.65) {
        return 'alert--warning';
      }

      return 'alert--danger';
    },
    msg() {
      return this.data.msg;
    },
  }
};
</script>
