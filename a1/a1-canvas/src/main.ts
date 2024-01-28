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
import { dragTranslator } from "./translators.ts";

// to-do: fix text and message center resize step 22
// to-do: step 23, 24, 
// to-do: fix game and card property reset or keep after mode change

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
        }
      });
      break;
    case "drag":
      break;
    case "dblclick":
      break;
    case "keypress":
    case "resize":
      const re = e as SKResizeEvent;
      // update local canvas size state
      // (SimpleKit always sends resize event before first draw)
      game.x = re.width;
      game.y = re.height;
      break;
    case "keydown":
      const { key } = e as SKKeyboardEvent;
      if (key === " ") {
        if (game.win && game.level < 15) {
          game.mode = "start";
          game.level++;
          game.randomized = false;
          game.win = false;
        } else {
          game.mode = "play";
        }
        game.selectedCards = [];
        game.cards.forEach((c) => {
          c.selected = false;
          c.matched = false;
        });
      } else if (key === "+" && game.mode === "start") {
        if (game.level < 15) game.level++;
        game.randomized = false;
        game.selectedCards = [];
        game.win = false;
        game.cards.forEach((c) => {
          c.selected = false;
          c.matched = false;
        });
      } else if (key === "-" && game.mode === "start") {
        if (game.level > 1) game.level--;
        game.cards = [];
        game.randomized = false;
        game.selectedCards = [];
        game.win = false;
        game.cards.forEach((c) => {
          c.selected = false;
          c.matched = false;
        });
      } else if (key === "q") {
        if (game.mode === "play") {
          game.mode = "start";
        }
      } else if (key === "x") {
        if (game.mode === "play") {
          game.cheat = true;
        }
      }
      console.log(key);
      break;
    case "keyup":
      const { key: keyup } = e as SKKeyboardEvent;
      if (keyup === "x") {
        if (game.mode === "play") {
          game.cheat = false;
        }
      }
      break;
    // case "gesture":
    //   ({ x: mx, y: my } = e as SKMouseEvent);
    //   if (game.mode === "play") {
    //     game.cards.forEach((c) => {
    //       if (c.hitTest(mx, my)) {
    //         // face up
    //       }
    //     });
    //   }
    //   break;
  }
}

setSKEventListener(handleEvent);// set the draw callback (using function expression)
setSKDrawCallback((gc: CanvasRenderingContext2D) => {
  gc.fillStyle = "darkgrey";
  gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);
  if (game.win) game.mode = "win";
  gc.fillStyle = "white";
  gc.font = "24px sans-serif";
  gc.textAlign = "center";
  if (game.mode === "start") {
    if (game.cards.length < game.level*2) {
      game.getNRandom();
      game.randomized = false;
    }
    game.cheat = false;
    game.cards.forEach((c) => {
      c.selected = false;
      c.matched = false;
    });
    game.displayLevel(gc);
  } else if (game.mode === "play") {
    game.win = false;
    if (!game.randomized) {
      game.shuffle(game.cards);
    }
    game.cards.forEach((c) => {
      if (c.hit && !c.matched) {
        // yellow outline 
        c.hitOutline(gc);
      }
    });
    if (game.checkMatch()) game.selectedCards = [];
    game.displayLevel(gc);
    // check win condition: all cards matched
  } else if (game.mode === "win") {
    game.displayLevel(gc);
  }
});

// start SimpleKit
startSimpleKit();
