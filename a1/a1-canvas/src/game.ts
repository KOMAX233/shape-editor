import { random } from "simplekit/utility";
import { Card } from "./card";

export class Game {
  constructor(
    public level: number,
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
    public cards: Card[] = []
  ) {}
  
  getNRandom(gc: CanvasRenderingContext2D) {
    let currCards: Card[] = [];
    let tempdecks: Card[] = this.decks.slice();
    for (let i = 0; i < this.level && i < 15; i++) {
      let randnum = Math.floor(random(0, tempdecks.length));
      let randcard = tempdecks[randnum];
      randcard.x = gc.canvas.width / 2 - randcard.size - 10;
      randcard.y = gc.canvas.height / 2;
      let index = tempdecks.indexOf(randcard);
      tempdecks.splice(index, 1);
      currCards.push(randcard);
      currCards.push(randcard);
    }
    this.cards = currCards;
    console.log(this.cards);
  }
  displayLevel(gc: CanvasRenderingContext2D) {
    this.cards.forEach((card) => card.draw(gc));
  }
}
