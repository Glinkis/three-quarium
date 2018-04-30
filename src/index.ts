import { Object3D } from "three";
import { disposeHierarchy } from "./extensions/Object3D/dispose";
import "./index.scss";
import BoundaryLines from "./objects/BoundaryLines";
import Organism from "./objects/Organism";
import Simulation from "./objects/Simulation";
import Trail from "./objects/Trail";
import UIButton from "./ui/UIButton";
import UIGroup from "./ui/UIGroup";

function initialize() {
  const simulation = new Simulation();
  simulation.scene.add(new BoundaryLines(simulation.size));

  const addOrganisms = (amount: number) => {
    for (let i = 0; i < amount; i++) {
      const organism = new Organism(simulation);
      simulation.scene.add(organism);

      const trail = new Trail(organism.position);
      simulation.scene.add(trail);
    }
  };

  const group = new UIGroup(simulation.element);

  const addOne = new UIButton(group.element, ["Add 1"]);
  addOne.onClick = () => addOrganisms(1);

  const addTen = new UIButton(group.element, ["Add 100"]);
  addTen.onClick = () => addOrganisms(100);

  const clearAll = new UIButton(group.element, ["Clear All"]);
  clearAll.onClick = () => {
    const disposables = [] as Object3D[];

    simulation.scene.traverse(child => {
      if (child instanceof Organism) {
        disposables.push(child);
      }
      if (child instanceof Trail) {
        disposables.push(child);
      }
    });

    disposables.forEach(disposeHierarchy);
    simulation.renderer.renderLists.dispose();
  };

  const start = new UIButton(group.element, ["Start"]);
  start.onClick = () => {
    simulation.start();
    start.element.style.display = "none";
    pause.element.style.display = null;
  };

  const pause = new UIButton(group.element, ["Stop"]);
  pause.onClick = () => {
    simulation.stop();
    pause.element.style.display = "none";
    start.element.style.display = null;
  };

  start.element.style.display = "none";
}

window.addEventListener("load", initialize);
