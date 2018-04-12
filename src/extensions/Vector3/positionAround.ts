import { Vector3 } from "three";
const { sin, cos } = Math;

export default (point: Vector3, horizontal: number, vertical: number) =>
  new Vector3(
    point.x + cos(vertical) * cos(horizontal),
    point.y + sin(vertical),
    point.z + cos(vertical) * sin(horizontal)
  );
