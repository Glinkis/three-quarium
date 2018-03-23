import {
  LineSegments,
  Geometry,
  Material,
  LineDashedMaterial,
  Vector3
} from "three";

export default class BoundaryLines extends LineSegments {
  size: number;
  geometry: Geometry;
  material: Material;

  constructor(size: number) {
    super();
    this.size = size;
    this.setMaterial();
    this.setGeometry();
  }

  setMaterial() {
    this.material = new LineDashedMaterial({
      color: 0x61c791,
      dashSize: 1,
      gapSize: 1
    });
  }

  setGeometry() {
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
    // this.geometry.computeLineDistances();
  }
}
