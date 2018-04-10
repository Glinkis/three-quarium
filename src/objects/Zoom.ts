import clamp from "../math/clamp";

export default class Zoom {
  public static magnitude = 0.004;
  public min = 1;
  public max = 4;
  // tslint:disable-next-line:variable-name
  private _value: number;

  public get value() {
    return this._value;
  }
  public set value(value: number) {
    this._value = clamp(value, this.min, this.max);
  }
  constructor(value: number) {
    this.value = value;
  }
}
