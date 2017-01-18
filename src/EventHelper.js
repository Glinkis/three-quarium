// @flow
type PositionEvent = MouseEvent | Touch;

const DISTANCE_THRESHOLD = 4;

export function getEventByType(event: MouseEvent | TouchEvent, touchIndex: number = 0): MouseEvent | Touch {
  return (event instanceof TouchEvent) ? event.touches[touchIndex] : event;
}

export function getEventMoveByType(event: MouseEvent | TouchEvent) {
  return (event instanceof TouchEvent) ? 'touchmove' : 'mousemove';
}

export function getEventEndByType(event: MouseEvent | TouchEvent) {
  return (event instanceof TouchEvent) ? 'touchend' : 'mouseup';
}

export function getEventsDistance(event0: PositionEvent, event1: PositionEvent): number {
  const distanceX = Math.abs(event0.pageX - event1.pageX);
  const distanceY = Math.abs(event0.pageY - event1.pageY);
  return Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
}

export function getEventDeltaMovement(startEvent: PositionEvent, endEvent: PositionEvent): { x:number, y:number } {
  const x = endEvent.pageX - startEvent.pageX;
  const y = endEvent.pageY - startEvent.pageY;
  return { x, y };
}

export function getEventTouchesDeltaDistance(startTouches: Array<Touch>, endTouches: Array<Touch>): number {
  const startDistance = getEventsDistance(startTouches[0], startTouches[1]);
  const endDistance = getEventsDistance(endTouches[0], endTouches[1]);
  return startDistance - endDistance;
}

export function isEventDistanceBelowThreshold(
  event0: PositionEvent,
  event1: PositionEvent,
  threshold: number = DISTANCE_THRESHOLD,
): boolean {
  return getEventsDistance(event0, event1) < threshold;
}
