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
  hue?: number;
  size?: number
};

export class SKSquare extends SKElement {
  constructor({
    checked = false,
    hue = 0,
    size = 50,
    ...elementProps
  }: SKSquareProps = {}) {
    super(elementProps);
    this.checked = checked;
    this.hue = hue;
    this.size = size;
    this.width = size;
    this.height = size;
    this.calculateBasis();
    this.doLayout();
  }

  state: "idle" | "hover" | "down" = "idle";
  checked: boolean;
  hue: number;
  size: number;

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
    // gc.fillStyle =
    //   this.state == "down" ? Style.focusColour : `hsl(${this.hue}deg 100% 50%)`;
    gc.fillStyle = `hsl(${this.hue}deg 100% 50%)`;
    gc.strokeStyle = "black";
    // change fill to show down state
    // gc.lineWidth = this.state == "down" ? 4 : 2;
    gc.lineWidth = 2;
    gc.fill();
    gc.stroke();
    // gc.clip(); // clip text if it's wider than text area

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
