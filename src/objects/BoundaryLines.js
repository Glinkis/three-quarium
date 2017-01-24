/**
 * @flow
 * @author: Victor Glindås
 */
import * as THREE from 'three';

export default class BoundaryLines extends THREE.LineSegments {
  size: number;
  geometry: THREE.Geometry;
  material: THREE.Material;

  constructor(size: number) {
    super();
    this.size = size;

    this.setMaterial();
    this.setGeometry();
  }

  setMaterial() {
    this.material = new THREE.LineDashedMaterial({
      color: 0x61C791,
      dashSize: 1,
      gapSize: 1,
    });
  }

  setGeometry() {
    const half = this.size * 0.5;
    this.geometry = new THREE.Geometry();
    this.geometry.vertices.push(
      new THREE.Vector3(-half, -half, -half), new THREE.Vector3(-half, half, -half),
      new THREE.Vector3(-half, half, -half), new THREE.Vector3(half, half, -half),
      new THREE.Vector3(half, half, -half), new THREE.Vector3(half, -half, -half),
      new THREE.Vector3(half, -half, -half), new THREE.Vector3(-half, -half, -half),
      new THREE.Vector3(-half, -half, half), new THREE.Vector3(-half, half, half),
      new THREE.Vector3(-half, half, half), new THREE.Vector3(half, half, half),
      new THREE.Vector3(half, half, half), new THREE.Vector3(half, -half, half),
      new THREE.Vector3(half, -half, half), new THREE.Vector3(-half, -half, half),
      new THREE.Vector3(-half, -half, -half), new THREE.Vector3(-half, -half, half),
      new THREE.Vector3(-half, half, -half), new THREE.Vector3(-half, half, half),
      new THREE.Vector3(half, half, -half), new THREE.Vector3(half, half, half),
      new THREE.Vector3(half, -half, -half), new THREE.Vector3(half, -half, half),
    );
    this.geometry.computeLineDistances();
  }
}
