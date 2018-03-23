import * as THREE from 'three';
import OrbitalPerspectiveCamera from './OrbitalCamera';

export default class Simulation {
  size: number;
  element: HTMLElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: OrbitalPerspectiveCamera;

  constructor() {
    this.size = 25;

    this.render = this.render.bind(this);
    this.onResize = this.onResize.bind(this);

    this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.element.id = 'three-quarium';
    document.body.appendChild(this.element);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.element.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x000000, 0, this.size * 7.5);

    this.camera = new OrbitalPerspectiveCamera();
    this.camera.distance = this.size * 2.5;
    this.camera.setEventElement(this.renderer.domElement);
    this.camera.update();
    this.scene.add(this.camera);

    window.addEventListener('resize', this.onResize);

    this.onResize();
    this.render();
  }

  render() {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const width = this.element.offsetWidth;
    const height = this.element.offsetHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  getRandomPosition(): THREE.Vector3 {
    const half = this.size * 0.5;
    return new THREE.Vector3(
      (Math.random() * (half + half)) - half,
      (Math.random() * (half + half)) - half,
      (Math.random() * (half + half)) - half,
    );
  }
}
