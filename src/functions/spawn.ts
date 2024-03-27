import { MetalWarriorTypeUnit } from '../catalog/units/metalWarrior.js';
import { v4 as uuidv4 } from 'uuid';
import { state } from '../state/state.js';
import { InstancedUnit } from '../models/unit.js';
import { Position } from '../models/position.js';
type spawnTypes = {
  unitName: string;
  player: string;
  spawnPoint: Position;
};
export const spawn = ({ unitName, player, spawnPoint }: spawnTypes) => {
  let unit;
  if (unitName === 'metal_warrior') {
    unit = new MetalWarriorTypeUnit(player, spawnPoint);
  }
  state.units[unit.id] = unit;
  return state.units[unit.id] as InstancedUnit;
};
