import { 
  SKEvent,
  SKKeyboardEvent,
  SKMouseEvent,
  SKResizeEvent,
  setSKDrawCallback,
  setSKEventListener,
  startSimpleKit,
 } from "simplekit/canvas-mode";

import { Game } from "./game";
import { Card } from "./card";

const game = new Game(1, "start", false);

// mouse position
let mx = 0;
let my = 0;

function handleEvent(e: SKEvent) {
  switch (e.type) {
    case "mousemove":
      ({ x: mx, y: my } = e as SKMouseEvent);
      if (game.mode === "play") {
        game.cards.forEach((c) => {
          if (c.hitTest(mx, my)) {
            // yellow outline 
            c.hit = true;
          } else {
            c.hit = false;
          }
        });
      }
      break;
    case "click":
      game.cards.forEach((c) => {
        if (c.hit) {
          // face up
          if (!c.selected) {
            c.selected = true;
          } else {
            c.selected = false;
          }
          
        }
      });
      break;
    case "drag":
      // star.size += 2;
      break;
    case "dblclick":
      // star.size = 50;
      break;
    case "keypress":
      const { key } = e as SKKeyboardEvent;
      if (key === " ") {
        game.mode = "play";
      } else if (key === "+") {
        if (game.level < 15) game.level++;
      } else if (key === "-") {
        if (game.level > 1) game.level--;
        game.cards = [];
      }
        console.log(key);
      break;
    case "resize":
      const re = e as SKResizeEvent;
      // update local canvas size state
      // (SimpleKit always sends resize event before first draw)
      game.x = re.width;
      game.y = re.height;
      break;
  }
}

setSKEventListener(handleEvent);// set the draw callback (using function expression)
setSKDrawCallback((gc: CanvasRenderingContext2D) => {
  gc.fillStyle = "darkgrey";
  gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);
  if (game.mode === "start") {
    gc.fillStyle = "white";
    gc.font = "24px sans-serif";
    gc.textAlign = "center";
    gc.fillText(`${game.level} pair${(game.level > 1)? "s": ""}: Press SPACE to play`, gc.canvas.width / 2, 50);
    if (game.cards.length < game.level*2) game.getNRandom();
    game.displayLevel(gc);
  } else if (game.mode === "play") {
    if (!game.randomized) game.randomizeCards();
    game.displayLevel(gc);
    game.cards.forEach((c) => {
      if (c.hit && !c.matched) {
        // yellow outline 
        c.hitOutline(gc);
      }
      // if (c.selected) {
      //   c.faceup(gc);
      // }
    });
  }

});

// start SimpleKit
startSimpleKit();
