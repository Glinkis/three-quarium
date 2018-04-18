export const disposeHierarchy = (object: any) => {
  if (object !== null) {
    for (const child of object.children) {
      disposeHierarchy(child);
    }
    disposeProperty(object, "geometry");
    disposeMaterial(object);
  }
  object.parent.remove(object);
  delete object.parent;
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
  if (Array.isArray(object.material)) {
    disposeArray(object.material, "map");
  } else {
    disposeProperty(object.material, "map");
  }
  disposeProperty(object, "material");
};
