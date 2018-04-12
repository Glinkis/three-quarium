export type UIChild = HTMLElement | string | number | boolean;

export const childToNode = (child: UIChild) => {
  if (child instanceof HTMLElement) {
    return child;
  }
  if (typeof child !== "string") {
    child = child.toString();
  }
  return document.createTextNode(child);
};
