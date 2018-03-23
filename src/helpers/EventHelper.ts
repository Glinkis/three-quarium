const DISTANCE_THRESHOLD = 4;

export function getEventByType(event: MouseEvent | TouchEvent, touchIndex = 0) {
  return event instanceof MouseEvent ? event : event.touches[touchIndex];
}

export function getEventMoveByType(event: MouseEvent | TouchEvent) {
  return event instanceof MouseEvent ? "mousemove" : "touchmove";
}

export function getEventEndByType(event: MouseEvent | TouchEvent) {
  return event instanceof MouseEvent ? "mouseup" : "touchend";
}

export function getEventsDistance(
  a: MouseEvent | Touch,
  b: MouseEvent | Touch
) {
  const distanceX = Math.abs(a.pageX - b.pageX);
  const distanceY = Math.abs(a.pageY - b.pageY);
  return Math.sqrt(distanceX ** 2 + distanceY ** 2);
}

export function getEventDeltaMovement(
  start: MouseEvent | Touch,
  end: MouseEvent | Touch
) {
  return {
    x: end.pageX - start.pageX,
    y: end.pageY - start.pageY
  };
}

export function getEventTouchesDeltaDistance(
  start: Array<Touch>,
  end: Array<Touch>
) {
  const startDistance = getEventsDistance(start[0], start[1]);
  const endDistance = getEventsDistance(end[0], end[1]);
  return startDistance - endDistance;
}

export function isEventDistanceBelowThreshold(
  a: MouseEvent | Touch,
  b: MouseEvent | Touch,
  threshold = DISTANCE_THRESHOLD
) {
  return getEventsDistance(a, b) < threshold;
}
