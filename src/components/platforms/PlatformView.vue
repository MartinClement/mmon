<template>
  <svg height="20" width="20" viewBox="0 0 20 20" :x="`${platformPosition.x}%`" :y="`${platformPosition.y}%`">
    <g class="halfs">
      <circle cx="10" cy="10" r="10" fill="red" />
    </g>
  </svg>
</template>

<script setup>
import { computed } from "vue";

const PLATFORM_COLOR_BY_RESOURCE = {
  blue: "blue",
  yellow: "yellow",
  purple: "purple",
  orange: "orange",
  maroon: "maroon",
  grey: "grey",
};

const props = defineProps({
  ids: { type: Array, required: true},
  tileSideWidth: { type: Number, required: true},
  handleInteraction: { type: Function, default: () => ({}) },
});

const centerByZone = computed(() => [
  [props.tileSideWidth / 2, 0],
  [props.tileSideWidth, props.tileSideWidth / 2],
  [props.tileSideWidth / 2, props.tileSideWidth],
  [0, props.tileSideWidth / 2],
]);

const platformPosition = computed(() => {
  const [x, y, zone, rotation] = props.ids[0].split('-');
  const baseX = x * props.tileSideWidth;
  const baseY = y * props.tileSideWidth;
  const realZone = (zone + rotation) % 4;
  const positionDelta = centerByZone.value[realZone];
  const res = {x: baseX + positionDelta[0], y: baseY + positionDelta[1] };

  console.log(res);
  return res;
})

const halfPlatforms = computed(() => props.ids.map(id => {
  const [x, y, zone, rotation, resource] = id.split("-");
  console.log(x, y, zone, rotation, resource);
}))

const handleClick = () => {
  if (props.resource !== "grey") {
    props.handleInteraction(props.direction);
  }
}
</script>

<style scoped>
.platform {
  stroke: #cfcfcf;
  stroke-width: 2;
}
</style>