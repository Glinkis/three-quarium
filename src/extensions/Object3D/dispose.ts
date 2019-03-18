import { Object3D } from "three";

export const disposeHierarchy = (object?: Object3D) => {
  if (object) {
    for (const child of object.children) {
      disposeHierarchy(child);
    }

    disposeProperty(object, "geometry");
    disposeMaterial(object);

    if (object.parent) {
      object.parent.remove(object);
    }

    object.parent = null;
  }
};

const disposeProperty = (object: any, name: string) => {
  if (object[name]) {
    object[name].dispose();
    delete object[name];
  }
};

const disposeArray = (array: any[], ...names: string[]) => {
  for (const object of array) {
    for (const name of names) {
      disposeProperty(object, name);
    }
    object.dispose();
    array.length = 0;
  }
};

const disposeMaterial = (object: any) => {
  Array.isArray(object.material)
    ? disposeArray(object.material, "map")
    : disposeProperty(object.material, "map");
  disposeProperty(object, "material");
};
