import {
  BufferAttribute,
  BufferGeometry,
  Float32BufferAttribute,
  Vector3
} from "three";
import guardType from "../helpers/guardType";

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
    const position = guardType(this.getAttribute("position"), BufferAttribute);
    const array = guardType(position.array, Float32Array);

    this.next[0] = target.x;
    this.next[1] = target.y;
    this.next[2] = target.z;

    for (let i = 0; i < array.length; i += 3) {
      for (let j = 0; j < 3; j++) {
        this.swap[j] = array[i + j];
        array[i + j] = this.next[j];
        this.next[j] = this.swap[j];
      }
    }

    position.needsUpdate = true;
  }
}
