import "./index.scss";
import Bounds from "./objects/BoundaryLines";
import Organism from "./objects/Organism";
import Simulation from "./objects/Simulation";
import UIButton from "./ui/UIButton";
import UIGroup from "./ui/UIGroup";

function initialize() {
  const simulation = new Simulation();
  simulation.scene.add(new Bounds(simulation.size));

  const addOrganisms = (amount: number) => {
    for (let i = 0; i < amount; i++) {
      simulation.scene.add(new Organism(simulation));
    }
  };

  const group = new UIGroup(simulation.element);

  const addOne = new UIButton(group.element, ["Add 1"]);
  addOne.onClick = () => addOrganisms(1);

  const addTen = new UIButton(group.element, ["Add 100"]);
  addTen.onClick = () => addOrganisms(100);

  const clearAll = new UIButton(group.element, ["Clear All"]);
  clearAll.onClick = () => {
    const organisms = [] as Organism[];

    simulation.scene.traverse(child => {
      if (child instanceof Organism) {
        organisms.push(child);
      }
    });

    organisms.forEach(organism => {
      simulation.scene.remove(organism);
      simulation.scene.remove(organism.trail);
    });
  };
}

window.addEventListener("load", initialize);
