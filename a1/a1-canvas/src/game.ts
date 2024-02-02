import { random } from "simplekit/utility";
import { Card } from "./card";

export class Game {
  constructor(
    public level: number,
    public mode: string,
    public randomized: boolean,
    public decks: Card[] = [
      new Card(100, 100, 80, "Card5star", false, false, false, false, 0, "white", "black", 2),
      new Card(200, 100, 80, "Card7star", false, false, false, false, 0, "white", "black", 2),
      new Card(300, 100, 80, "Card6star", false, false, false, false, 0, "white", "black", 2),
      new Card(400, 100, 80, "Card10star", false, false, false, false, 0, "white", "black", 2),
      new Card(500, 100, 80, "Card4star", false, false, false, false, 0, "white", "black", 2),
      new Card(100, 200, 80, "CatMidBrown", false, false, false, false, 0, "white", "black", 2),
      new Card(200, 200, 80, "CatLeftOrange", false, false, false, false, 0, "white", "black", 2),
      new Card(300, 200, 80, "CatRightBlue", false, false, false, false, 0, "white", "black", 2),
      new Card(400, 200, 80, "CatMidGreen", false, false, false, false, 0, "white", "black", 2),
      new Card(500, 200, 80, "CatMidGrey", false, false, false, false, 0, "white", "black", 2),
      new Card(100, 300, 80, "Bullseye3RedBlue", false, false, false, false, 0, "white", "black", 2),
      new Card(200, 300, 80, "Bullseye4Black", false, false, false, false, 0, "white", "black", 2),
      new Card(300, 300, 80, "Bullseye5BlueRed", false, false, false, false, 0, "white", "black", 2),
      new Card(400, 300, 80, "Bullseye4OrangeYellow", false, false, false, false, 0, "white", "black", 2),
      new Card(500, 300, 80, "Bullseye3GreenYellow", false, false, false, false, 0, "white", "black", 2)
    ],
    public cards: Card[] = [],
    public selectedCards: Card[] = [],
    public win: boolean = false,
    public cheat: boolean = false,
    public addcentered: boolean = false,
    public x?: number,
    public y?: number
  ) {}
  
  getNRandom() {    
    let currCards: Card[] = [];
    // make a new copy of decks with functions in Cards working
    // structuredClone(this.decks) not card.draw() working
    let tempdecks = [
      new Card(100, 100, 80, "Card5star", false, false, false, false, 0, "white", "black", 2),
      new Card(200, 100, 80, "Card7star", false, false, false, false, 0, "white", "black", 2),
      new Card(300, 100, 80, "Card6star", false, false, false, false, 0, "white", "black", 2),
      new Card(400, 100, 80, "Card10star", false, false, false, false, 0, "white", "black", 2),
      new Card(500, 100, 80, "Card4star", false, false, false, false, 0, "white", "black", 2),
      new Card(100, 200, 80, "CatMidBrown", false, false, false, false, 0, "white", "black", 2),
      new Card(200, 200, 80, "CatLeftOrange", false, false, false, false, 0, "white", "black", 2),
      new Card(300, 200, 80, "CatRightBlue", false, false, false, false, 0, "white", "black", 2),
      new Card(400, 200, 80, "CatMidGreen", false, false, false, false, 0, "white", "black", 2),
      new Card(500, 200, 80, "CatMidGrey", false, false, false, false, 0, "white", "black", 2),
      new Card(100, 300, 80, "Bullseye3RedBlue", false, false, false, false, 0, "white", "black", 2),
      new Card(200, 300, 80, "Bullseye4Black", false, false, false, false, 0, "white", "black", 2),
      new Card(300, 300, 80, "Bullseye5BlueRed", false, false, false, false, 0, "white", "black", 2),
      new Card(400, 300, 80, "Bullseye4OrangeYellow", false, false, false, false, 0, "white", "black", 2),
      new Card(500, 300, 80, "Bullseye3GreenYellow", false, false, false, false, 0, "white", "black", 2)
    ];
    // console.log('Original Deck:', this.decks);
    this.shuffle(tempdecks);
    // console.log('Shuffled Deck:', tempdecks);
    for (let i = 0; i < this.level && i < 15; i++) {
      let clonecard = new Card(tempdecks[i].x, tempdecks[i].y, tempdecks[i].size, 
        tempdecks[i].drawing, tempdecks[i].hit, tempdecks[i].selected, tempdecks[i].matched, tempdecks[i].peeked,
        tempdecks[i].r, tempdecks[i].fill, tempdecks[i].stroke, tempdecks[i].lineWidth);
      currCards.push(tempdecks[i]);
      currCards.push(clonecard);
    }
    // console.log('Final Cards:', currCards);
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
    const lastRow = Math.ceil(cardsNum / maxCardNumRow) - 1;
    const lastRowCardNum = cardsNum % maxCardNumRow;
    const lastCardsWidth = lastRowCardNum * cardSize + (lastRowCardNum - 1) * spacing;
    // console.log(rowNum, maxCardNumRow, cardsWidth, cardsHeight, leftX, leftY);
    if (this.mode === "start") {
      for (let i = 0; i < cardsNum; i++) {
        const row = Math.floor(i / maxCardNumRow);
        const col = i % maxCardNumRow;
        // if (row != lastRow || lastRowCardNum == maxCardNumRow) {
          this.cards[i].x = leftX + col * (spacing + cardSize);
          this.cards[i].y = leftY + row * (spacing + cardSize);
        // } else {
        //   this.cards[i].x = (this.x - lastCardsWidth) / 2 + col * (spacing + cardSize);
        //   this.cards[i].y = leftY + row * (spacing + cardSize);
        // }
        console.log(row, lastRow);
      }    
      // to-do: step 9: message center in the window and top of top of cards
      // gc.fillText(`${this.level} pair${(this.level > 1)? "s": ""}: Press SPACE to play`, gc.canvas.width / 2, (gc.canvas.height - (this.cards[0].y + this.cards[0].size / 2)) / 2 - 12);
      gc.fillText(`${this.level} pair${(this.level > 1)? "s": ""}: Press SPACE to play`, gc.canvas.width / 2, (gc.canvas.height / 4));
    }

    this.cards.forEach(card => {
      card.draw(gc);
    });

    if (this.mode === "play") {
      this.cards.forEach((card) => {
        if (!card.peeked) {
          if (!card.selected) {
            if (!this.cheat) {
              this.drawLightBlueSquare(gc, card.x, card.y);
            }
          }
        }
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
      // gc.fillText("you finished! press SPACE to continue", gc.canvas.width / 2, (gc.canvas.height - this.cards[0].y) / 2 - 12);  
      gc.fillText("you finished! press SPACE to continue", gc.canvas.width / 2, (gc.canvas.height / 4));  
    }
  }

  // not calling
  randomizeCards() {
    this.randomized = true;

    const drawings = this.cards.map(card => card.drawing);
    for (let i = drawings.length - 1; i > 0; i--) {
      const j = Math.floor(random(0, i + 1));
      let tempdraw = drawings[i];
      drawings[i] = drawings[j];
      drawings[j] = tempdraw;
    }
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].drawing = drawings[i];
    }
  }

  shuffle(targetCards: Card[]) {
    this.randomized = true;
    const drawings = targetCards.map(card => card.drawing);
    for (let i = drawings.length - 1; i > 0; i--) {
      const j = Math.floor(random(0, i + 1));
      let tempdraw = drawings[i];
      drawings[i] = drawings[j];
      drawings[j] = tempdraw;
      // prepare for animateShuffle x, y
      targetCards[i].beforeX = targetCards[j].x;
      targetCards[i].beforeY = targetCards[j].y;
      targetCards[j].beforeX = targetCards[i].x;
      targetCards[j].beforeY = targetCards[i].y;
    }
    for (let i = 0; i < targetCards.length; i++) {
      targetCards[i].drawing = drawings[i];
    }
    return targetCards;
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
