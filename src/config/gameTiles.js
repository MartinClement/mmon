/*
 Let's say a tile is divided in 4 zones [0, 1, 2, 3]
  \ 0 /
 3 \ / 1 Then we can describe what will be shown by zone
   / \   --> [{platform, bridges, pipeline}, ...{...}],
  / 2 \

  Everytime a tile is added on playground, we have everything.
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

export const GAME_TILES = [
  starterTile,
  ...ATiles,
];