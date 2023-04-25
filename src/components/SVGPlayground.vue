<template>
  <svg :width="sideWidth" :height="sideWidth" :viewBox="`0 0 ${viewBoxSideWidth} ${viewBoxSideWidth}`" class="svg-playground">
    <slot />
  </svg>
</template>

<script setup>
defineProps({
  sideWidth: { type: Number, default: 800 },
  viewBoxSideWidth: { type: Number, required: true },
})
</script>

<style scoped>
  .svg-playground {
    background-color: saddlebrown;
  }
</style>