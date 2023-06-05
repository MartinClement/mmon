const BASE_ELEMENT_CONFIG = {
  gridSize: 9,
  playgroundViewBoxSideWidth: 1000,
}

const tileSideWidth = 100 / BASE_ELEMENT_CONFIG.gridSize;

export const ELEMENT_CONFIG = {
  ...BASE_ELEMENT_CONFIG,
  tileSideWidth,
  platformSideWidth: tileSideWidth / 3,
}