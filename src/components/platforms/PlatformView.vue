<template>
  <circle :cx="x" :cy="y" :r="r" :fill="PLATFORM_COLOR_BY_RESOURCE[resource]" class="platform" @click="handleClick"/>
</template>

<script setup>
const PLATFORM_RESOURCES = [
  "blue",
  "yellow",
  "purple",
  "orange",
  "maroon",
  "grey",
];

const PLATFORM_COLOR_BY_RESOURCE = {
  blue: "blue",
  yellow: "yellow",
  purple: "purple",
  orange: "orange",
  maroon: "maroon",
  grey: "grey",
};

const props = defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  r: { type: Number, default: 20 },
  direction: { type: Number, required: true },
  resource: { type: String, required: true },
  handleInteraction: { type: Function, default: () => ({}) },
});

const handleClick = () => {
  if (props.resource !== "grey") {
    props.handleInteraction(props.direction);
  }
}
</script>