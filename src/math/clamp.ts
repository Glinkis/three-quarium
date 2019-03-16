export default (value: number, min: number, max: number) => {
  value = value > max ? max : value;
  value = value < min ? min : value;
  return value;
};
