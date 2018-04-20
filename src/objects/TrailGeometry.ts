import {
  BufferAttribute,
  BufferGeometry,
  Float32BufferAttribute,
  Vector3
} from "three";

export default class TrailGeometry extends BufferGeometry {
  private next = new Float32Array(3);
  private swap = new Float32Array(3);

  constructor(target: Vector3) {
    super();
    this.addPosition(target);
  }

  public update(target: Vector3) {
    this.updatePosition(target);
  }

  private addPosition(target: Vector3) {
    const vertices: number[] = [];
    for (let i = 0; i < 32; i++) {
      vertices.push(...target.toArray());
    }
    this.addAttribute("position", new Float32BufferAttribute(vertices, 3));
  }

  private updatePosition(target: Vector3) {
    const position = this.getAttribute("position");

    const array = position.array;

    this.next[0] = target.x;
    this.next[1] = target.y;
    this.next[2] = target.z;

    if (array instanceof Float32Array) {
      for (let i = 0; i < array.length; i += 3) {
        this.swap[0] = array[i + 0];
        this.swap[1] = array[i + 1];
        this.swap[2] = array[i + 2];

        array[i + 0] = this.next[0];
        array[i + 1] = this.next[1];
        array[i + 2] = this.next[2];

        this.next[0] = this.swap[0];
        this.next[1] = this.swap[1];
        this.next[2] = this.swap[2];
      }
    }

    if (position instanceof BufferAttribute) {
      position.needsUpdate = true;
    }
  }
}
