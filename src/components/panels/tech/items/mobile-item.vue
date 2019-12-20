<template>
    <p class="mt0" v-bind:class="classObject">{{parseText(msg)}}</p>
</template>
<script>
export default {
  props: ["data"],
  computed: {
    msg() {
      return this.data.title;
    },
    classObject() {
      return [this.data.passed ? "alert--success" : "alert--danger"];
    }
  },
  methods: {
    parseText(msg){
      if (msg.includes('`')){
        msg = msg.replace(/`/g, "");
      }
      return msg;
    },
  },
};
</script>
