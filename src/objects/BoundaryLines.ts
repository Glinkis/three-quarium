import { Geometry, LineDashedMaterial, LineSegments, Vector3 } from "three";
import { CUBE_CORNER_POINTS, cubePathFromCorners } from "../helpers/cubeShape";

export default class BoundaryLines extends LineSegments {
  public size?: number;

  constructor(size: number) {
    super();
    this.updateSize(size);
    this.setMaterial();
  }

  public updateSize(size: number) {
    this.geometry = new Geometry();
    // prettier-ignore
    const corners = CUBE_CORNER_POINTS
      .map(p => new Vector3().copy(p))
      .map(p => p.multiplyScalar(size * 0.5));

    this.geometry.vertices = cubePathFromCorners(corners);
    this.size = size;

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
