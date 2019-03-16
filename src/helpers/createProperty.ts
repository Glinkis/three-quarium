interface IProperty<S, T> {
  get?(this: S, value: T): T;
  set?(this: S, value: T): T;
}

/**
 * Creates a property decorator.
 * @returns A property decorator.
 */
export default <S, T>({ get, set }: IProperty<S, T> = {}): any => {
  return (target: S, key: string) => {
    let property: T;
    Object.defineProperty(target, key, {
      get(): T {
        return get ? get.call(this, property) : property;
      },
      set(value: T) {
        property = set ? set.call(this, value) : value;
      },
      configurable: true,
      enumerable: true
    });
  };
};
