<template>
      <p class="mt0" v-bind:class="classObject">{{msg}}</p>
</template>
<script>
export default {
  props: ["data"],
  computed: {
    msg() {
      return this.data.msg;
    },
    classObject() {
      return [this.data.passed ? "alert--success" : "alert--danger"];
    }
  }
};
</script>