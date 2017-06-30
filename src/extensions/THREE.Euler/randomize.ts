/**
 * @author: Victor Glindås
 */
import * as THREE from 'three';

export default function randomize(euler: THREE.Euler) {
  return euler.set(
    Math.random() * Math.PI * 0.5,
    Math.random() * Math.PI * 0.5,
    Math.random() * Math.PI * 0.5,
  );
}
