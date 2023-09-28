<template>
  <div v-if="hasData" class="flex flex-col gap-2">
    <p v-if="isValid" class="badge badge-success">No html issues found.</p>
    <template v-else>
      <p class="badge badge-danger">Html issues found while checking the page.</p>
      <ul v-if="!hideMessages" class="space-y-2">
        <li v-for="(message, index) in getMessages()"
            :key="index"
            class="scrollable--issue mb1"
            :class="message.class">
          <p class="mt0 mb0"
             v-html="message.msg"></p>
        </li>
      </ul>
    </template>
  </div>
  <template v-else>
    <template v-if="errors.html">
      <p class="badge badge-danger">
        ERROR: {{ errors.html }}
      </p>
    </template>
    <template v-else-if="isValid">
      <p class="badge badge-success">
        This page does not contain HTML5 issues.
      </p>
    </template>
    <template v-else>
      <p class="badge badge-warning">
        No data found
      </p>
    </template>
  </template>
</template>

<script>
import { marked } from "marked";

export default {
  name: "HTMLPreview",
  inject: {
    html: {
      default: () => ({})
    },
    errors: {
      default: () => ({})
    }
  },
  props: {
    hideMessages: {
      type: Boolean,
      default: () => false,
    }
  },
  methods: {
    hide() {
      return hide
    },
    getClass(type) {
      const typeToClasses = {
        warning: "badge badge-warning",
        info: "badge badge-warning",
        error: "badge badge-danger"
      };

      return typeToClasses[type] || "badge badge-success";
    },
    getMessages() {
      if (this.html.messages.length > 0) {
        return this.html.messages.map((message) => {
          return {
            msg: marked.parseInline(message.message),
            type: message.subType || message.type,
            mark: message.extract,
            class: this.getClass(message.type)
          };
        });
      }

      return [];
    }
  },
  computed: {
    isValid() {
      for (let i in this.html.messages) {
        const message = this.html.messages[i];
        if (message.type === "warning" || message.type === "error" || message.type === "info") {
          return false;
        }
      }

      return true;
    },
    hasData() {
      try {
        return !this.errors.html && this.html.messages.length > 0;
      } catch (e) {
        this.errors.html = "Something went wrong, please try again!";
      }
    }
  }
};
</script>
