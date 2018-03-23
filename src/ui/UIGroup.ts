import UIComponent from './UIComponent';

export default class UIGroup extends UIComponent {
  element: HTMLElement;

  constructor(parent: HTMLElement) {
    super(parent);
    this.element.className = 'ui-group';
  }
}
