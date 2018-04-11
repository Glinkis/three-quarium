import { Vector3 } from "three";

export default (vector: Vector3, target: Vector3, delta: number) =>
  vector.add(
    target
      .clone()
      // @ts-ignore
      .sub(this)
      .normalize()
      .multiplyScalar(delta)
  );
