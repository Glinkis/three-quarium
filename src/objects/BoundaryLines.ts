import { Geometry, LineDashedMaterial, LineSegments, Vector3 } from "three";
import { CUBE_CORNER_POINTS, cubePathFromCorners } from "../helpers/cubeShape";

const BOUNDARY_LINES_MATERIAL = new LineDashedMaterial({
  color: 0x61c791,
  dashSize: 1,
  gapSize: 1,
  name: "BoundaryLines"
});

export default class BoundaryLines extends LineSegments {
  constructor(size: number) {
    super();
    this.material = BOUNDARY_LINES_MATERIAL;
    this.geometry = new Geometry();

    this.setSize(size);
    this.computeLineDistances();
  }

  private setSize(size: number) {
    if (this.geometry instanceof Geometry) {
      // prettier-ignore
      const corners = CUBE_CORNER_POINTS
      .map(p => new Vector3().copy(p))
      .map(p => p.multiplyScalar(size * 0.5));

      this.geometry.vertices = cubePathFromCorners(corners);
    }
  }
}
