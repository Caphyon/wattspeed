<template>
    <div class="sections__container" :class="loading ? '__nodata' : ''" @click="select()">
      <div class="sections__container--title">
        <svg width="20" height="20" class="section--icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" v-bind:xlink:href="icon"></use>
        </svg>
        <h4 class="mt0 mb0 text--strong">{{title}}</h4>
      </div>
      <div class="sections__container--content">
        <template v-if="loading">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40">
            <path opacity=".2" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
            <path d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z">
              <animateTransform attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 20 20"
                to="360 20 20"
                dur="0.7s"
                repeatCount="indefinite"/>
            </path>
          </svg>
        </template>
        <div v-else-if="hasData">
            <slot></slot>
        </div>
        <template v-else>
          <template v-if="error">
              <p class="alert--danger">
                ERROR: {{error}}
              </p>
          </template>
          <template v-else-if="isValid">
            <p class="alert--success">
              {{$parent.noErrorMessage}}
            </p>
          </template>
            <template v-else>
                <p class="alert--warning">
                  {{noDataMsg}}
                </p>
            </template>
        </template>
      </div>
    </div>
</template>
<script>
export default {
  computed: {
    icon() {
      return `assets/icons/symbols.svg#${this.$parent.icon}`;
    },
    icon2() {
      return `assets/icons/symbols.svg#${this.$parent.icon2}`;
    },
    title() {
      return this.$parent.title;
    },
    title2() {
      return this.$parent.title2;
    },
    loading() {
      return this.$parent.loading;
    },
    hasData() {
      return this.$parent.hasData;
    },
    isValid() {
      return this.$parent.isValid;
    },
    error() {
      return this.$parent.error;
    },
    noDataMsg() {
      return this.$parent.noDataMsg;
    },
    currentPanel() {
        return this.$parent.panelName;
    },
    isActiveFirst() {
      return this.$parent.activeFirst;
    },
    isActiveSecond() {
      return this.$parent.activeSecond;
    },
  },
  methods: {
    select() {
      if (!this.$parent.panelName || this.loading) return;
      EventBus.$emit("changePanel", this.$parent.panelName);
    },
  },
};
</script>
