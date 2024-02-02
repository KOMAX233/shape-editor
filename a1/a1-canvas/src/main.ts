import { 
  SKEvent,
  SKKeyboardEvent,
  SKMouseEvent,
  SKResizeEvent,
  setSKDrawCallback,
  setSKEventListener,
  addSKEventTranslator,
  startSimpleKit,
  setSKAnimationCallback,
  skTime,
 } from "simplekit/canvas-mode";

import { Game } from "./game";
import { Card } from "./card.ts";
import { dragTranslator } from "./translators.ts";
import { CallbackTimer } from "./timer";
import {
  animationManager,
  Animator,
  easeIn,
  easeOut,
} from "./animationManager";

// to-do: fix text and message center resize step 22
// to-do: step 24
// to-do: fix game and card property reset or keep after mode change
// to-do: 29 center animation

const game = new Game(1, "start", false);
let canvasW: number;
let canvasH: number;

let peekCard: Card;
const timer = new CallbackTimer(500, (t) => {
  // console.log(`time up at ${t}!`);
  if (peekCard) peekCard.peeked = false;
  timer.start(t);
});

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
          game.addcentered = false;
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
        // game.addcentered = false;
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
        // game.addcentered = false;
      } else if (key === "q") {
        if (game.mode === "play") {
          game.mode = "start";
          game.addcentered = false;
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
    case "gesture":
      ({ x: mx, y: my } = e as SKMouseEvent);
      if (game.mode === "play") {
        game.cards.forEach((c) => {
          if (c.hitTest(mx, my)) {
            // face up
            c.peeked = true;
            peekCard = c;
            // peek
            // console.log("peek");
            
            // timer
            if (peekCard) peekCard.peeked = true;
            // skTime is time in ms since SimpleKit started
            timer.start(skTime);
            
          }
        });
      }
      break;
  }
}

// add custom event translator
addSKEventTranslator(dragTranslator);

setSKEventListener(handleEvent);// set the draw callback (using function expression)

setSKDrawCallback((gc: CanvasRenderingContext2D) => {
  canvasW = gc.canvas.width;
  canvasH = gc.canvas.height;
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
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
    // step 29 not working yet
    // console.log(game.addcentered);
    if (!game.addcentered) {
      // animateCenter();
    }  
    game.displayLevel(gc);
  } else if (game.mode === "play") {
    game.win = false;
    if (!game.randomized) {
      game.shuffle(game.cards);
      game.cards.forEach(c => {
        console.log("before: ", c.beforeX, c.beforeY, ", after: ", c.x, c.y);
        if (c.beforeX && c.beforeY) {
          animationManager.add(
            new Animator(c.beforeX as number, c.x, 1000,
              (p) => {c.x = p})
          );
          if (game.cards.length > 2) {
            animationManager.add(
              new Animator(c.beforeY as number, c.y, 1000,
                (p) => {c.y = p})
            );
          }
        }
      });
    }
    game.cards.forEach((c) => {
      if (c.hit && !c.matched) {
        // yellow outline 
        c.hitOutline(gc);
      }
    });
    if (game.checkMatch()) {
      // add match rotation 360 animation step 30
      game.selectedCards.forEach(c => {
        animationManager.add(
          new Animator(0, 360, 1000,
            (p) => {c.r = p})
        );
      });
      game.selectedCards = [];
    }
    game.displayLevel(gc);
    // check win condition: all cards matched
  } else if (game.mode === "win") {
    animateJiggle();
    game.displayLevel(gc);
  }
});


// set animation callback
setSKAnimationCallback((time) => {
  animationManager.update(time);
  timer.update(time);
});

// start SimpleKit
startSimpleKit();

// add animation from the center to position
function animateCenter() {
  game.cards.forEach(c => {
    animationManager.add(
      new Animator(canvasW / 2, c.x, 1000,
        (p) => {c.x = p})
    );
    animationManager.add(
      new Animator(canvasH / 2, c.y, 1000,
        (p) => {c.y = p})
    );
  });
  game.addcentered = true;
}

function animateJiggle() {
  const frequency = 2;
  const amplitude = 5;
  game.cards.forEach((c) => {
    // Use sine function for vertical jiggle
    animationManager.add(
      new Animator(c.y, c.y + amplitude * Math.sin(skTime / 100 * frequency), 100,
        (p) => {
          c.y = p;
        }
      )
    );
  });
}
