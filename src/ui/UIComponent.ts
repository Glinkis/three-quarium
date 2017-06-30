/**
 * @author: Victor Glindås
 */
export default class UIComponent {
  parent: HTMLElement;
  element: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.element = document.createElement('div');
    this.add();
  }

  add() {
    this.parent.appendChild(this.element);
  }

  remove() {
    this.parent.removeChild(this.element);
  }
}
