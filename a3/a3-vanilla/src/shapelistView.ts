// local imports
import { Model } from "./model";
import View from "./view";

import "./shapelistView.css";
import { Shape } from "./shape";

export class shapelistView implements View {
  //#region observer pattern

  update(): void {
    this.container.replaceChildren();
    this.model.shapes.forEach((s) => {
      const canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;
      if (s.drawing === "Square") {
        this.drawSquare(canvas, s);
      } else if (s.drawing === "Star") {
        this.drawStar(canvas, s);
      } else if (s.drawing === "Bullseye") {
        this.drawBull(canvas, s);
      } else if (s.drawing === "Cat") {
        this.drawCat(canvas, s);
      }
      
      // s.drawing;
      if (s.selected) {
        canvas.classList.add("selected");
      } else {
        canvas.classList.remove("selected");
      }
      canvas.addEventListener("click", (e) => {
        e.stopPropagation();
        this.model.select(s.id);
      });
      this.container.appendChild(canvas);
    });
    this.container.addEventListener("click", () => {
      this.model.deselectAll();
    });
  }

  //#endregion

  // the actual HTML element hosting this view
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model) {
    this.container = document.createElement("div");
    this.container.id = "shapelist";

    this.model.shapes.forEach((s) => {
      const canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;
      if (s.drawing === "Square") {
        this.drawSquare(canvas, s);
      } else if (s.drawing === "Star") {
        this.drawStar(canvas, s);
      } else if (s.drawing === "Bullseye") {
        this.drawBull(canvas, s);
      } else if (s.drawing === "Cat") {
        this.drawCat(canvas, s);
      }

      // const shape = document.createElement("div");
      // shape.style.backgroundColor = `hsl(${s.hue1}deg 100% 50%)`;
      canvas.addEventListener("click", (e) => {
        e.stopPropagation();
        this.model.select(s.id);
        // console.log("click square")
      });
      this.container.appendChild(canvas);
    });

    this.container.addEventListener("click", () => {
      // console.log("click background")
      this.model.deselectAll();
    });
    // controller of shapes

    // register with the model
    this.model.addObserver(this);
  }

  drawSquare(canvas: HTMLCanvasElement, s: Shape) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = `hsl(${s.hue1}deg 100% 50%)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // const shape = document.createElement("div");
    // shape.style.backgroundColor = `hsl(${s.hue1}deg 100% 50%)`;
  }
  drawStar(canvas: HTMLCanvasElement, s: Shape) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!s.point || !s.radius) return;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let tempouter = s.radius;
    let tempinner = 15;
    tempouter = s.radius;
    ctx.beginPath();
    
    for(var i = 1; i <= s.point * 2; i++) {
      var angle = i * (Math.PI * 2) / (s.point * 2);
      if(i % 2 == 0) {
        var xDest = centerX + (tempouter * Math.sin(angle));
        var yDest = centerY - (tempouter * Math.cos(angle));
      } else {
        var xDest = centerX + (tempinner * Math.sin(angle));
        var yDest = centerY - (tempinner * Math.cos(angle));
      }
      ctx.lineTo(xDest, yDest);
    }
    ctx.closePath();
    
    ctx.fillStyle = `hsl(${s.hue1}, 100%, 50%)`;
    ctx.fill();
    ctx.stroke();
  }
  drawBull(canvas: HTMLCanvasElement, s: Shape) {
    const ctx = canvas.getContext("2d");

  }
  drawCat(canvas: HTMLCanvasElement, s: Shape) {
    const ctx = canvas.getContext("2d");

  }
}
