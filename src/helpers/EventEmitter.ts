type EventHandler = () => void;

export default class EventEmitter<E> {
  private eventHandlers = new Map<E, EventHandler[]>();

  public addEventListener(event: E, handler: EventHandler) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.push(handler);
    } else {
      this.eventHandlers.set(event, [handler]);
    }
  }

  public removeEventListener(event: E, handler: EventHandler) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.splice(handlers.indexOf(handler), 1);
      if (handlers.length === 0) {
        this.eventHandlers.delete(event);
      }
    }
  }

  public emitEvent(event: E) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(this.triggerHandler);
    }
  }

  private triggerHandler(handler: EventHandler) {
    handler();
  }
}
