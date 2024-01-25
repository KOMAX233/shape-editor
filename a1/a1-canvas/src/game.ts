import { random } from "simplekit/utility";
import { Card } from "./card";

export class Game {
  constructor(
    public level: number,
    public playMode: boolean,
    public decks: Card[] = [  
      new Card(100, 100, 80, "Card5star", "white", "black", 2),
      new Card(200, 100, 80, "Card7star", "white", "black", 2),
      new Card(300, 100, 80, "Card6star", "white", "black", 2),
      new Card(400, 100, 80, "Card10star", "white", "black", 2),
      new Card(500, 100, 80, "Card4star", "white", "black", 2),
      new Card(100, 200, 80, "CatMidBrown", "white", "black", 2),
      new Card(200, 200, 80, "CatLeftOrange", "white", "black", 2),
      new Card(300, 200, 80, "CatRightBlue", "white", "black", 2),
      new Card(400, 200, 80, "CatMidGreen", "white", "black", 2),
      new Card(500, 200, 80, "CatMidGrey", "white", "black", 2),
      new Card(100, 300, 80, "Bullseye3RedBlue", "white", "black", 2),
      new Card(200, 300, 80, "Bullseye4Black", "white", "black", 2),
      new Card(300, 300, 80, "Bullseye5BlueRed", "white", "black", 2),
      new Card(400, 300, 80, "Bullseye4OrangeYellow", "white", "black", 2),
      new Card(500, 300, 80, "Bullseye3GreenYellow", "white", "black", 2)
    ],
    public cards: Card[] = [],
    public x?: number,
    public y?: number
  ) {}
  
  getNRandom(gc: CanvasRenderingContext2D) {
    let currCards: Card[] = [];
    let tempdecks: Card[] = this.decks.slice();
    for (let i = 0; i < this.level && i < 15; i++) {
      let randnum = Math.floor(random(0, tempdecks.length));
      let randcard = tempdecks[randnum];
      let clonecard = Object.create(randcard);
      let index = tempdecks.indexOf(randcard);
      tempdecks.splice(index, 1);
      currCards.push(randcard);
      currCards.push(clonecard);
    }
    this.cards = currCards;
    // console.log(this.cards);
  }

  displayLevel(gc: CanvasRenderingContext2D) {
    const spacing = 10;
    const cardSize = this.cards[0].size;
    const cardsNum = this.cards.length;
    const hborder = 50;
    if (this.x == undefined || this.y == undefined) {
      this.x = gc.canvas.width;
      this.y = gc.canvas.height;
    }
    // console.log(this.x, this.y);
    const rowNum = Math.ceil(cardsNum / this.x);
    const maxCardNumRow = Math.floor((this.x - hborder * 2) / (cardSize + spacing));
    // only one row
    let cardsWidth: number;
    if (cardsNum < maxCardNumRow) {
      cardsWidth =  cardsNum * cardSize + (cardsNum - 1) * spacing;
    } else { // more than one row
      // need to fix: when more than one row, cards not in center???
      cardsWidth = maxCardNumRow * cardSize + (maxCardNumRow - 1) * spacing;
    }
    const cardsHeight = rowNum * cardSize + (rowNum - 1) *cardSize;
    const leftX = (this.x - cardsWidth) / 2;
    const leftY = (this.y - cardsHeight) / 2;
    // console.log(rowNum, maxCardNumRow, cardsWidth, cardsHeight, leftX, leftY);
    for (let i = 0; i < cardsNum; i++) {
      const row = Math.floor(i / maxCardNumRow);
      const col = i % maxCardNumRow;
      this.cards[i].x = leftX + col * (spacing + cardSize);
      this.cards[i].y = leftY + row * (spacing + cardSize);
      this.cards[i].draw(gc);
    }
  }
  enterPlayMode(gc: CanvasRenderingContext2D) {
    this.cards.forEach(card => {
      // console.log(card);
      card.drawing = "";
      card.fill = "white";
      this.drawLightBlueSquare(gc, card.x, card.y);
    });
  }
  drawLightBlueSquare(gc: CanvasRenderingContext2D, x: number, y: number) {
    gc.save()
    gc.fillStyle = "lightblue";
    const squareSize = 70;
    gc.beginPath();
    gc.rect(x - squareSize / 2, y - squareSize / 2, squareSize, squareSize);
    gc.fill();
    gc.restore();
  }
}
