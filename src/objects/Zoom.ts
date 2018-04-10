import clamp from "../math/clamp";

export default class Zoom {
  public static magnitude = 0.004;
  public min = 1;
  public max = 4;
  private value: number;

  constructor(value: number) {
    this.set(value);
  }
  public get() {
    return this.value;
  }
  public set(value: number) {
    this.value = clamp(value, this.min, this.max);
  }
}
