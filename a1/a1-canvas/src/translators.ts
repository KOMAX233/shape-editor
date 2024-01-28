import { distance } from "simplekit/utility";

// the simulated "raw" events from "window manager"
import { FundamentalEvent } from "simplekit/canvas-mode";

// simulated UI Toolkit events
import {
  SKEvent,
  SKKeyboardEvent,
  SKMouseEvent,
  SKResizeEvent,
} from "simplekit/canvas-mode";

export type EventTranslator = {
  update: (fe: FundamentalEvent) => SKEvent | undefined;
};

export const fundamentalTranslator = {
  update(fe: FundamentalEvent): SKEvent {
    switch (fe.type) {
      case "mousedown":
      case "mouseup":
      case "mousemove":
        return new SKMouseEvent(
          fe.type,
          fe.timeStamp,
          fe.x || 0,
          fe.y || 0
        );
        break;
      case "keydown":
      case "keyup":
        return new SKKeyboardEvent(fe.type, fe.timeStamp, fe.key);
        break;
      case "resize":
        return new SKResizeEvent(
          fe.type,
          fe.timeStamp,
          document.body.clientWidth,
          document.body.clientHeight
          // window.innerWidth,
          // window.innerHeight
        );
      default:
        return new SKEvent(fe.type, fe.timeStamp);
    }
  },
};

export const dragTranslator = {
  state: "IDLE",
  // parameters for transitions
  movementThreshold: 50,
  // for tracking thresholds
  startX: 0,
  startY: 0,

  // returns a drag event if found
  update(fe: FundamentalEvent): SKMouseEvent | undefined {
    switch (this.state) {
      case "IDLE":
        if (fe.type == "mousedown") {
          this.state = "DOWN";
          this.startX = fe.x || 0;
          this.startY = fe.y || 0;
        }
        break;

      case "DOWN":
        if (fe.type == "mouseup") {
          this.state = "IDLE";
        } else if (
          fe.type == "mousemove" &&
          fe.x &&
          fe.y &&
          distance(fe.x, fe.y, this.startX, this.startY) >
            this.movementThreshold
        ) {
          this.state = "DRAG";
          return {
            type: "dragstart",
            timeStamp: fe.timeStamp,
            x: fe.x,
            y: fe.y,
          } as SKMouseEvent;
        }
        break;

      case "DRAG":
        if (fe.type == "mousemove") {
          return {
            type: "drag",
            timeStamp: fe.timeStamp,
            x: fe.x,
            y: fe.y,
          } as SKMouseEvent;
        } else if (fe.type == "mouseup") {
          this.state = "IDLE";
          // if (fe.x && fe.y && distance(fe.x, fe.y, this.startX, this.startY) >
          // this.movementThreshold) {
          //   return {
          //     type: "gesture",
          //     timeStamp: fe.timeStamp,
          //     x: fe.x,
          //     y: fe.y,
          //   } as SKMouseEvent;
          // } else {
            return {
              type: "dragend",
              timeStamp: fe.timeStamp,
              x: fe.x,
              y: fe.y,
            } as SKMouseEvent;
          // }
        }

        break;
    }
    return;
  },
};
