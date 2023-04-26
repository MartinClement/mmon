/*
 Let's say a tile is divided in 4 zones [0, 1, 2, 3]
  \ 0 /
 3 \ / 1 Then we can describe what is show by zone 
   / \   --> [{platform, bridges, pipeline}, ...{...}],
  / 2 \

  A tile should be able to display each element described in a zone
*/

const starterTile = {
  ref: 'starter',
  zones: [
    [{ type: "platform", resource: "blue" }],
    [{ type: "platform", resource: "yellow" }],
    [{ type: "platform", resource: "blue" }],
    [{ type: "platform", resource: "maroon" }],
  ]
};

const ATiles = [
  {
    ref: 'A',
    zones: [
      [{ type: "platform", resource: "grey" }],
      [{ type: "platform", resource: "blue" }],
      [{ type: "platform", resource: "yellow" }],
      [{ type: "platform", resource: "maroon" }],
    ]
  },
  {
    ref: 'A',
    zones: [
      [{ type: "platform", resource: "grey" }],
      [{ type: "platform", resource: "orange" }],
      [{ type: "platform", resource: "blue" }],
      [{ type: "platform", resource: "yellow" }],
    ]
  },
  {
    ref: 'A',
    zones: [
      [{ type: "platform", resource: "grey" }],
      [{ type: "platform", resource: "purple" }],
      [{ type: "platform", resource: "yellow" }],
      [{ type: "platform", resource: "maroon" }],
    ]
  },
  {
    ref: 'A',
    zones: [
      [{ type: "platform", resource: "grey" }],
      [{ type: "platform", resource: "blue" }],
      [{ type: "platform", resource: "yellow" }],
      [{ type: "platform", resource: "blue" }],
    ]
  },
  {
    ref: 'A',
    zones: [
      [{ type: "platform", resource: "grey" }],
      [{ type: "platform", resource: "purple" }],
      [{ type: "platform", resource: "yellow" }],
      [{ type: "platform", resource: "blue" }],
    ]
  }
]

export const TILES_CONFIG = [
  starterTile,
  ...ATiles,
];