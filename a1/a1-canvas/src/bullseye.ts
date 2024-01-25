export class Bullseye {
  constructor(
    public x: number, 
    public y: number, 
    public r: number,
    public layer: number,
    public stroke: string,
    public fill: string[],
    public scale = 1.0,
  ) {}

  draw(gc: CanvasRenderingContext2D) {
    gc.save();

    gc.translate(this.x, this.y);
    gc.scale(this.scale, this.scale);

    gc.strokeStyle = this.stroke;
    gc.lineWidth = 5;

    for (let i = 0; i < this.layer; i++) {
      gc.fillStyle = this.fill[i%(this.fill.length)];
      // outline
      gc.beginPath();
      gc.arc(0, 0, this.r-this.r/this.layer*i, 0, 2 * Math.PI);
      gc.stroke();
      // fill
      gc.beginPath();
      gc.arc(0, 0, this.r-this.r/this.layer*i, 0, 2 * Math.PI);
      gc.fill();
    }

    gc.restore();
  }
}
