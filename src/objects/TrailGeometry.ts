import { Geometry, Vector3 } from "three";

export default class TrailGeometry extends Geometry {
  public build(target: Vector3) {
    this.vertices.length = 32;
    this.vertices.fill(target.clone());
  }

  public update(target: Vector3) {
    const vertex = target.clone();
    this.vertices.shift();
    this.vertices.push(vertex);
    this.verticesNeedUpdate = true;
  }
}
