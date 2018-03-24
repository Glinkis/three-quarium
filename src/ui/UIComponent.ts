export default class UIComponent {
  public parent: HTMLElement;
  public element: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.element = document.createElement("div");
    this.add();
  }

  public add() {
    this.parent.appendChild(this.element);
  }

  public remove() {
    this.parent.removeChild(this.element);
  }
}
