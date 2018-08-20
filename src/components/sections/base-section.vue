<script>
import Vue from "vue";

export default {
  data() {
    return {
      title: "",
      desc: "",
      error: "",
      noDataMsg: "No data found.",
      panelName: null,
      loading: true,
    };
  },
  methods: {
    back() {
      this.$parent.changePanel("tech");
    },
    makeRequest(request, callback) {
      const url = request.url || request;
      const cache_key = btoa(url + this.tab.url);
      chrome.storage.local.get(cache_key, result => {
        const data = result[cache_key];
        if (!!data) {
          callback(JSON.parse(data));
          return;
        }
        fetch(request)
          .then(response => {
            if (response.ok) return response.json();
            throw new Error(response.statusText);
          })
          .then(data => {
            const cache_value = JSON.stringify(data);
            const cache_obj = {};
            cache_obj[cache_key] = cache_value;
            chrome.storage.local.set(cache_obj, () => {});
            callback(data);
          })
          .catch(error => {
            this.error =
              error.message || "An error occured while fetching the data";
            this.loading = false;
          });
      });
    }
  },
  computed: {
    tab() {
      return this.$parent.tab;
    },
    hasData() {
      return !this.loading && !this.error;
    }
  }
};
</script>