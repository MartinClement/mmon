<template>
  <SVGPlayground>
    <TileBase v-for="t in tiles" v-bind="t" @tile:explore="handleExplore"/>
  </SVGPlayground>
</template>

<script setup>
import SVGPlayground from './components/SVGPlayground.vue'
import TileBase from './components/tiles/TileBase.vue'

import { ref } from "vue";

const TILE_SIDE_WIDTH = 100;

const tiles = ref([
  { x: 0, y: 0, sideWidth: TILE_SIDE_WIDTH, rotation: 0 }
])

const handleExplore = ({ x, y, direction }) => {
  const isVerticalExplore = [0, 2].includes(direction);
  const isHorizontalExplore = [1, 3].includes(direction);
  const isTop = direction === 0;
  const isRight = direction === 1;

  console.log({
    direction,
    isTop,
    isRight,
    isVerticalExplore,
    isHorizontalExplore,
    x,
    y,
  });

  tiles.value = [
    ...tiles.value,
    {
      x: isHorizontalExplore ? isRight ? x + TILE_SIDE_WIDTH : x - TILE_SIDE_WIDTH : x,
      y: isVerticalExplore ? isTop ? y - TILE_SIDE_WIDTH : y + TILE_SIDE_WIDTH : y,
      sideWidth: TILE_SIDE_WIDTH,
      rotation: (direction + 2)%4,
    },
  ];
}
</script>

<style scoped>
</style>
