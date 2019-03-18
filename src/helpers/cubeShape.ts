import { Vector3 } from "three";

export const CUBE_CORNER_POINTS: ReadonlyArray<Vector3> = [
  new Vector3(-1, -1, -1),
  new Vector3(-1, 1, -1),
  new Vector3(1, 1, -1),
  new Vector3(1, -1, -1),
  new Vector3(-1, -1, 1),
  new Vector3(-1, 1, 1),
  new Vector3(1, 1, 1),
  new Vector3(1, -1, 1)
];

// prettier-ignore
export const cubePathFromCorners = (points: Vector3[]) => [
    points[0], points[1],
    points[1], points[2],
    points[2], points[3],
    points[3], points[0],
    points[4], points[5],
    points[5], points[6],
    points[6], points[7],
    points[7], points[4],
    points[0], points[4],
    points[1], points[5],
    points[2], points[6],
    points[3], points[7]
  ];
