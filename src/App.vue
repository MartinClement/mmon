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
    />
    <PlatformView
      v-for="platform in PLATFORMS"
      :x="platform.x"
      :y="platform.y"
      :zone="platform.zone"
      :resources="platform.resources"
      @platform:explore="handleExploration"
    />
  </SVGPlayground>
</template>

<script setup>
import SVGPlayground from './components/SVGPlayground.vue';
import TileBase from './components/tiles/TileBase.vue';
import PlatformView from "./components/platforms/PlatformView.vue";

import { GAME_TILES } from "./config/gameTiles";
import { ELEMENT_CONFIG } from "./config/elements";
import { ref, computed } from "vue";

const { gridSize, tileSideWidth, playgroundViewBoxSideWidth } = ELEMENT_CONFIG;

const GRID = ref(Array(gridSize).fill(undefined).map(row => Array(gridSize).fill(undefined)));
const PLATFORMS = ref([]);
let TILES_POOL = GAME_TILES.reduce(( tiles, tile) => tile.ref === "A" ? [...tiles, { ...tile }] : tiles, []);

const nextPlatformCordsDiffByZone = [{x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}];

const getTilePlatforms = (tile, x, y) => {
  return tile.zones
    .map((zone) => zone.find((el) => el.type === "platform"))
    .reduce((ptfms, platform, zoneIndex) => {
      if (platform) {
        return [
          ...ptfms,
          {
            ...platform,
            x,
            y,
            zone:
            zoneIndex,
          },
        ];
      }

      return ptfms;
    }, []);
}

const getNextPlatformCoords = (x, y, zone) => ({
  x: x + nextPlatformCordsDiffByZone[zone].x,
  y: y + nextPlatformCordsDiffByZone[zone].y,
  zone: (zone + 2) % 4,
})

const mergePlatforms = (oldPlatforms, newPlatforms) => {
  let mergedPlatforms = [...oldPlatforms];

  newPlatforms.forEach((newPtfm) => {
    if (newPtfm) {
      const { x: nX, y: nY, zone: nZ } = getNextPlatformCoords(newPtfm.x, newPtfm.y, newPtfm.zone);
      const nextPtfmIndex = oldPlatforms.findIndex(oPtfm => {
        return oPtfm.x ===  nX && oPtfm.y === nY && oPtfm.zone === nZ;
      });
      if (nextPtfmIndex === -1 ) {
        mergedPlatforms = [...mergedPlatforms, newPtfm];
      } else {
        const nextPtfm = {...mergedPlatforms[nextPtfmIndex]};
        nextPtfm.resources = [0, 1].includes(nextPtfm.zone)
          ? [...nextPtfm.resources, ...newPtfm.resources]
          : [...newPtfm.resources, ...nextPtfm.resources];

        mergedPlatforms[nextPtfmIndex] = nextPtfm;
      }
    }
  });

  return mergedPlatforms;
}

const rotateZones = (zones, rotation) =>  {
  const res = [...zones];
  for (let i = 0; i < rotation; i++) {
    res.unshift(res.pop());
  }

  return res;
};

const handleExploration = ({ x, y, rotation }) => {
  if (TILES_POOL.length > 0) {
    const newTile = { ...TILES_POOL.shift() };
    newTile.zones = rotateZones(newTile.zones, rotation);
    GRID.value[y][x] = newTile;
    PLATFORMS.value = mergePlatforms(PLATFORMS.value, getTilePlatforms(newTile, x, y));
  }
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
</script>

<style scoped>
</style>
