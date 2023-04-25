<template>
  <circle :cx="x" :cy="y" :r="r" :fill="fill" class="platform" @click="handleExplore(c)"/>
</template>

<script setup>
import { computed } from "vue";

const PLATFORM_TYPES = [
  "blue",
  "yellow",
  "purple",
  "orange",
  "maroon",
];

const props = defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  type: { type: String, required: true, validator: v => PLATFORM_TYPES.includes(v)},
});
</script>