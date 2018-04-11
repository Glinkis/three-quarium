import { Geometry, LineDashedMaterial, LineSegments, Vector3 } from "three";

export default class BoundaryLines extends LineSegments {
  private size: number;

  constructor(size: number) {
    super();
    this.size = size;
    this.setMaterial();
    this.setGeometry();
  }

  private setMaterial() {
    this.material = new LineDashedMaterial({
      color: 0x61c791,
      dashSize: 1,
      gapSize: 1
    });
  }

  private setGeometry() {
    const half = this.size * 0.5;
    this.geometry = new Geometry();
    const points = [
      new Vector3(-half, -half, -half),
      new Vector3(-half, half, -half),
      new Vector3(half, half, -half),
      new Vector3(half, -half, -half),
      new Vector3(-half, -half, half),
      new Vector3(-half, half, half),
      new Vector3(half, half, half),
      new Vector3(half, -half, half)
    ];
    // prettier-ignore
    this.geometry.vertices.push(
      points[0], points[1],
      points[1], points[2],
      points[2], points[3],
      points[3], points[0],
      points[4], points[5],
      points[5], points[6],
      points[6], points[7],
      points[7], points[4],
      points[0], points[4],
      points[1], points[5],
      points[2], points[6],
      points[3], points[7]
    );
  }
}
