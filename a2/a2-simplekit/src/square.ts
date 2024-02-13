import {
  SKElement,
  SKElementProps,
  SKEvent,
  SKMouseEvent,
  Style,
} from "simplekit/imperative-mode";

export type SKSquareProps = SKElementProps & { checked?: boolean } & {hue?: number};

export class SKSquare extends SKElement {
  constructor({
    checked = false,
    hue = 0,
    ...elementProps
  }: SKSquareProps = {}) {
    super(elementProps);
    this.checked = checked;
    this.hue = hue;
    this.width = Style.minElementSize - 10;
    this.height = Style.minElementSize - 10;
    this.calculateBasis();
    this.doLayout();
  }

  state: "idle" | "hover" | "down" = "idle";

  checked: boolean;

  hue: number;

  handleMouseEvent(me: SKMouseEvent) {
    switch (me.type) {
      case "mousedown":
        this.state = "down";
        return true;
        break;
      case "mouseup":
        this.state = "hover";
        this.checked = !this.checked;
        // return true if a listener was registered
        return this.sendEvent({
          source: this,
          timeStamp: me.timeStamp,
          type: "action",
        } as SKEvent);
        break;
      case "mouseenter":
        this.state = "hover";
        return true;
        break;
      case "mouseexit":
        this.state = "idle";
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
    const size = 50;

    gc.translate(this.margin, this.margin);
    gc.beginPath();
    gc.fillStyle = `hsl(${this.hue}deg 100% 50%)`; 
    console.log(this.hue);
    gc.strokeStyle = "black";
    gc.lineWidth = 1;
    gc.rect(this.x, this.y, size, size);
    gc.fill();
    gc.stroke();


    // thick highlight rect
    if (this.state == "hover" || this.state == "down") {
      gc.beginPath();
      gc.rect(this.x, this.y, size, size);
      gc.strokeStyle = Style.highlightColour;
      gc.lineWidth = 8;
      gc.fill();
      gc.stroke();
    }

    // normal background
    // gc.beginPath();
    // gc.rect(this.x, this.y, w, h);
    // gc.fillStyle =
    //   this.state == "down" ? Style.highlightColour : "whitesmoke";
    // gc.strokeStyle = "black";
    // // change fill to show down state
    // gc.lineWidth = this.state == "down" ? 4 : 2;
    // gc.fill();
    // gc.stroke();
    // gc.clip(); // clip text if it's wider than text area

    // checked state
    if (this.checked === true) {
      gc.beginPath();
      gc.moveTo(this.x + 5, this.y + 5);
      gc.lineTo(this.x + size - 5, this.y + size - 5);
      gc.moveTo(this.x + size - 5, this.y + 5);
      gc.lineTo(this.x + 5, this.y + size - 5);
      gc.strokeStyle = "black";
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
