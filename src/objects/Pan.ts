export default class Pan {
  public static magnitude = 0.008;
  public x: number;
  public y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public copy() {
    return new Pan(this.x, this.y);
  }
}
