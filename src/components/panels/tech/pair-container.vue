<template>
  <div class="mainContent">
    <div class="section__header">
      <div class="sections__container--title" v-if="title" @click="changeTab(title)"
           :class="{ 'active' : isActiveFirst }">
        <svg width="20" height="20" class="section--icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" v-bind:xlink:href="icon"></use>
        </svg>
        <h4 class="mt0 mb0 text--strong">{{title}}</h4>
      </div>
      <div class="sections__container--title" v-if="title2" @click="changeTab(title2)"
           :class="{ 'active' : isActiveSecond }">
        <svg width="20" height="20" class="section--icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" v-bind:xlink:href="icon2"></use>
        </svg>
        <h4 class="mt0 mb0 text--strong">{{title2}}</h4>
      </div>
      <a class="close" aria-label="Close button" href="#" @click="close()" title="Close">×</a>
      <slot name="header"></slot>
      <p class="sections__container--description text--center text--small px2 py1" v-if="desc">{{desc}}</p>
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
        <div class="scrollable _word--break" :class="getContainerHeight()">
          <slot></slot>
        </div>
        <slot name="filters"></slot>
      </template>
      <template v-if="isValid && !error">
        <div class="scrollable _word--break" :class="getContainerHeight()">
          <div class="state">
            <svg viewBox="0 0 386.9 345.3" xmlns="http://www.w3.org/2000/svg" width="250">
              <path d="m121.7 215.3 54.5 54.5 120-120c14.1 19.7 22.5 43.9 22.5 70 0 66.6-53.9 120.5-120.5 120.5s-120.5-54-120.5-120.5 54-120.5 120.5-120.5c25.6 0 49.4 8 68.9 21.6" fill="none" stroke="#6ed499" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="10" class="state--success"/>
              <g class="state--sparks" style="transform-origin: center center">
                <path d="m157 23.5c-1.6 4.7-3 6.9-6.4 10.4-1.1-.9-1.7-1.4-2.8-2.3 2.3-3.5 3.1-5.5 3.6-9.5 2.2.5 3.3.8 5.6 1.4zm-71 79c-2.9 0-5.2 2.3-5.2 5.2s2.3 5.2 5.2 5.2 5.2-2.3 5.2-5.2-2.3-5.2-5.2-5.2zm155.4-60.5c0-2.1-1.7-3.7-3.7-3.7s-3.7 1.7-3.7 3.7c0 2.1 1.7 3.7 3.7 3.7s3.7-1.6 3.7-3.7zm113.5 92.9c-.4-3.7-3.7-6.3-7.3-5.9-3.7.4-6.3 3.7-5.9 7.3.4 3.7 3.7 6.3 7.3 5.9 3.7-.4 6.3-3.7 5.9-7.3z" fill="#ffd600"/>
                <path d="m336.8 103.3c-7.4 2.6-10.9 4.8-16.6 10.4-2.1-1.8-3.2-2.6-5.3-4.4 5.3-7.8 8.9-11.1 17.2-16 1.9 4 2.8 6 4.7 10zm-146.7-31.3c0-2.1-1.7-3.7-3.7-3.7-2.1 0-3.7 1.7-3.7 3.7s1.7 3.7 3.7 3.7 3.7-1.6 3.7-3.7zm-143.1-6.3c-.7-4-1.4-5.9-3.7-9.1-1 .6-1.5.9-2.5 1.4 1.3 3.1 1.7 4.8 1.6 8.1 1.9-.2 2.8-.3 4.6-.4zm4 85.9c-.2-1.8-1.8-3.1-3.7-2.9s-3.1 1.8-2.9 3.7c.2 1.8 1.8 3.1 3.7 2.9s3.1-1.8 2.9-3.7zm-30.9 91.4c10.8-.7 16.2-2.3 25.5-7.5-1.3-2.9-1.9-4.3-3.2-7.1-8.6 2.8-13.2 3.3-22.1 2.2 0 4.9-.1 7.4-.2 12.4z" fill="#f7931e"/>
                <path d="m205.3 0c1.1 7.8 2.6 11.6 7 18.3-2.1 1.8-3.2 2.6-5.3 4.4-6.6-6.7-9.2-10.9-12.3-20 4.2-1.1 6.3-1.6 10.6-2.7zm-95.5 2.6c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4 1 2.4 2.4 2.4 2.4-1 2.4-2.4zm184.2 21.9c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4 1.1 2.4 2.4 2.4c1.4 0 2.4-1.1 2.4-2.4zm-268.5 87.3c-6 3.5-8.6 5.9-12.4 11.5 1.5 1.3 2.3 1.9 3.9 3.2 4.1-4.1 6.6-5.6 12-7.5-1.5-2.9-2.2-4.3-3.5-7.2zm361.4 70.7c-9.4-5.3-14.8-6.9-25.5-7.7-.5 3.1-.7 4.6-1.2 7.7 8.7 2.4 12.9 4.5 19.6 10.3 2.9-4.1 4.3-6.2 7.1-10.3z" fill="#f93556"/>
                <path d="m110.5 74.3c-8.7-3.7-12.5-7-17.7-15 3.6-1.9 5.5-2.9 9.1-4.8 2.8 6.9 5.3 10 11.6 14.2-1.2 2.2-1.8 3.4-3 5.6zm178.8-11.6c-3.4 3.6-5.5 5-10.2 6.9.5 1.7.7 2.5 1.2 4.2 5.8-1.1 8.7-2.3 13.6-5.8-1.9-2.1-2.8-3.2-4.6-5.3zm-108.4-49.2c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4 1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4zm204 89.3c-.2-2.1-2.1-3.5-4.1-3.3-2.1.2-3.5 2.1-3.3 4.1s2.1 3.5 4.1 3.3 3.5-2 3.3-4.1zm-384.6 85.7c-.8 2.2.3 4.6 2.5 5.4s4.6-.3 5.4-2.5-.3-4.6-2.5-5.4-4.6.3-5.4 2.5z" fill="#7ddafb"/>
              </g>
            </svg>
          </div>
        </div>
      </template>
      <template v-else>
        <p v-if="error" class="alert--danger">ERROR: {{error}}</p>
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
    },
    isValid() {
      return this.$parent.isValid;
    }
  },
  methods: {
    getContainerHeight() {
      switch(this.currentPanel){
        case "performance":
        case "security":
          return 'scrollable--performance';
        case "accessibility":
          return 'scrollable--accessibility';
        case "html5":
          return 'scrollable--html';
        default:
          return '_h--350';
      }
    },
    close() {
      EventBus.$emit("changePanel", "tech");
    },
    changeTab(section) {
      EventBus.$emit("changePanel", section.toLowerCase());
    },
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
    padding-bottom: 1rem;

    &--title {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2rem;
    }
  }
}

.sections__container--title {
  padding-left: 1.2rem;
}

._word--break {
  word-break: break-word;
}

._h {
  &--350 {
    height: 350px !important;
  }
}


// Sections - scrollable area
.scrollable {
  width: 100%;
  height: 345px;
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

  &--performance {
    height: calc(100vh - 300px) !important;
    margin-top: 10px;
  }

  &--accessibility {
    height: calc(100vh - 300px) !important;
    margin-top: 10px;
  }

  &--html {
    height: calc(100vh - 275px) !important;
    margin-top: 10px;
  }
}

// Close button
.close {
  position: absolute;
  top: 0;
  right: 0;
  padding: .5rem 1.2rem 1rem 1.2rem;
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
