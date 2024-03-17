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
        shapelistView.drawSquare(canvas, s);
      } else if (s.drawing === "Star") {
        shapelistView.drawStar(canvas, s);
      } else if (s.drawing === "Bullseye") {
        shapelistView.drawBull(canvas, s);
      } else if (s.drawing === "Cat") {
        shapelistView.drawCat(canvas, s);
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
        shapelistView.drawSquare(canvas, s);
      } else if (s.drawing === "Star") {
        shapelistView.drawStar(canvas, s);
      } else if (s.drawing === "Bullseye") {
        shapelistView.drawBull(canvas, s);
      } else if (s.drawing === "Cat") {
        shapelistView.drawCat(canvas, s);
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

  static drawSquare(canvas: HTMLCanvasElement, s: Shape) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.fillStyle = `hsl(${s.hue1}deg 100% 50%)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }
  static drawStar(canvas: HTMLCanvasElement, s: Shape) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!s.point || !s.radius) return;
    ctx.save();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let tempouter = s.radius / 100 * canvas.width;
    let tempinner = 15 / 100 * canvas.width;
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
    ctx.restore();
  }
  static drawBull(canvas: HTMLCanvasElement, s: Shape) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!s.rings || !s.hue2) return;
    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);

    ctx.strokeStyle = "1px solid grey";
    ctx.lineWidth = 5;

    for (let i = 0; i < s.rings; i++) {
      const size = canvas.width / 2 - 3;
      ctx.fillStyle = `hsl(${(i % 2)? s.hue1: s.hue2}, 100%, 50%)`;
      // outline
      ctx.beginPath();
      ctx.arc(0, 0, size - size / s.rings * i, 0, 2 * Math.PI);
      ctx.stroke();
      // fill
      ctx.beginPath();
      ctx.arc(0, 0, size - size / s.rings * i, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.restore();
  }
  static drawCat(canvas: HTMLCanvasElement, s: Shape) {
    const ctx = canvas.getContext("2d");

  }
}
