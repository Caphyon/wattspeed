<template>
    <div class="alert--success scrollable--issue" :class="classObject">
        <h4 class="mt0 mb0">{{title}}</h4>
        <p class="mb0" v-html="msg"></p>
    </div>
</template>
<script>
export default {
  props: ["data"],
  methods: {
    formatLinks(str, url, text, prettierText) {
      str = str.replace(url, "");
      if (url.includes("),")) {
        url = url.replace("),", "");
      } else if (url.includes(").")) {
        url = url.replace(").", "");
      }
      str = str.replace(
        text,
        `<a href="` + url + `" target="_blank">` + prettierText + `</a>`
      );
      return str;
    }
  },
  computed: {
    title() {
      return this.data.title;
    },
    level() {
      return this.data.level;
    },
    classObject() {
      if(this.level < 0.65) return 'alert--danger';
      if(this.level < 0.9) return 'alert--warning';
    },
    msg() {
      const msg = this.data.msg;
      if (!msg) return "";
      let str = msg;

      let urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
      let urls = str.match(urlRegex);

      if (urls != null) {
        urls.forEach(url => {
          if (str.includes("[style calculations](")) {
              str = this.formatLinks(str, url, "[style calculations](", "Style calculations");
          }
          else if (str.includes("[layout reflows](")) {
              str = this.formatLinks(str, url, "[layout reflows](", "Layout reflows");
          }
          else if (str.includes("[Learn more](")) {
              str = this.formatLinks(str, url, "[Learn more](", "Learn more");
          }
        });
      }
      return str;
    }
  }
};
</script>
