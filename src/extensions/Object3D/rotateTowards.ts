import { Matrix4, Object3D, Quaternion, Vector3 } from "three";

export default (object: Object3D, target: Vector3, amount: number) => {
  const direction = new Matrix4().lookAt(target, object.position, object.up);
  const rotation = new Quaternion().setFromRotationMatrix(direction);
  object.quaternion.slerp(rotation, amount).normalize();
};
