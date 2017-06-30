/**
 * @author: Victor Glindås
 */
import * as THREE from 'three';

export default function rotateTowards(object: THREE.Object3D, target: THREE.Vector3, amount: number): void {
  const matrix = new THREE.Matrix4();
  matrix.lookAt(target, object.position, object.up);
  const qt = new THREE.Quaternion().setFromRotationMatrix(matrix);
  object.quaternion.slerp(qt, amount);
  object.quaternion.normalize();
}
