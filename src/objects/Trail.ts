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
    this.geometry = new TrailGeometry();

    this.geometry.build(this.target);
    this.update();
  }

  private update = () => {
    requestAnimationFrame(this.update);
    this.geometry.update(this.target);
  };
}
