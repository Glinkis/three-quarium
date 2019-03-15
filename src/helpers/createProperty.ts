interface IProperty<S, T> {
  get?(this: S, accessor: Accessor<T>): T;
  set?(this: S, value: T, accessor: Accessor<T>): void;
}

/**
 * Creates a property decorator.
 * @returns A property decorator.
 */
export default <S, T>({ get, set }: IProperty<S, T> = {}): any => {
  return (target: S, key: string) => {
    const accessor = new Accessor<T>();
    Object.defineProperty(target, key, {
      get(): T {
        return get ? get.call(this, accessor) : accessor.get();
      },
      set(value: T) {
        set ? set.call(this, value, accessor) : accessor.set(value);
      },
      configurable: true,
      enumerable: true
    });
  };
};

class Accessor<T> {
  private value!: T;
  public get() {
    return this.value;
  }
  public set(value: T) {
    this.value = value;
  }
}
