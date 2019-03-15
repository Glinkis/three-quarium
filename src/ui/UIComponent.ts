import EventEmitter from "../helpers/EventEmitter";
import { childToNode, UIChild } from "./UIChild";
import "./UIComponent.scss";

type Events = "attach" | "detach";

export default class UIComponent<E = void> extends EventEmitter<Events | E> {
  public parent: HTMLElement;
  public element: HTMLElement;

  constructor(parent: HTMLElement, children: UIChild[] = []) {
    super();
    this.parent = parent;
    this.element = document.createElement("div");
    this.element.classList.add("ui-component");

    for (const child of children) {
      this.element.appendChild(childToNode(child));
    }
  }

  public attach() {
    this.parent.appendChild(this.element);
    this.emitEvent("attach");
    return this;
  }

  public detach() {
    this.parent.removeChild(this.element);
    this.emitEvent("detach");
    return this;
  }
}
