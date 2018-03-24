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
  public distance: number;

  private eventElement?: HTMLElement;
  private centerPoint: Vector3;
  private rotationX: number;
  private rotationY: number;
  private panX: number;
  private panY: number;
  private zoomPvt: number;
  private zoomMin: number;
  private zoomMax: number;

  get zoom() {
    return this.zoomPvt;
  }

  set zoom(value: number) {
    this.zoomPvt = clamp(value, this.zoomMin, this.zoomMax);
  }

  constructor() {
    super();

    this.distance = 100;
    this.centerPoint = new Vector3();

    this.rotationX = 0;
    this.rotationY = 0;

    this.panX = 0;
    this.panY = 0;

    this.zoomMax = 4;
    this.zoomMin = 1;

    this.update();

    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.onStartEvent = this.onStartEvent.bind(this);
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

  private onMouseWheel(event: WheelEvent) {
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

  private onStartEvent(startEvent: any) {
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
      const numberOfTouches = moveEvent.touches
        ? moveEvent.touches.length
        : false;
      const movementDelta = eventDeltaMovement(start, move);

      if (numberOfTouches === 2) {
        const touchMovementDelta = touchesDeltaDistance(
          startEvent.touches,
          moveEvent.touches
        );
        this.zoom = zoomCompound - touchMovementDelta * MAGNITUDE_ZOOM;
      }

      if (numberOfTouches === 2 || moveEvent.button === 1) {
        this.panX = panCompoundX + movementDelta.x * MAGNITUDE_PANNING * 2;
        this.panY = panCompoundY + movementDelta.y * MAGNITUDE_PANNING * 2;
      }

      if (numberOfTouches === 1 || moveEvent.button === 0) {
        this.rotationX =
          rotationCompoundX + movementDelta.x * MAGNITUDE_ROTATION;
        this.rotationY =
          rotationCompoundY + movementDelta.y * MAGNITUDE_ROTATION;
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
