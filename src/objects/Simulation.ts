import { Fog, Scene, Vector3, WebGLRenderer } from "three";
import OrbitalPerspectiveCamera from "./OrbitalCamera";

export default class Simulation {
  public size = 50;
  public scene = new Scene();
  public element = document.createElement("div");
  public renderer = new WebGLRenderer({
    alpha: true,
    antialias: true
  });
  private camera = new OrbitalPerspectiveCamera();

  constructor() {
    this.element.id = "three-quarium";
    document.body.appendChild(this.element);
    this.element.appendChild(this.renderer.domElement);

    this.scene.fog = new Fog(0x000000, 0, this.size * 7.5);

    this.camera.distance = this.size * 2.5;
    this.camera.setEventElement(this.renderer.domElement);
    this.camera.update();
    this.scene.add(this.camera);

    this.renderer.setPixelRatio(window.devicePixelRatio);
    window.addEventListener("resize", this.onResize);

    this.onResize();
    this.render();
  }

  public updateSize(size: number) {
    this.size = size;
  }

  public getRandomPosition() {
    const half = this.size * 0.5;
    return new Vector3(
      Math.random() * this.size - half,
      Math.random() * this.size - half,
      Math.random() * this.size - half
    );
  }

  private render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  };

  private onResize = () => {
    const width = this.element.offsetWidth;
    const height = this.element.offsetHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };
}
