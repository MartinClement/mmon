<template>
  <SVGPlayground :sideWidth="600" :viewBoxSideWidth="1000">
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

const gridSize = 13
const gridCenterIndex = Math.floor((gridSize**2)/2);
const PLAYGROUND_VIEWBOX_SIDE_WIDTH = 1000;
const BASE_TILE = { rotation: 0, sideWidth: 100 / gridSize };

const tiles = ref(Array(gridSize**2).fill(undefined));
tiles.value[gridCenterIndex] = { ...BASE_TILE }
const indexedTiles = computed(() => tiles.value.reduce((it, tile, ti) => {
  const y = Math.floor(ti /gridSize);
  return tile ? [...it, { ...tile, x: (ti - y * gridSize), y }] : it;
}, []));

const handleExplore = ({ x, y, direction }) => {
  const newTiles = tiles.value;
  const newX = direction % 2 != 0 ? direction === 1 ? x + 1 : x - 1 : x;
  const newY = direction % 2 === 0 ? direction === 0 ? y - 1 : y + 1 : y;
  const tileIndex = (gridSize * newY) + newX;

  newTiles[tileIndex] = {
    ...BASE_TILE,
    rotation: (direction + 2)%4,
    x: direction % 2 != 0 ? direction === 1 ? x + 1 : x - 1 : x,
    y: direction % 2 === 0 ? direction === 0 ? y - 1 : y + 1 : y,
  }

  tiles.value = newTiles;
}
</script>

<style scoped>
</style>
