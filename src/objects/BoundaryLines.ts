import {
  Geometry,
  LineDashedMaterial,
  LineSegments,
  Material,
  Vector3
} from "three";

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
    this.geometry.vertices.push(
      new Vector3(-half, -half, -half),
      new Vector3(-half, half, -half),
      new Vector3(-half, half, -half),
      new Vector3(half, half, -half),
      new Vector3(half, half, -half),
      new Vector3(half, -half, -half),
      new Vector3(half, -half, -half),
      new Vector3(-half, -half, -half),
      new Vector3(-half, -half, half),
      new Vector3(-half, half, half),
      new Vector3(-half, half, half),
      new Vector3(half, half, half),
      new Vector3(half, half, half),
      new Vector3(half, -half, half),
      new Vector3(half, -half, half),
      new Vector3(-half, -half, half),
      new Vector3(-half, -half, -half),
      new Vector3(-half, -half, half),
      new Vector3(-half, half, -half),
      new Vector3(-half, half, half),
      new Vector3(half, half, -half),
      new Vector3(half, half, half),
      new Vector3(half, -half, -half),
      new Vector3(half, -half, half)
    );
  }
}
