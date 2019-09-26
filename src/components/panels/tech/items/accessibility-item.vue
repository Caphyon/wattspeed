<template>
    <div class="scrollable--issue" v-bind:class="classObject">
        <h3 class="mt0 mb0" v-html="title"></h3>
        <p v-html="description">
        </p>
        <ul class="list-unstyled">
            <li class="code mb0" v-for="(snippet, index) in snippets" :key="index">{{snippet}}</li>
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
      return `${this.data.description}<br><a href="${this.data.link}" target="_blank">Learn more</a>`;
    },
    snippets() {
      return this.data.snippets;
    },
    classObject() {
      return [
        this.data.severity == "critical" || this.data.severity == "serious"
          ? "alert--danger"
          : "alert--warning"
      ];
    }
  }
};
</script>
