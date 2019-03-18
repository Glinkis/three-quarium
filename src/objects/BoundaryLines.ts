import { Geometry, LineDashedMaterial, LineSegments } from "three";
import { CUBE_CORNER_POINTS, cubePathFromCorners } from "../helpers/cubeShape";

export default class BoundaryLines extends LineSegments {
  public size?: number;

  constructor(size: number) {
    super();
    this.updateSize(size);
    this.setMaterial();
  }

  public updateSize(size: number) {
    this.size = size;
    this.geometry = new Geometry();
    this.geometry.vertices = cubePathFromCorners(
      CUBE_CORNER_POINTS.map(p => p.clone().multiplyScalar(size * 0.5))
    );
    this.computeLineDistances();
  }

  private setMaterial() {
    this.material = new LineDashedMaterial({
      color: 0x61c791,
      dashSize: 1,
      gapSize: 1
    });
  }
}
