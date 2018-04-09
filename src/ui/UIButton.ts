import "./UIButton.scss";
import UIComponent from "./UIComponent";

export default class UIButton extends UIComponent {
  public onClick: () => void;

  constructor(parent: HTMLElement) {
    super(parent);
    this.element.classList.add("ui-button");
    this.element.addEventListener("mousedown", this.onMouseDown);
    this.element.addEventListener("touchstart", this.onTouchStart);
  }

  private onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    this.onClick();
  };

  private onTouchStart = (event: TouchEvent) => {
    event.preventDefault();
    this.onClick();
  };
}
