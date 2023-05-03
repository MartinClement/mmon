<template>
  <SVGPlayground :sideWidth="900" :viewBoxSideWidth="playgroundViewBoxSideWidth">
    <defs>
      <pattern id="grid" viewBox="0,0,10,10" :width="`${tileSideWidth}%`" :height="`${100/gridSize}%`">
        <line x1="10" y1="0" x2="10" y2="10" stroke="black" stroke-width="0.5" />
        <line x1="0" y1="10" x2="10" y2="10" stroke="black" stroke-width="0.5" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="1000" height="1000" fill="url(#grid)" />
    <!-- @TODO: Handle key for vfor loop -->
    <TileBase v-for="tile in FLATTEN_GRID"
      :x="tile.x"
      :y="tile.y"
      @tile:explore="handleExplore"
    />
    <!-- <PlatformView v-for="p in indexedElements.platforms" v-bind="p" :tile-side-width="TILE_SIDEWIDTH"/> -->
  </SVGPlayground>
</template>

<script setup>
import SVGPlayground from './components/SVGPlayground.vue';
import TileBase from './components/tiles/TileBase.vue';
import PlatformView from "./components/platforms/PlatformView.vue";

import { GAME_TILES } from "./config/gameTiles";
import { ELEMENT_CONFIG } from "./config/elements";
import { ref, computed } from "vue";
import { isArray } from '@vue/shared';

const { gridSize, tileSideWidth, playgroundViewBoxSideWidth } = ELEMENT_CONFIG;

const GRID = ref(Array(gridSize).fill(undefined).map(row => Array(gridSize).fill(undefined)));
const PLATFORMS = ref([]);

let TILES_POOL = GAME_TILES.reduce(( tiles, tile) => tile.ref === "A" ? [...tiles, { ...tile }] : tiles, []);

const getPlatformRef = (x, y, zoneIndex) => `${x}-${y}-${zoneIndex}`;
const getTilePlatforms = (tile, x, y) => {
  return tile.zones
    .map((zone) => zone.find((el) => el.type === "platform"))
    .reduce((ptfms, platform, zoneIndex) => {
      if (platform) {
        return [...ptfms, { refs: [getPlatformRef(x, y, zoneIndex)], x, y }];
      }

      return ptfms;
    }, []);
}

const nextPlatformCordsDiffByZone = [{x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}];

const mergePlatforms = (oldPlatforms, newPlatforms) => {
  console.log(oldPlatforms);
  console.log(newPlatforms);

  let mergedPlatforms = [...oldPlatforms];

  newPlatforms.forEach((newPtfm) => {
    if (newPtfm) {
      const [x, y, zone] = newPtfm.refs[0].split('-').map((str => parseInt(str)));
      const cordsDiffs = nextPlatformCordsDiffByZone[zone];
      const connectedPlatformIndex = oldPlatforms.findIndex(oPtfm => {
        return oPtfm.refs.includes(getPlatformRef(x + cordsDiffs.x, y + cordsDiffs.y, (zone + 2) % 4));
      });

      if (connectedPlatformIndex === -1 ) {
        mergedPlatforms = [...mergedPlatforms, newPtfm];
      } else {
        mergedPlatforms[connectedPlatformIndex].refs = [...mergedPlatforms[connectedPlatformIndex].refs, newPtfm.refs[0]];
      }
    }
  });

  return mergedPlatforms;
}

const initGame = () => {
  const gridCenterIndex = Math.floor(gridSize/2);

  // Fetch starter tile;
  const starterTile = { ...GAME_TILES.find(t => t.ref === "starter") };
  // Add Starter Tile to to middle of the grid;
  GRID.value[gridCenterIndex][gridCenterIndex] = { ...starterTile };
  // Compute tile platforms;
  PLATFORMS.value = mergePlatforms(PLATFORMS.value, getTilePlatforms(starterTile, gridCenterIndex, gridCenterIndex));
}

const FLATTEN_GRID = computed(() => GRID.value.reduce((flattenGrid, row, rowindex) => {
  const flattenRow = row.reduce((row, tile, colIndex) => {
    return tile ? [...row, { x: colIndex, y: rowindex }] : row;
  }, []);

  return [...flattenGrid, ...flattenRow];
}, []));
initGame();

console.log(PLATFORMS.value);
</script>

<style scoped>
</style>
