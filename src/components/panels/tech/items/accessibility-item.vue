<template>
  <div class="scrollable--issue" v-bind:class="classObject">
    <h3 class="mt0 mb0" v-html="title"></h3>
    <p v-html="description"></p>
    <ul class="list-unstyled">
      <li class="code mb0" v-for="(snippet, index) in snippets" :key="index">
        <code>{{ snippet }}</code>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["data"],
  computed: {
    title() {
      return this.data.title;
    },
    description() {
      return this.data.description;
    },
    snippets() {
      return this.data.snippets;
    },
    classObject() {
      switch (this.data.severity) {
        case 'critical':
        case 'serious':
          return 'alert--danger';
        default:
          return 'alert--warning';
      }
    },
  }
};
</script>
