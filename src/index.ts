import "../stylesheets/index.scss";
import Bounds from "./objects/BoundaryLines";
import Organism from "./objects/Organism";
import Simulation from "./objects/Simulation";
import UIButton from "./ui/UIButton";
import UIGroup from "./ui/UIGroup";

const simulation = new Simulation();
simulation.scene.add(new Bounds(simulation.size));

const uiGroup = new UIGroup(simulation.element);

const btnAddOne = new UIButton(uiGroup.element);
btnAddOne.element.textContent = "Add 1";
btnAddOne.onClick = () => {
  simulation.scene.add(new Organism(simulation));
};

const btnAddTen = new UIButton(uiGroup.element);
btnAddTen.element.textContent = "Add 10";
btnAddTen.onClick = () => {
  for (let i = 0; i < 10; i++) {
    simulation.scene.add(new Organism(simulation));
  }
};

const btnClearAll = new UIButton(uiGroup.element);
btnClearAll.element.textContent = "Clear All";
btnClearAll.onClick = () => {
  const organisms = [];

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
