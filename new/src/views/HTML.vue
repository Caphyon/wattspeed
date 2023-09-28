<template>
  <div>
    <div class="preview-card in-view">
      <div>
        <Title name="HTML" icon="html5" />
        <button class="absolute right-4 z-10 text-xl"
                @click="goTo(true, 'home')"
                aria-label="Close button"
                title="Close">×
        </button>
      </div>
      <div class="content in-view">
        <LoadingWrapper :loading="loading.html" class="h-16 mt-2">
          <HTMLPreview class="mt-2" :hide-messages="true" />
        </LoadingWrapper>
        <div class="description">
          This validator checks the markup validity of a web page and can help you catch unintended mistakes you might
          have otherwise missed.
        </div>
      </div>
    </div>
    <div class="in-view-content" :class="{ 'loading' : loading.html }">
      <LoadingWrapper :loading="loading.html">
        <div class="space-y-2">
          <div v-for="(issue, index) in filteredData"
               :key="index">
            <div :class="issue.class">
              <h4 v-html="issue.msg"></h4>
              <p class="code">
                <code>{{ issue.mark }}</code>
              </p>
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </div>
  </div>
</template>

<script>
import Title from "../components/Title.vue";
import HTMLPreview from "../components/previews/HTMLPreview.vue";
import LoadingWrapper from "../components/LoadingWrapper.vue";
import { ERRORS, WARNINGS } from "../../../src/assets/utils/consts.js";
import { marked } from "marked";

export default {
  name: "HTML",
  components: { LoadingWrapper, HTMLPreview, Title },
  inject: {
    html: {
      default: () => {
      }
    },
    loading: {
      default: () => false
    }
  },
  data() {
    return {
      initialData: [],
      filteredData: [],
      initialFilterTypes: []
    };
  },
  watch: {
    "html.messages": {
      handler() {
        if (this.html && this.html?.messages.length) {
          this.initialData = this.filteredData = this.computeInitialData(this.html);
          this.initialFilterTypes = this.computeFilterCategories(this.initialData);
        }
      },
      immediate: true
    }
  },
  methods: {
    computeFilterCategories(initialData) {
      return [...new Set(initialData.map(item => item.type))];
    },
    computeInitialData(data) {
      return data.messages.map((data) => {
        let newItem = {};
        newItem.msg = marked.parseInline(data.message);
        newItem.mark = data.extract;

        if (data.type === "error") {
          newItem.class = "badge badge-danger";
          newItem.type = ERRORS;
        } else if (data.type === "info") {
          newItem.class = "badge badge-warning";
          newItem.type = WARNINGS;
        }

        return newItem;
      });
    },
  }
};
</script>
