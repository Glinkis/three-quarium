export default (value: number, min: number, max: number) => {
  value = max !== 0 && value >= max ? max : value;
  value = min !== 0 && value <= min ? min : value;
  return value;
};
