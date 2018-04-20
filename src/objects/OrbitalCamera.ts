import { PerspectiveCamera, Vector2, Vector3 } from "three";
import positionAround from "../extensions/Vector3/positionAround";
import {
  eventDeltaMovement,
  touchesDeltaDistance
} from "../helpers/EventHelper";
import Pan from "./camera/Pan";
import Rotation from "./camera/Rotation";
import Zoom from "./camera/Zoom";

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

    this.updateUpVector();

    this.lookAt(this.centerPoint);
    this.translateX(-this.panner.x);
    this.translateY(this.panner.y);
  }

  public setEventElement(element: HTMLElement) {
    if (this.eventElement != null) {
      this.eventElement.removeEventListener("mousedown", this.onMouseDown);
      this.eventElement.removeEventListener("touchstart", this.onTouchStart);
      this.eventElement.removeEventListener("mousewheel", this.onMouseWheel);
    }

    element.addEventListener("mousedown", this.onMouseDown);
    element.addEventListener("touchstart", this.onTouchStart);
    element.addEventListener("mousewheel", this.onMouseWheel);

    this.eventElement = element;
  }

  private onMouseWheel = (event: WheelEvent) => {
    event.preventDefault();
    let delta = 0;
    if (event.wheelDelta) {
      delta = Number(-event.wheelDelta);
    } else if (event.deltaY) {
      delta = -event.deltaY;
    } else if (event.detail) {
      delta = event.detail;
    }
    this.updateZoomer(this.zoom, delta);
  };

  private onMouseDown = (mouseDown: MouseEvent) => {
    mouseDown.preventDefault();

    const rotation = this.rotator.copy();
    const pan = this.panner.copy();

    const onMouseMove = (mouseMove: MouseEvent) => {
      const movement = eventDeltaMovement(mouseDown, mouseMove);

      if (mouseMove.button === 1) {
        this.updatePanner(pan, movement);
      }
      if (mouseMove.button === 0) {
        this.updateRotator(rotation, movement);
      }

      this.update();
    };

    const onMouseUp = () => {
      removeEventListener("mousemove", onMouseMove);
      removeEventListener("mouseup", onMouseUp);
    };

    addEventListener("mousemove", onMouseMove);
    addEventListener("mouseup", onMouseUp);
  };

  private onTouchStart = (touchStart: TouchEvent) => {
    touchStart.preventDefault();

    const rotation = this.rotator.copy();
    const pan = this.panner.copy();
    const zoom = this.zoomer.value;

    const onTouchMove = (touchMove: TouchEvent) => {
      const movement = eventDeltaMovement(touchStart.touches[0], touchMove.touches[0]); // prettier-ignore

      if (touchMove.touches.length === 2) {
        this.updateZoomer(zoom, touchesDeltaDistance(touchStart, touchMove));
      }
      if (touchMove.touches.length === 2) {
        this.updatePanner(pan, movement);
      }
      if (touchMove.touches.length === 1) {
        this.updateRotator(rotation, movement);
      }

      this.update();
    };

    const onTouchEnd = () => {
      removeEventListener("touchmove", onTouchMove);
      removeEventListener("touchend", onTouchEnd);
    };

    addEventListener("touchmove", onTouchMove);
    addEventListener("touchend", onTouchEnd);
  };

  private updateZoomer(zoom: number, delta: number) {
    this.zoomer.value = zoom - delta * Zoom.magnitude;
    this.zoom = this.zoomer.value;
    this.updateProjectionMatrix();
  }

  private updateRotator(rotation: Rotation, movement: Vector2) {
    this.rotator.set(rotation);
    this.rotator.x += movement.x * Rotation.magnitude;
    this.rotator.y += movement.y * Rotation.magnitude;
  }

  private updatePanner(pan: Pan, movement: Vector2) {
    this.panner.set(pan);
    this.panner.x += movement.x * Pan.magnitude;
    this.panner.y += movement.y * Pan.magnitude;
  }

  private updateUpVector() {
    this.up = this.centerPoint.clone();
    this.up.y += Math.cos(this.rotator.y);

    const vertical = Math.abs(this.rotator.y % Math.PI) - Math.PI / 2;

    if (vertical < 0.5 && vertical > -0.5) {
      this.up.x -= Math.cos(this.rotator.x) * this.position.y;
      this.up.z -= Math.sin(this.rotator.x) * this.position.y;
    }
  }
}
