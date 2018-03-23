import {
  Vector3,
  Mesh,
  Material,
  MeshBasicMaterial,
  IcosahedronBufferGeometry,
  BufferGeometry
} from "three";
import Simulation from "./Simulation";
import Trail from "./Trail";
import randomize from "../extensions/THREE.Euler/randomize";
import rotateTowards from "../extensions/THREE.Object3D/rotateTowards";
import moveTowards from "../extensions/THREE.Vector3/moveTowards";
import clamp from "../math/clamp";

export default class Organism extends Mesh {
  simulation: Simulation;
  age: number;
  geometry: BufferGeometry;
  material: Material;
  velocity: number;
  target: Vector3;
  trail: Trail;

  constructor(simulation: Simulation) {
    super();

    this.simulation = simulation;
    this.velocity = 0.25;
    this.position.copy(this.simulation.getRandomPosition());
    randomize(this.rotation);
    this.trail = new Trail(this.position, 32);

    this.simulation.scene.add(this.trail);

    this.setMaterial();
    this.setGeometry();
    this.buildEyes();

    this.update = this.update.bind(this);
    this.update();
  }

  setMaterial() {
    this.material = new MeshBasicMaterial({ color: 0xf23c55 });
  }

  setGeometry() {
    this.geometry = new IcosahedronBufferGeometry(1, 1);
  }

  buildEyes() {
    const geometry = new IcosahedronBufferGeometry(0.2, 0);
    const material = new MeshBasicMaterial({ color: 0x000000 });

    const leftEye = new Mesh(geometry, material);
    const rightEye = new Mesh(geometry, material);

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

    this.position.x = clamp(
      this.position.x,
      -bounds + box.max.x,
      bounds + box.min.x
    );

    this.position.y = clamp(
      this.position.y,
      -bounds + box.max.y,
      bounds + box.min.y
    );

    this.position.z = clamp(
      this.position.z,
      -bounds + box.max.z,
      bounds + box.min.z
    );
  }

  think() {
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
