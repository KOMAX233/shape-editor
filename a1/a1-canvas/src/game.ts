import { random } from "simplekit/utility";
import { Card } from "./card";

export class Game {
  constructor(
    public level: number,
    public mode: string,
    public randomized: boolean,
    public decks: Card[] = [  
      new Card(100, 100, 80, "Card5star", false, false, false, "white", "black", 2),
      new Card(200, 100, 80, "Card7star", false, false, false, "white", "black", 2),
      new Card(300, 100, 80, "Card6star", false, false, false, "white", "black", 2),
      new Card(400, 100, 80, "Card10star", false, false, false, "white", "black", 2),
      new Card(500, 100, 80, "Card4star", false, false, false, "white", "black", 2),
      new Card(100, 200, 80, "CatMidBrown", false, false, false, "white", "black", 2),
      new Card(200, 200, 80, "CatLeftOrange", false, false, false, "white", "black", 2),
      new Card(300, 200, 80, "CatRightBlue", false, false, false, "white", "black", 2),
      new Card(400, 200, 80, "CatMidGreen", false, false, false, "white", "black", 2),
      new Card(500, 200, 80, "CatMidGrey", false, false, false, "white", "black", 2),
      new Card(100, 300, 80, "Bullseye3RedBlue", false, false, false, "white", "black", 2),
      new Card(200, 300, 80, "Bullseye4Black", false, false, false, "white", "black", 2),
      new Card(300, 300, 80, "Bullseye5BlueRed", false, false, false, "white", "black", 2),
      new Card(400, 300, 80, "Bullseye4OrangeYellow", false, false, false, "white", "black", 2),
      new Card(500, 300, 80, "Bullseye3GreenYellow", false, false, false, "white", "black", 2)
    ],
    public cards: Card[] = [],
    public selectedCards: Card[] = [],
    public win: boolean = false,
    public x?: number,
    public y?: number
  ) {}
  
  getNRandom() {
    let currCards: Card[] = [];
    let tempdecks: Card[] = this.decks.slice();
    for (let i = 0; i < this.level && i < 15; i++) {
      let randnum = Math.floor(random(0, tempdecks.length));
      let randcard = tempdecks[randnum];
      let clonecard = new Card(randcard.x, randcard.y, randcard.size, 
        randcard.drawing, randcard.hit, randcard.selected, randcard.matched, 
        randcard.fill, randcard.stroke, randcard.lineWidth);
      tempdecks.splice(randnum, 1);
      currCards.push(randcard);
      currCards.push(clonecard);
    }
    this.cards = currCards;
  }

  displayLevel(gc: CanvasRenderingContext2D) {
    const spacing = 10;
    let cardSize = 0;
    if (this.cards.length > 0) {
      cardSize = this.cards[0].size;
    }
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
    if (this.mode === "start") {
      for (let i = 0; i < cardsNum; i++) {
        const row = Math.floor(i / maxCardNumRow);
        const col = i % maxCardNumRow;
        this.cards[i].x = leftX + col * (spacing + cardSize);
        this.cards[i].y = leftY + row * (spacing + cardSize);
      }    
      // to-do: step 9: message center in the window and top of top of cards
      gc.fillText(`${this.level} pair${(this.level > 1)? "s": ""}: Press SPACE to play`, gc.canvas.width / 2, (gc.canvas.height - (this.cards[0].y + this.cards[0].size / 2)) / 2 - 12);
    }

    this.cards.forEach(card => {
      card.draw(gc);
    });

    if (this.mode === "play") {
      this.cards.forEach((card) => {
        if (!card.selected) this.drawLightBlueSquare(gc, card.x, card.y);
        if (card.matched) {
          card.drawLighterRect(gc);
        }
        
      });
      // check if all cards matched
      for (const card of this.cards) {
        if (!card.matched) {
          this.win = false;
          break;
        }
        this.win = true
      }
    } else if (this.mode === "win") {
      gc.fillText("you finished! press SPACE to continue", gc.canvas.width / 2, (gc.canvas.height - this.cards[0].y) / 2 - 12);  
    }
  }

  randomizeCards() {
    this.randomized = true;
    // fisher-yates shuffle
    // rand: neg ab, pos ba, 0 no change
    this.cards.sort(() => random(0, 1) - 0.5);
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

  checkMatch() {
    let ret = false;
    // set to matched
    if (this.selectedCards.length == 2) {
      if (this.selectedCards[0].drawing == this.selectedCards[1].drawing) {
        this.selectedCards[0].matched = true;
        this.selectedCards[1].matched = true;
        ret = true;
      }
    }
    return ret;
  }
}
