/**
 * @flow
 * @author: Victor Glindås
 */
import * as THREE from 'three';
import clamp from '../math/clamp';
import {
  getEventByType,
  getEventDeltaMovement,
  getEventTouchesDeltaDistance,
  getEventMoveByType,
  getEventEndByType,
} from '../helpers/EventHelper';

const MAGNITUDE_ROTATION = 0.004;
const MAGNITUDE_PANNING = 0.004;
const MAGNITUDE_ZOOM = 0.004;

export default class OrbitalCamera extends THREE.PerspectiveCamera {
  eventElement: ?HTMLElement;

  distance: number;
  centerPoint: THREE.Vector3;

  rotationX: number;
  rotationY: number;

  panX: number;
  panY: number;

  onMouseWheel: () => void;
  onStartEvent: () => void;

  constructor() {
    super();

    this.distance = 100;
    this.centerPoint = new THREE.Vector3();

    this.rotationX = 0;
    this.rotationY = 0;

    this.panX = 0;
    this.panY = 0;

    this.zoom = 1;
    this.zoomMax = 4;
    this.zoomMin = 1;

    this.update();

    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.onStartEvent = this.onStartEvent.bind(this);
  }

  onMouseWheel(event: WheelEvent): void {
    event.preventDefault();
    let delta = 0;
    if (event.wheelDelta) {
      delta = Number(event.wheelDelta) / -40;
    }
    if (event.deltaY) {
      delta = -event.deltaY;
    }
    if (event.detail) {
      delta = event.detail;
    }
    this.zoom += delta * MAGNITUDE_ZOOM;
    this.updateProjectionMatrix();
  }

  onStartEvent(startEvent: any): void {
    startEvent.preventDefault();

    const start = getEventByType(startEvent);
    const moveType = getEventMoveByType(startEvent);
    const endType = getEventEndByType(startEvent);

    const rotationCompoundX = this.rotationX;
    const rotationCompoundY = this.rotationY;

    const panCompoundX = this.panX;
    const panCompoundY = this.panY;

    const zoomCompound = this.zoom;

    const onMoveEvent = (moveEvent: any) => {
      const move = getEventByType(moveEvent);
      const numberOfTouches = moveEvent.touches ? moveEvent.touches.length : false;
      const movementDelta = getEventDeltaMovement(start, move);

      if (numberOfTouches === 2) {
        const touchMovementDelta =
          getEventTouchesDeltaDistance(startEvent.touches, moveEvent.touches);
        this.zoom = zoomCompound - (touchMovementDelta * MAGNITUDE_ZOOM);
      }

      if (numberOfTouches === 2 || moveEvent.button === 1) {
        this.panX = panCompoundX + ((movementDelta.x * MAGNITUDE_PANNING) * 2);
        this.panY = panCompoundY + ((movementDelta.y * MAGNITUDE_PANNING) * 2);
      }

      if (numberOfTouches === 1 || moveEvent.button === 0) {
        this.rotationX = rotationCompoundX + (movementDelta.x * MAGNITUDE_ROTATION);
        this.rotationY = rotationCompoundY + (movementDelta.y * MAGNITUDE_ROTATION);
      }

      this.update();
    };

    const onEventEnd = () => {
      document.removeEventListener(moveType, onMoveEvent);
      document.removeEventListener(endType, onEventEnd);
    };

    document.addEventListener(moveType, onMoveEvent);
    document.addEventListener(endType, onEventEnd);
  }

  get zoom(): number {
    return this.pvtZoom;
  }

  set zoom(value: number): void {
    this.pvtZoom = clamp(value, this.zoomMin, this.zoomMax);
  }

  setEventElement(element: HTMLElement) {
    if (this.eventElement != null) {
      this.eventElement.removeEventListener('mousedown', this.onStartEvent);
      this.eventElement.removeEventListener('touchstart', this.onStartEvent);
      this.eventElement.removeEventListener('mousewheel', this.onMouseWheel);
    }

    element.addEventListener('mousedown', this.onStartEvent);
    element.addEventListener('touchstart', this.onStartEvent);
    element.addEventListener('mousewheel', this.onMouseWheel);

    this.eventElement = element;
  }

  update(): void {
    this.position.set(
      this.centerPoint.x + (this.distance * Math.cos(this.rotationY) * Math.cos(this.rotationX)),
      this.centerPoint.y + (this.distance * Math.sin(this.rotationY)),
      this.centerPoint.z + (this.distance * Math.cos(this.rotationY) * Math.sin(this.rotationX)),
    );

    this.correctCameraUpVector();

    this.lookAt(this.centerPoint);
    this.translateX(-this.panX);
    this.translateY(this.panY);
  }

  correctCameraUpVector(): void {
    this.up = this.centerPoint.clone();

    this.up.y += Math.cos(this.rotationY);

    let verticalPI = this.rotationY % Math.PI;
    verticalPI = Math.abs(verticalPI) - (Math.PI / 2);

    if (verticalPI < 0.5 && verticalPI > -0.5) {
      this.up.x -= (Math.cos(this.rotationX) * this.position.y);
      this.up.z -= (Math.sin(this.rotationX) * this.position.y);
    }
  }
}
