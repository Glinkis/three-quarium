/**
 * @flow
 * @author: Victor Glindås
 */
import * as THREE from 'three';

export default class Trail extends THREE.Line {
  target: THREE.Vector3;
  points: number;

  constructor(target: THREE.Vector3, points: number) {
    super();
    this.target = target;
    this.points = points;

    this.setMaterial();
    this.setGeometry();

    this.update = this.update.bind(this);
    this.update();
  }

  setMaterial() {
    this.material = new THREE.LineBasicMaterial({ color: 0x61C791 });
  }

  setGeometry() {
    this.geometry = new THREE.Geometry();
    while (this.geometry.vertices.length < this.points) {
      this.geometry.vertices.push(this.target.clone());
    }
  }

  update() {
    requestAnimationFrame(this.update);

    const position = this.target;
    this.geometry.vertices.splice(0, 1);
    const vertex = position.clone();
    this.geometry.vertices.push(vertex);
    this.geometry.verticesNeedUpdate = true;
  }
}

