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
    [{ type: "platform", resources:  ["blue"] }],
    [{ type: "platform", resources:  ["yellow"] }],
    [{ type: "platform", resources:  ["blue"] }],
    [{ type: "platform", resources:  ["maroon"] }],
  ]
};

const ATiles = [
  {
    ref: 'A',
    zones: [
      [{ type: "platform", resources:  ["grey"] }],
      [{ type: "platform", resources:  ["blue"] }],
      [{ type: "platform", resources:  ["yellow"] }],
      [{ type: "platform", resources:  ["maroon"] }],
    ]
  },
  {
    ref: 'A',
    zones: [
      [{ type: "platform", resources:  ["grey"] }],
      [{ type: "platform", resources:  ["orange"] }],
      [{ type: "platform", resources:  ["blue"] }],
      [{ type: "platform", resources:  ["yellow"] }],
    ]
  },
  {
    ref: 'A',
    zones: [
      [{ type: "platform", resources:  ["grey"] }],
      [{ type: "platform", resources:  ["purple"] }],
      [{ type: "platform", resources:  ["yellow"] }],
      [{ type: "platform", resources:  ["maroon"] }],
    ]
  },
  {
    ref: 'A',
    zones: [
      [{ type: "platform", resources:  ["grey"] }],
      [{ type: "platform", resources:  ["blue"] }],
      [{ type: "platform", resources:  ["yellow"] }],
      [{ type: "platform", resources:  ["blue"] }],
    ]
  },
  {
    ref: 'A',
    zones: [
      [{ type: "platform", resources:  ["grey"] }],
      [{ type: "platform", resources:  ["purple"] }],
      [{ type: "platform", resources:  ["yellow"] }],
      [{ type: "platform", resources:  ["blue"] }],
    ]
  }
]

export const GAME_TILES = [
  starterTile,
  ...ATiles,
];