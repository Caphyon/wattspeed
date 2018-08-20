<template>
    <div class="scrollable--issue" v-bind:class="classObject">
        <h3 class="mt0 mb0">{{title}}</h3>
        <small class="text--muted mt0">{{standard}}</small>
        <p>{{description}}</p>
        <ul class="list-unstyled">
            <li class="code" v-for="snippet in snippets">{{unescapeHTML(snippet)}}</li>
        </ul>
    </div>
</template>
<script>
export default {
  props: ["data"],
  computed: {
    title() {
      return this.unescapeHTML(this.data.resTitle);
    },
    severity() {
      return this.data.severity;
    },
    certainty() {
      return this.data.certainty;
    },
    description() {
      return this.unescapeHTML(this.data.description);
    },
    standard() {
      return this.data.standard;
    },
    snippets() {
      return this.data.snippets;
    },
    classObject() {
      return [this.certainty == 100 ? "alert--danger" : "alert--warning"];
    }
  },
  methods: {
    unescapeHTML(text) {
      const temp = document.createElement("div");
      temp.innerHTML = text;
      const result = temp.childNodes[0].nodeValue;
      temp.removeChild(temp.firstChild);
      return result;
    }
  }
};
</script>