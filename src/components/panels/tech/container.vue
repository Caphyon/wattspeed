<template>
  <div class="mainContent">
    <div class="section__header">
      <div class="section__header--title">
        <svg width="20" height="20" class="section--icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" v-bind:xlink:href="icon"></use>
        </svg>
        <h3 class="mt0 mb0 text--uppercase text--strong" v-if="title">{{title}}</h3>
      </div>
      <a class="close" aria-label="Close button" href="#" v-on:click="close()">×</a>
      <slot name="header"></slot>
      <p class="text--center" v-if="desc">{{desc}}</p>
    </div>
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
    <template v-else>
      <template v-if="hasData">
        <div class="scrollable">
          <slot></slot>
        </div>
      </template>
      <template v-else>
        <p v-if="!!error" class="alert--danger">ERROR: {{error}}</p>
        <p v-else class="alert--warning">{{noDataMsg}}</p>
      </template>
    </template>
  </div>
</template>
<script>
import SectionContainer from "./../../sections/section-container";

export default {
  mixins: [SectionContainer],
  computed: {
    desc() {
      return this.$parent.desc;
    }
  },
  methods: {
    close() {
      EventBus.$emit("changePanel", "tech");
    }
  }
};
</script>
<style lang="scss" scoped>

// Sections
.section {

  &__header {
    position: relative;
    background-image: linear-gradient(to bottom, transparent, rgba(0,0,0,.3));
    color: #fff;
    margin: -1rem -1rem 0 -1rem;
    padding: 1rem;

    &--title {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2rem;
    }
  }
}

// Sections - scrollable area
.scrollable {
  width: 100%;
  height: 310px;
  overflow-y: auto;
  margin-top: 1rem;

  &__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }

  &--issue {
    padding: 1rem;

    &:not(:last-of-type) {
      margin-bottom: 1rem;
    }
  }
}

// Close button
.close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  opacity: .5;
  text-decoration: none;

  &:hover {
    opacity: 1;
  }
}

// Empty states
.state {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;

  &--sparks {
    animation: sparks .5s linear;
  }

  &--success {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
    animation: success 1s linear;
  }
}

@keyframes sparks {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}

@keyframes success {
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>

