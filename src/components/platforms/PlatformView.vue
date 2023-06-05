<template>
  <svg :height="`${platformSideWidth}%`" :width="`${platformSideWidth}%`" viewBox="0 0 20 20" :x="`${coords.x}%`" :y="`${coords.y}%`">
    <g class="halfs platform" @click="handleClick">
      <path
        v-for="half in halfs"
        :d="half.d"
        :fill="PLATFORM_COLOR_BY_RESOURCE[half.resourceName]" />
    </g>
  </svg>
</template>

<script setup>
import { computed } from "vue";

import { ELEMENT_CONFIG } from "../../config/elements";
const { tileSideWidth, platformSideWidth } = ELEMENT_CONFIG;

const EXPLORATION_CORDS_DIFF_BY_ZONE = [{x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}];
const PLATFORM_COLOR_BY_RESOURCE = {
  blue: "blue",
  yellow: "yellow",
  purple: "purple",
  orange: "orange",
  maroon: "maroon",
  grey: "grey",
};

const PATH_COORDS_BY_ZONE = [
  { start: [0, 10], end: [20, 10] },
  { start: [10, 0], end: [10, 20] },
  { start: [0, 10], end: [20, 10] },
  { start: [10, 0], end: [10, 20] },
]

const props = defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  zone: { type: Number, required: true },
  resources: { type: Array, default: () => [] },
});

const buildPath = (zone, index) => {
  const { start, end } = PATH_COORDS_BY_ZONE[zone];
  const sweepFlag = [0, 1].includes(zone) ? index : (index + 1) % 2;

  return `M${start[0]} ${start[1]} A 10 10 1 0 ${sweepFlag} ${end[0]} ${end[1]}`;
}

const platformExplored = computed(() => props.resources.length === 2);
const coords = computed(() => {
  const x = props.x * tileSideWidth;
  const y = props.y * tileSideWidth;

  if ([0, 2].includes(props.zone)) {
    return {
      x: x + tileSideWidth / 2 - platformSideWidth / 2,
      y: props.zone === 0 ? y - platformSideWidth / 2 : y + tileSideWidth - platformSideWidth / 2,
    }
  }

  return {
    x: props.zone === 1 ? x + tileSideWidth - platformSideWidth / 2 : x - platformSideWidth / 2,
    y: y + tileSideWidth / 2 - platformSideWidth / 2,
  }
})
const halfs = computed(() => props.resources.map((r, ri) => ({ resourceName: r, d: buildPath(props.zone, ri) })));

const emit = defineEmits(['platform:explore']);
const handleClick = () => {
  if (platformExplored.value ) {
    return;
  }

  const cordsDiff = EXPLORATION_CORDS_DIFF_BY_ZONE[props.zone];
  emit('platform:explore', { x: props.x + cordsDiff.x, y: props.y + cordsDiff.y, rotation: (props.zone + 2) % 4 });
};
</script>

<style scoped>
.platform {
  stroke: #cfcfcf;
  stroke-width: 2;
}

.platform:hover {
  stroke: black;
}
</style>