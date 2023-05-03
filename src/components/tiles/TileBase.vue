<template>
  <svg :x="customX" :y="customY" :width="`${tileSideWidth}%`" :height="`${tileSideWidth}%`" viewBox="0 0 100 100">
    <rect x="0" y="0" width="100" height="100" class="tile-base" />
  </svg>
</template>

<script setup>
import { computed } from "vue";

import { ELEMENT_CONFIG } from "../../config/elements";
const { tileSideWidth } = ELEMENT_CONFIG;


const props = defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});

const customX = computed(() => {
  return `${(props.x * tileSideWidth)}%`;
});
const customY = computed(() => {
  return `${(props.y * tileSideWidth)}%`;
});


/*
  Let's say the tile directions are represented as numbers
  top: 0, right: 1, bottom: 2, left: 3. ---> [0, 1, 2, 3]

  then we can use this as a multiplicator of 90° (0, 90, 180, 270)
  then we can easily shift this array to map the real direction depending of a rotation

*/

</script>

<style scoped>
.tile-base {
  fill: saddlebrown;
}

.tile-base-group {
  transform-origin: center center;
  transform-box: fill-box;
}
</style>