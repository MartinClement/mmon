const BASE_ELEMENT_CONFIG = {
  gridSize: 13,
  playgroundViewBoxSideWidth: 1000,
}

export const ELEMENT_CONFIG = {
  ...BASE_ELEMENT_CONFIG,
  tileSideWidth: 100 / BASE_ELEMENT_CONFIG.gridSize,
}