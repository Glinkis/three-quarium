import { Vector3 } from "three";

export default (position1: Vector3, position2: Vector3, distance: number) =>
  position1.add(
    position2
      .clone()
      .sub(this)
      .normalize()
      .multiplyScalar(distance)
  );
