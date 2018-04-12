import { UIChild } from "./UIChild";
import UIComponent from "./UIComponent";
import "./UIGroup.scss";

export default class UIGroup extends UIComponent {
  constructor(parent: HTMLElement, children: UIChild[] = []) {
    super(parent, children);
    this.element.classList.add("ui-group");
  }
}
