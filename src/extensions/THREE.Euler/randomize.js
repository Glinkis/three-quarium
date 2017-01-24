/**
 * @flow
 * @author: Victor Glindås
 */
import * as THREE from 'three';

function randomize() {
  return this.set(
    Math.random() * Math.PI * 0.5,
    Math.random() * Math.PI * 0.5,
    Math.random() * Math.PI * 0.5,
  );
}

THREE.Euler.prototype.randomize = randomize;
