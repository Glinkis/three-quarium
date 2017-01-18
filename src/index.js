// @flow
import * as THREE from 'three';
import CameraControls from './CameraControls';
import '../stylesheets/index.scss';

const main: Object = {
  size: 100,
  onRender: [],
};

function buildElement(): void {
  main.element = document.createElement('div');
  main.element.id = 'three-quarium';
  document.body.appendChild(main.element);
}

function buildRenderer(): void {
  main.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  main.renderer.setPixelRatio(window.devicePixelRatio);
  main.element.appendChild(main.renderer.domElement);
}

function buildScene(): void {
  main.scene = new THREE.Scene();
  main.scene.fog = new THREE.Fog(0x101010, 0, main.size * 7.5);
}

function buildAndAddCamera(): void {
  main.camera = new THREE.PerspectiveCamera(40, 1, 10, 9999);
  main.scene.add(main.camera);
}

function buildAndAddLights(): void {
  const light1 = new THREE.DirectionalLight(0xFFFFFF, 1);
  main.scene.add(light1);
}

function buildAndAddCube(): void {
  const half = main.size * 0.5;
  const geometry = new THREE.Geometry();
  geometry.vertices.push(
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
  geometry.computeLineDistances();
  const material = new THREE.LineDashedMaterial({
    color: 0x61C791,
    dashSize: 1,
    gapSize: 1,
  });

  const cube = new THREE.LineSegments(geometry, material);
  main.scene.add(cube);
}

function buildAndAddSphere(size: number): void {
  const geometry = new THREE.IcosahedronBufferGeometry(size, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xF23C55,
  });
  const sphere = new THREE.Mesh(geometry, material);
  main.scene.add(sphere);
}

function render(): void {
  requestAnimationFrame(render);
  main.onRender.forEach(callback => callback());
  main.renderer.render(main.scene, main.camera);
}

function onWindowResize(): void {
  const width = main.element.offsetWidth;
  const height = main.element.offsetHeight;
  main.renderer.setSize(width, height);
  main.camera.aspect = width / height;
  main.camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize);

buildElement();
buildRenderer();
buildScene();
buildAndAddCamera();
buildAndAddLights();
buildAndAddCube();
buildAndAddSphere(main.size * 0.25);
onWindowResize();

new CameraControls(main);

render();
