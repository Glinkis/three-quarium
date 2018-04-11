import createProperty from "../../helpers/createProperty";
import clamp from "../../math/clamp";

export default class Zoom {
  public static magnitude = 0.004;
  public min = 1;
  public max = 4;

  @createProperty<Zoom, number>({
    set(value, accessor) {
      accessor.set(clamp(value, this.min, this.max));
    }
  })
  public value = 0;

  constructor(value: number) {
    this.value = value;
  }
}
