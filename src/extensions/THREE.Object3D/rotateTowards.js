/**
 * @flow
 * @author: Victor Glindås
 */
import * as THREE from 'three';

function rotateTowards(target: THREE.Object3D, amount: number) {
  const matrix = new THREE.Matrix4();
  matrix.lookAt(target, this.position, this.up);
  const qt = new THREE.Quaternion().setFromRotationMatrix(matrix);
  this.quaternion.slerp(qt, amount);
  this.quaternion.normalize();
}

THREE.Object3D.prototype.rotateTowards = rotateTowards;
