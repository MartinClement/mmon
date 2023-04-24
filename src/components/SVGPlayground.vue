<template>
  <svg :width="sideWidth" :height="sideWidth" viewBox="0 0 1000 1000" class="svg-playground">
    <slot />
  </svg>
</template>

<script setup>
defineProps({
  sideWidth: { type: Number, default: 800 },
})
</script>

<style scoped>
  .svg-playground {
    background-color: saddlebrown;
  }
</style>