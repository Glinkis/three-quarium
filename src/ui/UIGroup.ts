import UIComponent from "./UIComponent";
import "./UIGroup.scss";

export default class UIGroup extends UIComponent {
  public element: HTMLElement;

  constructor(parent: HTMLElement) {
    super(parent);
    this.element.classList.add("ui-group");
  }
}
