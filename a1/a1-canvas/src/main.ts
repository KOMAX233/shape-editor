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
          if (!c.matched) {
            // face up
            if (!c.selected) {
              if (game.selectedCards.length < 2) {
                c.selected = true;
                game.selectedCards.push(c);
              }
            } else {
              c.selected = false;
              let index = game.selectedCards.indexOf(c);
              game.selectedCards.splice(index, 1);
            }            
          }
          console.log(game.selectedCards);
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
      } else if (key === "+" && game.mode === "start") {
        if (game.level < 15) game.level++;
        game.selectedCards = [];
        game.randomized = false;
        game.cards.forEach((c) => {
          c.selected = false;
          c.matched = false;
        });
      } else if (key === "-" && game.mode === "start") {
        if (game.level > 1) game.level--;
        game.cards = [];
        game.randomized = false;
        game.cards.forEach((c) => {
          c.selected = false;
          c.matched = false;
        });
      } else if (key === "q") {
        game.mode = "start";
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
    game.cards.forEach((c) => {
      c.selected = false;
    });
    game.displayLevel(gc);
  } else if (game.mode === "play") {
    if (!game.randomized) game.randomizeCards();
    console.log(game.randomized);
    game.cards.forEach((c) => {
      if (c.hit && !c.matched) {
        // yellow outline 
        c.hitOutline(gc);
      }
    });
    if (game.checkMatch()) game.selectedCards = [];
    game.displayLevel(gc);
  }
});

// start SimpleKit
startSimpleKit();
