import { PerspectiveCamera, Vector3 } from "three";
import positionAround from "../extensions/THREE.Vector3/positionAround";
import {
  eventByType,
  eventDeltaMovement,
  eventEndByType,
  eventMoveByType,
  touchesDeltaDistance
} from "../helpers/EventHelper";
import clamp from "../math/clamp";

const MAGNITUDE_ROTATION = 0.004;
const MAGNITUDE_PANNING = 0.004;
const MAGNITUDE_ZOOM = 0.004;

export default class OrbitalCamera extends PerspectiveCamera {
  public distance = 100;

  private eventElement?: HTMLElement;
  private centerPoint = new Vector3();
  private rotationX = 0;
  private rotationY = 0;
  private panX = 0;
  private panY = 0;
  private zoomPvt: number;
  private zoomMin = 1;
  private zoomMax = 4;

  get zoom() {
    return this.zoomPvt;
  }

  set zoom(value: number) {
    this.zoomPvt = clamp(value, this.zoomMin, this.zoomMax);
  }

  constructor() {
    super();
    this.update();
  }

  public update() {
    this.position.copy(
      positionAround(
        this.centerPoint,
        this.rotationX,
        this.rotationY
      ).multiplyScalar(this.distance)
    );

    this.correctCameraUpVector();

    this.lookAt(this.centerPoint);
    this.translateX(-this.panX);
    this.translateY(this.panY);
  }

  public setEventElement(element: HTMLElement) {
    if (this.eventElement != null) {
      this.eventElement.removeEventListener("mousedown", this.onStartEvent);
      this.eventElement.removeEventListener("touchstart", this.onStartEvent);
      this.eventElement.removeEventListener("mousewheel", this.onMouseWheel);
    }

    element.addEventListener("mousedown", this.onStartEvent);
    element.addEventListener("touchstart", this.onStartEvent);
    element.addEventListener("mousewheel", this.onMouseWheel);

    this.eventElement = element;
  }

  private onMouseWheel = (event: WheelEvent) => {
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
  };

  private onStartEvent = (startEvent: any) => {
    startEvent.preventDefault();

    const start = eventByType(startEvent);
    const moveType = eventMoveByType(startEvent);
    const endType = eventEndByType(startEvent);

    const rotationCompoundX = this.rotationX;
    const rotationCompoundY = this.rotationY;

    const panCompoundX = this.panX;
    const panCompoundY = this.panY;

    const zoomCompound = this.zoom;

    const onMoveEvent = (moveEvent: any) => {
      const move = eventByType(moveEvent);
      const touches = moveEvent.touches ? moveEvent.touches.length : 0;
      const movementDelta = eventDeltaMovement(start, move);

      if (touches === 2) {
        const delta = touchesDeltaDistance(
          moveEvent.touches[0],
          moveEvent.touches[1]
        );
        this.zoom = zoomCompound - delta * MAGNITUDE_ZOOM;
      }

      if (touches === 2 || moveEvent.button === 1) {
        this.panX = panCompoundX + movementDelta.x * MAGNITUDE_PANNING * 2;
        this.panY = panCompoundY + movementDelta.y * MAGNITUDE_PANNING * 2;
      }

      if (touches === 1 || moveEvent.button === 0) {
        this.rotationX = rotationCompoundX;
        this.rotationX += movementDelta.x * MAGNITUDE_ROTATION;
        this.rotationY = rotationCompoundY;
        this.rotationY += movementDelta.y * MAGNITUDE_ROTATION;
      }

      this.update();
    };

    const onEventEnd = () => {
      document.removeEventListener(moveType, onMoveEvent);
      document.removeEventListener(endType, onEventEnd);
    };

    document.addEventListener(moveType, onMoveEvent);
    document.addEventListener(endType, onEventEnd);
  };

  private correctCameraUpVector() {
    this.up = this.centerPoint.clone();
    this.up.y += Math.cos(this.rotationY);

    const vertical = Math.abs(this.rotationY % Math.PI) - Math.PI / 2;

    if (vertical < 0.5 && vertical > -0.5) {
      this.up.x -= Math.cos(this.rotationX) * this.position.y;
      this.up.z -= Math.sin(this.rotationX) * this.position.y;
    }
  }
}
