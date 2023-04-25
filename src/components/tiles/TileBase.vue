
import { reactive } from 'vue';

<template>
  <svg :x="customX" :y="customY" :width="`${sideWidth}%`" :height="`${sideWidth}%`" viewBox="0 0 100 100">
    <g :transform="`rotate(${rotation*90})`" class="tile-base-group">
      <rect x="0" y="0" width="100" height="100" class="tile-base" />
      <circle v-for="c in platforms" :cx="c.cx" :cy="c.cy" :r="c.r" :fill="c.fill" class="platform" @click="handleExplore(c)"/>
    </g>
  </svg>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  description: { type: Array, default: () => [] },
  sideWidth: { type: Number, default: 100 },
  rotation: { type: Number, default: 0, validator: v => [0, 1, 2, 3].includes(v) },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});

const customX = computed(() => {
  return `${(props.x * props.sideWidth)}%`;
});
const customY = computed(() => {
  return `${(props.y * props.sideWidth)}%`;
});

const directionMappedByRotation = computed(() => [0, 1, 2, 3].map(i => (i + props.rotation)%4));


/*
  Let's say the tile directions are represented as numbers
  top: 0, right: 1, bottom: 2, left: 3. ---> [0, 1, 2, 3]

  then we can use this as a multiplicator of 90° (0, 90, 180, 270)
  then we can easily shift this array to map the real direction depending of a rotation

*/

const platforms = [
  { cx: 50, cy: 0, r: 20, fill: "grey", direction: 0},
  { cx: 100, cy: 50, r: 20, fill: "green", direction: 1},
  { cx: 50, cy: 100, r: 20, fill: "blue", direction: 2},
  { cx: 0, cy: 50, r: 20, fill: "yellow", direction: 3},
];

const emit = defineEmits(['tile:explore']);
const handleExplore = (c) => {
  const y = emit('tile:explore', {
    x: props.x,
    y: props.y,
    direction: directionMappedByRotation.value[c.direction],
  });
}
</script>

<style scoped>
.tile-base {
  fill: #121212;
}

.tile-base-group {
  transform-origin: center center;
  transform-box: fill-box;
}

.platform:hover {
  stroke: #eee;
  stroke-width: 1;
  cursor: pointer;
}
</style>