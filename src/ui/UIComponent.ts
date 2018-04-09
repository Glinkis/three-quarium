import "./UIComponent.scss";

export default class UIComponent {
  public parent: HTMLElement;
  public element: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.element = document.createElement("div");
    this.element.classList.add("ui-component");
    this.attach();
  }

  public attach() {
    this.parent.appendChild(this.element);
  }

  public detach() {
    this.parent.removeChild(this.element);
  }
}
