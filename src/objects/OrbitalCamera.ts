import { PerspectiveCamera, Vector2, Vector3 } from "three";
import positionAround from "../extensions/THREE.Vector3/positionAround";
import {
  eventByType,
  eventDeltaMovement,
  eventEndByType,
  eventMoveByType,
  touchesDeltaDistance
} from "../helpers/EventHelper";
import clamp from "../math/clamp";
import Pan from "./Pan";
import Rotation from "./Rotation";
import Zoom from "./Zoom";

export default class OrbitalCamera extends PerspectiveCamera {
  public distance = 100;

  private zoomer = new Zoom(this.zoom);
  private panner = new Pan();
  private rotator = new Rotation();
  private centerPoint = new Vector3();
  private eventElement?: HTMLElement;

  constructor() {
    super();
    this.update();
  }

  public update() {
    this.position.copy(
      positionAround(
        this.centerPoint,
        this.rotator.x,
        this.rotator.y
      ).multiplyScalar(this.distance)
    );

    this.correctCameraUpVector();

    this.lookAt(this.centerPoint);
    this.translateX(-this.panner.x);
    this.translateY(this.panner.y);
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
    this.zoomer.value += delta * Zoom.magnitude;
    this.zoom = this.zoomer.value;
    this.updateProjectionMatrix();
  };

  private onStartEvent = (startEvent: any) => {
    startEvent.preventDefault();

    const start = eventByType(startEvent);
    const moveType = eventMoveByType(startEvent);
    const endType = eventEndByType(startEvent);

    const rotation = this.rotator.copy();
    const pan = this.panner.copy();
    const zoom = this.zoomer.value;

    const onMoveEvent = (moveEvent: any) => {
      const move = eventByType(moveEvent);
      const touches = moveEvent.touches ? moveEvent.touches.length : 0;
      const movementDelta = eventDeltaMovement(start, move);

      if (touches === 2) {
        const delta = touchesDeltaDistance(
          startEvent.touches,
          moveEvent.touches
        );
        this.zoomer.value = zoom - delta * Zoom.magnitude;
        this.zoom = this.zoomer.value;
      }

      if (touches === 2 || moveEvent.button === 1) {
        this.panner.x = pan.x + movementDelta.x * Pan.magnitude * 2;
        this.panner.y = pan.y + movementDelta.y * Pan.magnitude * 2;
      }

      if (touches === 1 || moveEvent.button === 0) {
        this.rotator.x = rotation.x + movementDelta.x * Rotation.magnitude;
        this.rotator.y = rotation.x + movementDelta.y * Rotation.magnitude;
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
    this.up.y += Math.cos(this.rotator.y);

    const vertical = Math.abs(this.rotator.y % Math.PI) - Math.PI / 2;

    if (vertical < 0.5 && vertical > -0.5) {
      this.up.x -= Math.cos(this.rotator.x) * this.position.y;
      this.up.z -= Math.sin(this.rotator.x) * this.position.y;
    }
  }
}
