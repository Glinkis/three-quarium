/**
 * @flow
 * @author: Victor Glindås
 */
import * as THREE from 'three';
import Simulation from './Simulation';
import Trail from './Trail';
import '../extensions/THREE.Euler/randomize';
import '../extensions/THREE.Object3D/rotateTowards';
import '../extensions/THREE.Vector3/moveTowards';
import clamp from '../math/clamp';

export default class Organism extends THREE.Mesh {
  simulation: Simulation;
  age: number;
  geometry: THREE.Geometry;
  material: THREE.Material;
  velocity: number;
  target: THREE.Vector3;
  trail: Trail;

  constructor(simulation: Simulation) {
    super();

    this.simulation = simulation;
    this.velocity = 0.25;
    this.position.copy(this.simulation.getRandomPosition());
    this.rotation.randomize();
    this.trail = new Trail(this.position, 16);

    this.simulation.scene.add(this.trail);

    this.setMaterial();
    this.setGeometry();
    this.buildEyes();

    this.update = this.update.bind(this);
    this.update();
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({ color: 0xF23C55 });
  }

  setGeometry() {
    this.geometry = new THREE.IcosahedronBufferGeometry(1, 1);
  }

  buildEyes() {
    const geometry = new THREE.IcosahedronBufferGeometry(0.2, 0);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const leftEye = new THREE.Mesh(geometry, material);
    const rightEye = new THREE.Mesh(geometry, material);

    this.add(leftEye);
    this.add(rightEye);

    leftEye.position.set(0.5, 0, 0.8);
    rightEye.position.set(-0.5, 0, 0.8);
  }

  update() {
    requestAnimationFrame(this.update);
    this.age += 1;
    this.think();
    this.clampPositionToSimulationBounds();
  }

  clampPositionToSimulationBounds() {
    const bounds = this.simulation.size * 0.5;
    this.geometry.computeBoundingBox();
    const box = this.geometry.boundingBox;
    this.position.x = clamp(this.position.x, -bounds + box.max.x, bounds + box.min.x);
    this.position.y = clamp(this.position.y, -bounds + box.max.y, bounds + box.min.y);
    this.position.z = clamp(this.position.z, -bounds + box.max.z, bounds + box.min.z);
  }


  think() {
    const thought = Math.random() * 100;

    if (thought <= 10) {
      this.target = this.simulation.getRandomPosition();
    } else if (this.target != null) {
      if (this.position.distanceTo(this.target) > 0.5) {
        this.rotateTowards(this.target, 0.03);
        this.translateZ(this.velocity);
      } else {
        this.target = null;
      }
    }
  }
}
