export class Star {
  constructor(
    public x: number,
    public y: number,
    public point: number,
    public size: number,
    public fill?: string, // optional parameters
    public stroke?: string,
    public lineWidth?: number
  ) {}

  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    // gc.translate(this.x, this.y);
    // gc.scale(this.size, this.size);
    
    if (this.fill) gc.fillStyle = this.fill;
    if (this.stroke) gc.strokeStyle = this.stroke;
    if (this.lineWidth) gc.lineWidth = this.lineWidth;

    gc.beginPath();
    
    for(var i = 1; i <= this.point * 2; i++) {
      var angle = i * (Math.PI * 2) / (this.point * 2);
      if(i % 2 == 0) {
        var xDest = this.x + (this.size * Math.sin(angle));
        var yDest = this.y - (this.size * Math.cos(angle));
      } else {
        var xDest = this.x + ((this.size/2) * Math.sin(angle));
        var yDest = this.y - ((this.size/2) * Math.cos(angle));
      }
      gc.lineTo(xDest ,yDest);
    }
    gc.closePath();
    gc.stroke();
    gc.fill();

    gc.restore();
  }
}
