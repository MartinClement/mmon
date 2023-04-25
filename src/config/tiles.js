/*
 Let's say a tile is divided in 4 zones [0, 1, 2, 3]
  \ 0 /
 3 \ / 1 Then we can describe what is show by zone 
   / \   --> [{platform, bridges, pipeline}, ...{...}],
  / 2 \

  A tile should be able to display each element described in a zone
*/

export default {
  starter: [
    [{type: "platform", resource: "blue"}],
    [{type: "platform", resource: "yellow"}],
    [{type: "platform", resource: "blue"}],
    [{type: "platform", resource: "maroon"}],
  ],
  A: [
    { connections: ["grey", "orange", "purple", "yellow"] },
    { connections: ["grey", "blue", undefined, "yellow'"] },
    { connections: ["grey", "blue", undefined, "yellow'"] },
    { connections: ["grey", "blue", undefined, "yellow'"] },
  ],
}