export default <T>() => {
  let value: T;
  return {
    get() {
      return value;
    },
    set(v: T) {
      value = v;
    }
  };
};
