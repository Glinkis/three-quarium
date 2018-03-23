import { Euler } from "three";

export default (euler: Euler) =>
  euler.set(
    Math.random() * Math.PI * 0.5,
    Math.random() * Math.PI * 0.5,
    Math.random() * Math.PI * 0.5
  );
