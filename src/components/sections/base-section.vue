<script>
import Vue from "vue";

export default {
  data() {
    return {
      title: "",
      title2: "",
      desc: "",
      error: "",
      noDataMsg: "No data found.",
      panelName: null,
      loading: true,
    };
  },
  beforeDestroy() {
    EventBus.$off("refreshData");
  },
  methods: {
    back() {
      this.$parent.changePanel("tech");
    },
    makeRequest(request, StorageName, strategy, callback) {
      const url = request.url || request;
      const cache_key = Buffer.from(`${StorageName}${strategy}${this.tab.url}`).toString('base64');
      const data = localStorage.getItem(cache_key);

      if (data != null) {
        callback(JSON.parse(data));
        return;
      }

      fetch(request)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then(data => {
          localStorage.setItem(cache_key, JSON.stringify(data));
          callback(data);
        })
        .catch(error => {
          this.error = error.message || "An error occured while fetching the data";
          this.loading = false;
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
