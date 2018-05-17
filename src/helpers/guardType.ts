interface IConstructor<S> {
  new (...args: any[]): S;
}

export default <T, S extends T>(value: T, type: IConstructor<S>) => {
  if (value instanceof type) {
    return value as S;
  }
  throw new TypeError(`Expected a ${type}.`);
};
