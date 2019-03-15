import "./UIButton.scss";
import { UIChild } from "./UIChild";
import UIComponent from "./UIComponent";

type Events = "click";

export default class UIButton extends UIComponent<Events> {
  constructor(parent: HTMLElement, children: UIChild[] = []) {
    super(parent, children);
    this.element.classList.add("ui-button");

    this.addEventListener("attach", () => {
      this.element.addEventListener("mousedown", this.onMouseDown);
      this.element.addEventListener("touchstart", this.onTouchStart);
    });

    this.removeEventListener("detach", () => {
      this.element.removeEventListener("mousedown", this.onMouseDown);
      this.element.removeEventListener("touchstart", this.onTouchStart);
    });
  }

  private onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    this.emitEvent("click");
  };

  private onTouchStart = (event: TouchEvent) => {
    event.preventDefault();
    this.emitEvent("click");
  };
}
