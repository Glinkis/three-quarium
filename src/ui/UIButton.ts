/**
 * @author: Victor Glindås
 */
import UIComponent from './UIComponent';

export default class UIButton extends UIComponent {
  onClick: ()=> void;

  constructor(parent: HTMLElement) {
    super(parent);
    this.element.className = 'ui-button';

    this.element.addEventListener('mousedown', event => this.onMouseDown(event));
    this.element.addEventListener('touchstart', event => this.onTouchStart(event));
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.onClick();
  }

  onTouchStart(event: TouchEvent) {
    event.preventDefault();
    this.onClick();
  }
}
