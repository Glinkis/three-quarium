const DISTANCE_THRESHOLD = 4;

export function eventByType(event: MouseEvent | TouchEvent, touchIndex = 0) {
  return event instanceof MouseEvent ? event : event.touches[touchIndex];
}

export function eventMoveByType(event: MouseEvent | TouchEvent) {
  return event instanceof MouseEvent ? "mousemove" : "touchmove";
}

export function eventEndByType(event: MouseEvent | TouchEvent) {
  return event instanceof MouseEvent ? "mouseup" : "touchend";
}

export function eventsDistance(a: MouseEvent | Touch, b: MouseEvent | Touch) {
  const distanceX = Math.abs(a.pageX - b.pageX);
  const distanceY = Math.abs(a.pageY - b.pageY);
  return Math.sqrt(distanceX ** 2 + distanceY ** 2);
}

export function eventDeltaMovement(
  start: MouseEvent | Touch,
  end: MouseEvent | Touch
) {
  return {
    x: end.pageX - start.pageX,
    y: end.pageY - start.pageY
  };
}

export function touchesDeltaDistance(start: Touch[], end: Touch[]) {
  const startDistance = eventsDistance(start[0], start[1]);
  const endDistance = eventsDistance(end[0], end[1]);
  return startDistance - endDistance;
}
