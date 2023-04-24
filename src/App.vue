<template>
  <SVGPlayground>
    <defs>
      <pattern id="grid" viewBox="0,0,10,10" :width="`${100/gridSize}%`" :height="`${100/gridSize}%`">
        <line x1="10" y1="0" x2="10" y2="10" stroke="black" stroke-width="0.5" />
        <line x1="0" y1="10" x2="10" y2="10" stroke="black" stroke-width="0.5" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="1000" height="1000" fill="url(#grid)" />
    <TileBase v-for="t in indexedTiles"
      v-bind="t"
      @tile:explore="handleExplore"
    />
  </SVGPlayground>
</template>

<script setup>
import SVGPlayground from './components/SVGPlayground.vue'
import TileBase from './components/tiles/TileBase.vue'

import { ref, computed } from "vue";

const TILE_SIDE_WIDTH = 100;

const gridSize = 11
const gridCenterIndex = Math.floor((gridSize**2)/2);

const tiles = ref(Array(gridSize**2).fill(undefined));
tiles.value[gridCenterIndex] = {rotation: 0}
const indexedTiles = computed(() => tiles.value.reduce((it, tile, ti) => {
  const y = Math.floor(ti /gridSize);
  return tile ? [...it, { ...tile, x: (ti - y * gridSize), y }] : it;
}, []));

console.log(indexedTiles.value);

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
