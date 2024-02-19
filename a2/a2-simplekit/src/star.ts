import {
  SKElement,
  SKElementProps,
  SKEvent,
  SKMouseEvent,
  SKResizeEvent,
  Style,
} from "simplekit/imperative-mode";

export type SKSquareProps = SKElementProps & {
  back?: boolean;
  checked?: boolean;
  hit?: boolean;
  hue?: number;
  size?: number;
  inner?: number;
  outer?: number;
  point?: number;
};

export class SKStar extends SKElement {
  constructor({
    back = true,
    checked = false,
    hit = false,
    hue = 0,
    size = 50,
    inner = 15, 
    outer = 20,
    point = 3,
    ...elementProps
  }: SKSquareProps = {}) {
    super(elementProps);
    this.back = back;
    this.checked = checked;
    this.hit = hit;
    this.hue = hue;
    this.size = size;
    this.width = size;
    this.height = size;
    this.inner = inner;
    this.outer = outer;
    this.point = point;
    this.calculateBasis();
    this.doLayout();
  }

  state: "idle" | "hover" | "down" = "idle";
  back: boolean;
  checked: boolean;
  hit: boolean;
  hue: number;
  size: number;
  inner: number;
  outer: number;
  point: number;
  


  handleMouseEvent(me: SKMouseEvent) {
    switch (me.type) {
      case "mousedown":
        this.state = "down";
        this.hit = true;
        return true;
        break;
      case "mouseup":
        this.state = "hover";
        this.checked = !this.checked;
        // return true if a listener was registered
        // console.log(me.x,",", me.y);
        this.hit = true;
        return this.sendEvent({
          source: this,
          timeStamp: me.timeStamp,
          type: "action",
        } as SKEvent);
        break;
      case "mouseenter":
        this.state = "hover";
        this.hit = false;
        return true;
        break;
      case "mouseexit":
        this.state = "idle";
        this.hit = false;
        return true;
        break;
    }
    return false;
  }

  draw(gc: CanvasRenderingContext2D) {
    // to save typing "this" so much

    gc.save();


    // const w = this.paddingBox.width;
    // const h = this.paddingBox.height;

    gc.translate(this.margin, this.margin);

    // thick highlight rect
    if (this.state == "hover" || this.state == "down") {
      gc.beginPath();
      gc.rect(this.x, this.y, this.size, this.size);
      gc.strokeStyle = Style.highlightColour;
      gc.lineWidth = 8;
      gc.fill();
      gc.stroke();
    }

    if (this.back) {
      // normal background
      gc.beginPath();
      gc.rect(this.x, this.y, this.size, this.size);
      gc.fillStyle = "white";
      gc.fill();
      // gc.fillStyle =
      //   this.state == "down" ? Style.focusColour : `hsl(${this.hue}deg 100% 50%)`;
      gc.fillStyle = `hsl(${this.hue}deg 100% 50%)`;
      gc.strokeStyle = "black";
      // change fill to show down state
      // gc.lineWidth = this.state == "down" ? 4 : 2;
      gc.lineWidth = 2;
      // gc.fill();
      gc.stroke();
    }


    const centerX = this.x + 50 / 2;
    const centerY = this.y + 50 / 2;
    let tempouter = this.outer;
    let tempinner = this.inner;
    if (this.back) {
      tempouter = this.outer / 2;
      tempinner = this.inner / 2;
    } else {
      tempouter = this.outer;
      tempinner = this.inner;
    }
    gc.beginPath();
    
    for(var i = 1; i <= this.point * 2; i++) {
      var angle = i * (Math.PI * 2) / (this.point * 2);
      if(i % 2 == 0) {
        var xDest = centerX + (tempouter * Math.sin(angle));
        var yDest = centerY - (tempouter * Math.cos(angle));
      } else {
        var xDest = centerX + (tempinner * Math.sin(angle));
        var yDest = centerY - (tempinner * Math.cos(angle));
      }
      gc.lineTo(xDest ,yDest);
    }
    gc.closePath();
    
    gc.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
    gc.fill();
    gc.stroke();


    if (this.back) {
      // checked state
      if (this.checked) {
        gc.beginPath();
        gc.rect(this.x-3, this.y-3, this.size+6, this.size+6);
        // gc.moveTo(this.x + 5, this.y + 5);
        // gc.lineTo(this.x + size - 5, this.y + size - 5);
        // gc.moveTo(this.x + size - 5, this.y + 5);
        // gc.lineTo(this.x + 5, this.y + size - 5);
        gc.strokeStyle = Style.focusColour;
        gc.lineWidth = 2;
        gc.stroke();
      }
    }

    gc.restore();

    // element draws debug viz if flag is set
    super.draw(gc);
  }

  public toString(): string {
    return `SKSquare`;
  }
}
