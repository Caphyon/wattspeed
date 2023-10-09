<template>
  <div class="h-full">
    <Yeey v-if="showYeey" />
    <slot v-else-if="!loading"></slot>
    <div
      v-else
      class="-mt-2 flex h-full items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        class="text-gray-400">
        <path
          opacity=".2"
          d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
          fill="currentColor" />
        <path
          d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"
          fill="currentColor">
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="0.7s"
            repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  </div>
</template>

<script>
import Yeey from './Yeey.vue';

export default {
  name: 'LoadingWrapper',
  components: { Yeey },
  props: {
    showYeey: {
      type: Boolean,
      default: () => false,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
