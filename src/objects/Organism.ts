import {
  BufferGeometry,
  IcosahedronBufferGeometry,
  Material,
  Mesh,
  MeshBasicMaterial,
  Vector3
} from "three";
import randomEuler from "../extensions/THREE.Euler/randomEuler";
import rotateTowards from "../extensions/THREE.Object3D/rotateTowards";
import clamp from "../math/clamp";
import Simulation from "./Simulation";
import Trail from "./Trail";

export default class Organism extends Mesh {
  public geometry: BufferGeometry;
  public material: Material;

  private velocity = 0.25;
  private simulation: Simulation;
  private age: number;
  private target: Vector3;
  private trail: Trail;

  constructor(simulation: Simulation) {
    super();

    this.simulation = simulation;
    this.position.copy(this.simulation.getRandomPosition());
    this.rotation.copy(randomEuler());
    this.trail = new Trail(this.position);

    this.simulation.scene.add(this.trail);

    this.setMaterial();
    this.setGeometry();
    this.buildEyes();
    this.update();
  }

  private setMaterial() {
    this.material = new MeshBasicMaterial({ color: 0xf23c55 });
  }

  private setGeometry() {
    this.geometry = new IcosahedronBufferGeometry(1, 1);
  }

  private buildEyes() {
    const geometry = new IcosahedronBufferGeometry(0.4, 0);
    const material = new MeshBasicMaterial({ color: 0x000000 });

    const leftEye = new Mesh(geometry, material);
    const rightEye = new Mesh(geometry, material);

    this.add(leftEye);
    this.add(rightEye);

    leftEye.position.set(0.5, 0, 0.8);
    rightEye.position.set(-0.5, 0, 0.8);
  }

  private update = () => {
    requestAnimationFrame(this.update);
    this.age += 1;
    this.think();
    this.clampPositionToBounds();
  };

  private clampPositionToBounds() {
    const bounds = this.simulation.size * 0.5;
    this.geometry.computeBoundingBox();
    const { min, max } = this.geometry.boundingBox;

    this.position.x = clamp(this.position.x, -bounds + max.x, bounds + min.x);
    this.position.y = clamp(this.position.y, -bounds + max.y, bounds + min.y);
    this.position.z = clamp(this.position.z, -bounds + max.z, bounds + min.z);
  }

  private think() {
    const thought = Math.random() * 100;

    if (thought <= 5) {
      this.target = this.simulation.getRandomPosition();
      // this.material.color.set(0x000000);
    } else if (this.target != null) {
      if (this.position.distanceTo(this.target) > 0.5) {
        rotateTowards(this, this.target, 0.03);
        this.translateZ(this.velocity);
      } else {
        this.target = null;
      }
    }
    this.rotateZ((Math.sin(this.rotation.x) + Math.cos(this.rotation.y)) / 10);
  }
}
