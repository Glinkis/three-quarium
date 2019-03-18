import {
  IcosahedronBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  Vector3
} from "three";
import randomEuler from "../extensions/Euler/randomEuler";
import rotateTowards from "../extensions/Object3D/rotateTowards";
import clamp from "../math/clamp";
import Simulation from "./Simulation";

const MATERIAL = new MeshBasicMaterial({ color: 0xf23c55 });
const GEOMETRY = new IcosahedronBufferGeometry(1, 1);
const EYE_MATERIAL = new MeshBasicMaterial({ color: 0x000000 });
const EYE_GEOMETRY = new IcosahedronBufferGeometry(0.4, 0);

// For collisions.
GEOMETRY.computeBoundingBox();

export default class Organism extends Mesh {
  private velocity = 0.25;
  private simulation: Simulation;
  private target: Vector3 | null = null;

  constructor(simulation: Simulation) {
    super();

    this.simulation = simulation;
    this.position.copy(this.simulation.getRandomPosition());
    this.rotation.copy(randomEuler());

    this.geometry = GEOMETRY;
    this.material = MATERIAL;

    this.buildEyes();

    this.onBeforeRender = this.update;
  }

  private buildEyes() {
    const leftEye = new Mesh(EYE_GEOMETRY, EYE_MATERIAL);
    const rightEye = new Mesh(EYE_GEOMETRY, EYE_MATERIAL);

    this.add(leftEye, rightEye);

    leftEye.position.set(0.5, 0, 0.8);
    rightEye.position.set(-0.5, 0, 0.8);
  }

  private update() {
    this.think();
    this.clampPositionToBounds();
  }

  private clampPositionToBounds() {
    const bounds = this.simulation.size * 0.5;
    const { min, max } = this.geometry.boundingBox;

    this.position.x = clamp(this.position.x, -bounds + max.x, bounds + min.x);
    this.position.y = clamp(this.position.y, -bounds + max.y, bounds + min.y);
    this.position.z = clamp(this.position.z, -bounds + max.z, bounds + min.z);
  }

  private think() {
    const thought = Math.random() * 100;

    if (thought <= 5) {
      this.target = this.simulation.getRandomPosition();
    } else {
      this.moveTowardsTarget();
    }
    this.rotateZ((Math.sin(this.rotation.x) + Math.cos(this.rotation.y)) / 10);
  }

  private moveTowardsTarget() {
    if (this.target === null) {
      return;
    }
    if (this.position.distanceTo(this.target) > 0.5) {
      rotateTowards(this, this.target, 0.03);
      this.translateZ(this.velocity);
      return;
    }
    this.target = null;
  }
}
