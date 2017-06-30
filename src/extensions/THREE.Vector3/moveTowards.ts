/**
 * @author: Victor Glindås
 */
import * as THREE from 'three';

export default function moveTowards(position1: THREE.Vector3, position2: THREE.Vector3, distance: number): THREE.Vector3 {
  return position1.add(
    position2.clone()
      .sub(this)
      .normalize()
      .multiplyScalar(distance),
  );
}
