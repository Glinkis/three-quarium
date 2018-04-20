import { Vector2 } from "three";

export function eventsDistance(a: MouseEvent | Touch, b: MouseEvent | Touch) {
  const distanceX = Math.abs(a.pageX - b.pageX);
  const distanceY = Math.abs(a.pageY - b.pageY);
  return Math.sqrt(distanceX ** 2 + distanceY ** 2);
}

export function eventDeltaMovement(
  start: MouseEvent | Touch,
  end: MouseEvent | Touch
) {
  return new Vector2(end.pageX - start.pageX, end.pageY - start.pageY);
}

export function touchesDeltaDistance(start: TouchEvent, end: TouchEvent) {
  const startDistance = eventsDistance(start.touches[0], start.touches[1]);
  const endDistance = eventsDistance(end.touches[0], end.touches[1]);
  return startDistance - endDistance;
}
