import "./UIButton.scss";
import { UIChild } from "./UIChild";
import UIComponent from "./UIComponent";

export default class UIButton extends UIComponent {
  public onClick?: () => void;

  constructor(parent: HTMLElement, children: UIChild[] = []) {
    super(parent, children);
    this.element.classList.add("ui-button");
    this.element.addEventListener("click", this.onMouseDown);
    this.element.addEventListener("touchstart", this.onTouchStart);
  }

  private onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    if (typeof this.onClick === "function") {
      this.onClick();
    }
  };

  private onTouchStart = (event: TouchEvent) => {
    event.preventDefault();
    if (typeof this.onClick === "function") {
      this.onClick();
    }
  };
}
