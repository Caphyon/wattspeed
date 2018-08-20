<template>
    <div class="alert--success scrollable--issue" :class="{'alert--danger' : level>0}">
        <h4 class="mt0 mb0">{{title}}</h4>
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
    msg() {
      const msg = this.data.msg;
      if (!msg) return "";
      let str = msg.format;
      if (!msg.args) return str;
      msg.args.forEach(arg => {
        switch (arg.key) {
          case "LINK":
            {
              str = str.replace(
                "{{BEGIN_LINK}}",
                ['<a href="', arg.value, '" target="blank">'].join("")
              );
              str = str.replace("{{END_LINK}}", "</a>");
            }
            break;

          case "NUM_REDIRECTS":
            {
              str = str.replace("{{NUM_REDIRECTS}}", arg.value);
            }
            break;

          case "NUM_SCRIPTS":
            {
              str = str.replace("{{NUM_SCRIPTS}}", arg.value);
            }
            break;

          case "NUM_CSS":
            {
              str = str.replace("{{NUM_CSS}}", arg.value);
            }
            break;
        }
      });
      return str;
    }
  }
};
</script>
