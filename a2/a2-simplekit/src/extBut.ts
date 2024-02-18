import { SKButton, SKButtonProps, SKMouseEvent, Style } from "simplekit/imperative-mode";

export class ExtendedSKButton extends SKButton {
  constructor(elementProps: SKButtonProps) {
    super(elementProps);
  }

  protected _enabled: boolean = true;
  get enabled() {
    return this._enabled;
  }
  set enabled(v: boolean) {
    this._enabled = v;
  }

  handleMouseEvent(me: SKMouseEvent): boolean {
    // console.log(`${this.text} ${me.type}`);
    if (!this._enabled) return false;
    return super.handleMouseEvent(me);
  }

  draw(gc: CanvasRenderingContext2D) {
    // to save typing "this" so much

    gc.save();
    if (!this._enabled) {
        gc.strokeStyle = "lightgray";
    } else {
        super.draw(gc);
        gc.restore();
        return;
    }

    const w = this.paddingBox.width;
    const h = this.paddingBox.height;

    gc.translate(this.margin, this.margin);

    // normal background
    gc.beginPath();
    gc.roundRect(this.x, this.y, w, h, 4);
    // change fill to show down state
    gc.lineWidth = 2;
    gc.strokeStyle = "gray";
    gc.stroke();
    gc.clip(); // clip text if it's wider than text area

    // button label
    gc.font = Style.font;
    gc.fillStyle = "gray";
    gc.textAlign = "center";
    gc.textBaseline = "middle";
    gc.fillText(this.text, this.x + w / 2, this.y + h / 2);

    gc.restore();
  }

  public toString(): string {
    return `SKButton '${this.text}'`;
  }
}
