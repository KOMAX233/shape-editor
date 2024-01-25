import { Cat } from "./cat";
import { Star } from "./star";
import { Bullseye } from "./bullseye";

export class Card {
  constructor(
    public x: number,
    public y: number,
    public size: number,
    public drawing: string,
    public fill?: string, // optional parameters
    public stroke?: string,
    public lineWidth?: number
  ) {}

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
    }
  }

  // cat
  // drawCatMidBrown(gc:CanvasRenderingContext2D) {
  //   this.draw(gc);
  //   const catMidBrown = new Cat(this.x, this.y, 0.6, "#CEA242", "mid");
  //   catMidBrown.drawCat(gc);
  // }
  // drawCatLeftOrange(gc:CanvasRenderingContext2D) {
  //   this.draw(gc);
  //   const catLeftOrange = new Cat(this.x, this.y, 0.6, "#fa4405", "left");
  //   catLeftOrange.drawCat(gc);
  // }
  // drawCatRightBlue(gc:CanvasRenderingContext2D) {
  //   this.draw(gc);
  //   const catLeftOrange = new Cat(this.x, this.y, 0.6, "#1d93fa", "right");
  //   catLeftOrange.drawCat(gc);
  // }
  // drawCatMidGreen(gc:CanvasRenderingContext2D) {
  //   this.draw(gc);
  //   const catLeftOrange = new Cat(this.x, this.y, 0.6, "#2e4c4d", "mid");
  //   catLeftOrange.drawCat(gc);
  // }
  // drawCatMidGrey(gc:CanvasRenderingContext2D) {
  //   this.draw(gc);
  //   const catLeftOrange = new Cat(this.x, this.y, 0.6, "#848484", "mid");
  //   catLeftOrange.drawCat(gc);
  // }
  // // star
  // drawCard5star(gc:CanvasRenderingContext2D) {
  //   this.draw(gc);
  //   const star = new Star(this.x, this.y, 5, 25, "yellow", "black", 3);
  //   star.draw(gc);
  // }
  // drawCard7star(gc:CanvasRenderingContext2D) {
  //   this.draw(gc);
  //   const star = new Star(this.x, this.y, 7, 25, "yellow", "black", 3);
  //   star.draw(gc);
  // }
  // drawCard6star(gc:CanvasRenderingContext2D) {
  //   this.draw(gc);
  //   const star = new Star(this.x, this.y, 6, 25, "orange", "black", 3);
  //   star.draw(gc);
  // }
  // drawCard10star(gc:CanvasRenderingContext2D) {
  //   this.draw(gc);
  //   const star = new Star(this.x, this.y, 10, 25, "yellow", "black", 3);
  //   star.draw(gc);
  // }
  // drawCard4star(gc:CanvasRenderingContext2D) {
  //   this.draw(gc);
  //   const star = new Star(this.x, this.y, 4, 25, "yellow", "black", 3);
  //   star.draw(gc);
  // }
  // // bullseye
  // drawBullseye3RedBlue(gc:CanvasRenderingContext2D) {
  //   this.draw(gc);
  //   const bullseye = new Bullseye(this.x, this.y, 30, 3, "black", ["red", "#1c94fc"]);
  //   bullseye.draw(gc);
  // }
  // drawBullseye4Black(gc:CanvasRenderingContext2D) {
  //   this.draw(gc);
  //   const bullseye = new Bullseye(this.x, this.y, 30, 4, "white", ["black"]);
  //   bullseye.draw(gc);
  // }
  // drawBullseye5BlueRed(gc:CanvasRenderingContext2D) {
  //   this.draw(gc);
  //   const bullseye = new Bullseye(this.x, this.y, 30, 5, "black", ["#1c94fc", "red"]);
  //   bullseye.draw(gc);
  // }
  // drawBullseye4OrangeYellow(gc:CanvasRenderingContext2D) {
  //   this.draw(gc);
  //   const bullseye = new Bullseye(this.x, this.y, 30, 4, "black", ["orange", "yellow"]);
  //   bullseye.draw(gc);
  // }
  // drawBullseye3GreenYellow(gc:CanvasRenderingContext2D) {
  //   this.draw(gc);
  //   const bullseye = new Bullseye(this.x, this.y, 30, 3, "black", ["green", "yellow"]);
  //   bullseye.draw(gc);
  // }
}
