export default class Rotation {
  public static magnitude = 0.004;
  public x: number;
  public y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public set(rotation: Rotation) {
    this.x = rotation.x;
    this.y = rotation.y;
  }

  public copy() {
    return new Rotation(this.x, this.y);
  }
}
