import {
  SKElement,
  SKElementProps,
  SKEvent,
  SKMouseEvent,
  SKResizeEvent,
  Style,
} from "simplekit/imperative-mode";

export type SKSquareProps = SKElementProps & { 
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
    // gc.clip(); // clip text if it's wider than text area


    const centerX = this.x + 50 / 2;
    const centerY = this.y + 50 / 2;

    gc.beginPath();
    
    for(var i = 1; i <= this.point * 2; i++) {
      var angle = i * (Math.PI * 2) / (this.point * 2);
      if(i % 2 == 0) {
        var xDest = centerX + (this.outer * Math.sin(angle));
        var yDest = centerY - (this.outer * Math.cos(angle));
      } else {
        var xDest = centerX + ((this.inner) * Math.sin(angle));
        var yDest = centerY - ((this.inner) * Math.cos(angle));
      }
      gc.lineTo(xDest ,yDest);
    }
    gc.closePath();
    
    gc.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
    gc.fill();
    gc.stroke();



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

    gc.restore();

    // element draws debug viz if flag is set
    super.draw(gc);
  }

  public toString(): string {
    return `SKSquare`;
  }
}
