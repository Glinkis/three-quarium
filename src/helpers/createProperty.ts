import createScopedValue from "./createScopedValue";

interface IAccessor<T> {
  get(): T;
  set(value: T): void;
}

interface IProperty<S, T> {
  get?(this: S, accessor: IAccessor<T>): T;
  set?(this: S, value: T, accessor: IAccessor<T>): void;
}

/**
 * Creates a property decorator.
 * @returns A property decorator.
 */
export default <S, T>({ get, set }: IProperty<S, T> = {}): any => {
  return (target: S, key: string) => {
    const accessor = createScopedValue<T>();
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
