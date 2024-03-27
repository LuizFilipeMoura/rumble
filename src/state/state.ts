import { InstancedUnit } from "../models/unit.js";
import { calculatesPosition } from "../functions/movement.js";

class State {
  units = {};
  players = {};
}
export const ownUnits = player => {
  const resultUnits: InstancedUnit[] = [];
  for (let [i, unit] of Object.entries(state.units)) {
    const unit = state.units[i] as InstancedUnit;
    if (unit.ownerPlayer === player) {
      resultUnits.push(unit);
    }
  }
  return resultUnits;
};
export const enemyUnits = player => {
  const resultUnits: InstancedUnit[] = [];
  for (let [i, unit] of Object.entries(state.units)) {
    const unit = state.units[i] as InstancedUnit;
    if (unit.ownerPlayer !== player) {
      resultUnits.push(unit);
    }
  }
  return resultUnits;
};
export const state = new State();
