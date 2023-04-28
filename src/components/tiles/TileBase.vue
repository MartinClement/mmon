<template>
  <svg :x="customX" :y="customY" :width="`${sideWidth}%`" :height="`${sideWidth}%`" viewBox="0 0 100 100">
    <rect x="0" y="0" width="100" height="100" class="tile-base" />
    <g :transform="`rotate(${rotation*90})`" class="tile-base-group">
      <PlatformView v-for="platform in platforms" v-bind="platform" />
    </g>
  </svg>
</template>

<script setup>
import { computed } from "vue";

import PlatformView from "../platforms/PlatformView.vue";

const props = defineProps({
  zones: { type: Array, default: () => [] },
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


/*
  Let's say the tile directions are represented as numbers
  top: 0, right: 1, bottom: 2, left: 3. ---> [0, 1, 2, 3]

  then we can use this as a multiplicator of 90° (0, 90, 180, 270)
  then we can easily shift this array to map the real direction depending of a rotation

*/

const emit = defineEmits(['tile:explore']);
const directionMappedByRotation = computed(() => [0, 1, 2, 3].map(i => (i + props.rotation)%4));
const handlePlatformInterraction = (direction) => {
  const y = emit('tile:explore', {
    x: props.x,
    y: props.y,
    direction: directionMappedByRotation.value[direction],
  });
}

const platformCoordsByIndex = {
  0: { x: 50, y: 0 },
  1: { x: 100, y: 50 },
  2: { x: 50, y: 100 },
  3: { x: 0, y: 50 },
};

const platforms = computed(() => props.zones.reduce((ptfrms, zone, index) => {
  const platform = zone.find(el => el.type === 'platform');
  return platform
    ? [
        ...ptfrms,
        { ...platform, direction: index, ...platformCoordsByIndex[index], handleInteraction: handlePlatformInterraction },
      ]
    : ptfrms;
}, []));
</script>

<style scoped>
.tile-base {
  fill: saddlebrown;
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