import { Cat } from "./cat";
import { Star } from "./star";
import { Bullseye } from "./bullseye";
import { insideHitTestRectangle } from "./hittest"

export class Card {
  constructor(
    public x: number,
    public y: number,
    public size: number,
    public drawing: string,
    public hit: boolean,
    public selected: boolean,
    public matched: boolean,
    public fill?: string, // optional parameters
    public stroke?: string,
    public lineWidth?: number
  ) {}

  hitTest(mx: number, my: number) {
    let hit = false;
    hit ||= insideHitTestRectangle(
      mx,
      my,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    // console.log(mx, this.x - this.size / 2, my, this.y - this.size / 2, this.size, this.size);
    return hit;
  }

  hitOutline(gc: CanvasRenderingContext2D) {
    gc.strokeStyle = "yellow";
    gc.lineWidth = 2;
    let spacing = 4;
    gc.beginPath();
    gc.moveTo(this.x - this.size / 2 - spacing, this.y - this.size / 2 - spacing);
    gc.lineTo(this.x + this.size / 2 + spacing, this.y - this.size / 2 - spacing);
    gc.lineTo(this.x + this.size / 2 + spacing, this.y + this.size / 2 + spacing);
    gc.lineTo(this.x - this.size / 2 - spacing, this.y + this.size / 2 + spacing);
    gc.closePath(); // try commenting out
    gc.stroke();
  }

  draw(gc: CanvasRenderingContext2D) {
    gc.beginPath();
    if (this.fill) gc.fillStyle = this.fill;
    if (this.stroke) gc.strokeStyle = this.stroke;
    if (this.lineWidth) gc.lineWidth = this.lineWidth;
    gc.rect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    if (this.fill) gc.fill();
    if (this.lineWidth) gc.stroke();
    let star;
    let cat;
    let bullseye;
    // use the correct drawing
    switch (this.drawing) {
      case "Card5star":
        star = new Star(this.x, this.y, 5, 25, "yellow", "black", 3);
        star.draw(gc);
        break;
      case "Card7star":
        star = new Star(this.x, this.y, 7, 25, "yellow", "black", 3);
        star.draw(gc);
        break;
      case "Card6star":
        star = new Star(this.x, this.y, 6, 25, "orange", "black", 3);
        star.draw(gc);
        break;
      case "Card10star":
        star = new Star(this.x, this.y, 10, 25, "yellow", "black", 3);
        star.draw(gc);
        break;
      case "Card4star":
        star = new Star(this.x, this.y, 4, 25, "yellow", "black", 3);
        star.draw(gc);
        break;
      case "CatMidBrown":
        const catMidBrown = new Cat(this.x, this.y, 0.6, "#CEA242", "mid");
        catMidBrown.drawCat(gc);
        break;
      case "CatLeftOrange":
        cat = new Cat(this.x, this.y, 0.6, "#fa4405", "left");
        cat.drawCat(gc);
        break;
      case "CatRightBlue":
        cat = new Cat(this.x, this.y, 0.6, "#1d93fa", "right");
        cat.drawCat(gc);
        break;
      case "CatMidGreen":
        cat = new Cat(this.x, this.y, 0.6, "#2e4c4d", "mid");
        cat.drawCat(gc);
        break;
      case "CatMidGrey":
        cat = new Cat(this.x, this.y, 0.6, "#848484", "mid");
        cat.drawCat(gc);
        break;
      case "Bullseye3RedBlue":
        bullseye = new Bullseye(this.x, this.y, 30, 3, "black", ["red", "#1c94fc"]);
        bullseye.draw(gc);
        break;
      case "Bullseye4Black":
        bullseye = new Bullseye(this.x, this.y, 30, 4, "white", ["black"]);
        bullseye.draw(gc);
        break;
      case "Bullseye5BlueRed":
        bullseye = new Bullseye(this.x, this.y, 30, 5, "black", ["#1c94fc", "red"]);
        bullseye.draw(gc);
        break;
      case "Bullseye4OrangeYellow":
        bullseye = new Bullseye(this.x, this.y, 30, 4, "black", ["orange", "yellow"]);
        bullseye.draw(gc);
        break;
      case "Bullseye3GreenYellow":
        bullseye = new Bullseye(this.x, this.y, 30, 3, "black", ["green", "yellow"]);
        bullseye.draw(gc);
        break;
      default:
        break;
    }
  }
  drawLighterRect(gc: CanvasRenderingContext2D) {
    // if matched, keep as lighter alpha and face up
    gc.fillStyle = "rgb(255 255 255 / 80%)";
    gc.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
  }
}
