import { Line, LineBasicMaterial, Vector3 } from "three";
import TrailGeometry from "./TrailGeometry";

const TRAIL_MATERIAL = new LineBasicMaterial({ color: 0x61c791 });

export default class Trail extends Line {
  public geometry: TrailGeometry;
  private target: Vector3;

  constructor(target: Vector3) {
    super();
    this.target = target;

    this.material = TRAIL_MATERIAL;
    this.geometry = new TrailGeometry(this.target);

    this.onBeforeRender = this.update;
  }

  public update() {
    this.geometry.update(this.target);
  }
}
