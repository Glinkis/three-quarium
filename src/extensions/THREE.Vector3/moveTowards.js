/**
 * @flow
 * @author: Victor Glindås
 */
import * as THREE from 'three';

function moveTowards(position, distance): THREE.Vector3 {
  return this.add(
    position.clone()
      .sub(this)
      .normalize()
      .multiplyScalar(distance),
  );
}

THREE.Vector3.prototype.moveTowards = moveTowards;
