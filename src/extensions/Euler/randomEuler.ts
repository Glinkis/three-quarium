import { Euler } from "three";

export default () =>
  new Euler(
    Math.random() * Math.PI * 0.5,
    Math.random() * Math.PI * 0.5,
    Math.random() * Math.PI * 0.5
  );
