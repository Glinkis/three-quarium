import {
  BufferAttribute,
  BufferGeometry,
  Float32BufferAttribute,
  Vector3
} from "three";

export default class TrailGeometry extends BufferGeometry {
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

    if (array instanceof Float32Array) {
      const current = new Float32Array(3);
      const last = new Float32Array(target.toArray());

      for (let i = 0; i < array.length; i += 3) {
        current.set(array.subarray(i, i + 3));
        array.set(last, i);
        last.set(current);
      }
    }

    if (position instanceof BufferAttribute) {
      position.needsUpdate = true;
    }
  }
}
