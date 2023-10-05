<template>
  <div class="title">
    <svg width="16"
         height="16">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`#${icon}`" />
    </svg>
    {{ name }}
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  }
};
</script>
