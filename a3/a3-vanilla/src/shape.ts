export class Shape {
  public id: number;
  public drawing: string;
  public selected: boolean;
  public texthue1: string;
  public hue1: number;
  public texthue2: string;
  public hue2?: number;
  public textRing: string;
  public rings?: number;
  public textPoint?: string;
  public point?: number;
  public textR?: string;
  public radius?: number;
  public look?: number;

  private static uniqueID = 1;

  constructor(hue1: number, drawing: string, selected = false, point: number, radius: number, hue2: number, rings: number, look: number) {
    this.id = Shape.uniqueID++;
    this.drawing = drawing;
    this.selected = selected;
    this.hue1 = hue1;
    this.texthue1 = String(hue1);
    this.point = point;
    this.textPoint = String(point);
    this.radius = radius;
    this.textR = String(radius);
    this.hue2 = hue2;
    this.texthue2 = String(hue2);
    this.rings = rings;
    this.textRing = String(rings);
    this.look = look;
  }
}
