import { childToNode, UIChild } from "./UIChild";
import "./UIComponent.scss";

export default class UIComponent {
  public parent: HTMLElement;
  public element: HTMLElement;

  constructor(parent: HTMLElement, children: UIChild[] = []) {
    this.parent = parent;
    this.element = document.createElement("div");
    this.element.classList.add("ui-component");

    for (const child of children) {
      this.element.appendChild(childToNode(child));
    }

    this.attach();
  }

  public attach() {
    this.parent.appendChild(this.element);
  }

  public detach() {
    this.parent.removeChild(this.element);
  }
}
