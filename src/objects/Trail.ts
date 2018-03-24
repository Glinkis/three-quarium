import {
  BufferGeometry,
  Geometry,
  Line,
  LineBasicMaterial,
  Vector3
} from "three";

const TRAIL_MATERIAL = new LineBasicMaterial({ color: 0x61c791 });

export default class Trail extends Line {
  private target: Vector3;

  constructor(target: Vector3) {
    super();
    this.target = target;
    this.material = TRAIL_MATERIAL;

    this.setGeometry();
    this.update();
  }

  private setGeometry() {
    this.geometry = new Geometry();
    while (this.geometry.vertices.length < 32) {
      this.geometry.vertices.push(this.target.clone());
    }
  }

  private update = () => {
    if (this.geometry instanceof BufferGeometry) {
      throw new Error("Wrong geometry type.");
    }

    requestAnimationFrame(this.update);

    const position = this.target;
    const vertex = position.clone();

    this.geometry.vertices.shift();
    this.geometry.vertices.push(vertex);
    this.geometry.verticesNeedUpdate = true;
  };
}
