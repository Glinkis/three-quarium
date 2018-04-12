import { Matrix4, Object3D, Quaternion, Vector3 } from "three";

export default (object: Object3D, target: Vector3, amount: number) => {
  const matrix = new Matrix4().lookAt(target, object.position, object.up);
  const qt = new Quaternion().setFromRotationMatrix(matrix);
  object.quaternion.slerp(qt, amount).normalize();
};
