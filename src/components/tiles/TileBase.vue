
import { reactive } from 'vue';

<template>
  <g :transform="`rotate(${rotation*90})`" class="tile-base-group">
    <rect :x="customX" :y="customY" :width="sideWidth" :height="sideWidth" class="tile-base" />
    <circle v-for="c in connections" :cx="c.cx" :cy="c.cy - 35" :r="c.r" :fill="c.fill" class="connection" @click="handleConnection(c)"/>
  </g>
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
  return props.x - props.sideWidth / 2;
})
const customY = computed(() => {
  return props.y - props.sideWidth / 2;
})

const directionMappedByRotation = computed(() => [0, 1, 2, 3].map(i => (i + props.rotation)%4));


/*
  Let's say the tile directions are represented as numbers
  top: 0, right: 1, bottom: 2, left: 3. ---> [0, 1, 2, 3]

  then we can use this as a multiplicator of 90° (0, 90, 180, 270)
  then we can easily shift this array to map the real direction depending of a rotation

*/

const connections = computed(() => ([
  { cx: props.x, cy: props.y, r: 15, fill: "grey", direction: 0},
  { cx: props.x + 35, cy: props.y + 35, r: 15, fill: "green", direction: 1},
  { cx: props.x, cy: props.y + 2 * 35, r: 15, fill: "blue", direction: 2},
  { cx: props.x - 35, cy: props.y + 35, r: 15, fill: "yellow", direction: 3},
]));

const emit = defineEmits(['tile:explore']);
const handleConnection = (c) => {
  emit('tile:explore', { x: props.x, y: props.y, direction: directionMappedByRotation.value[c.direction] });
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

.connection:hover {
  stroke: #eee;
  stroke-width: 1;
  cursor: pointer;
}
</style>