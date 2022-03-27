<template>
  <div class="flex flex-wrap -mx-3 -mb-6">
    <div
      v-for="(item, i) of items"
      :key="i"
      class="flex-grid-100 sm:flex-grid-33 lg:flex-grid-25 px-3 pb-6"
    >
      <slot name="item" :item="item" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppGrid",

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped></style>
