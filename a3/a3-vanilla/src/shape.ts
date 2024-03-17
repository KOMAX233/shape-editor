export class Shape {
  public id: number;
  public drawing: string;
  public selected: boolean;
  public texthue1: string;
  public hue1: number;
  public hue2?: number;
  public rings?: number;
  public point?: number;
  public radius?: number;
  public look?: string;

  private static uniqueID = 1;

  constructor(hue1: number, drawing: string, selected = false, point: number, radius: number) {
    this.id = Shape.uniqueID++;
    this.drawing = drawing;
    this.selected = selected;
    this.hue1 = hue1;
    this.texthue1 = String(hue1);
    this.point = point;
    this.radius = radius;
  }
}
