import { state } from './state.js';
import { calculatesPosition } from '../functions/movement.js';
import { InstancedUnit } from '../models/unit.js';
import {
  hasEnemyUnitWithinRange,
  initiatesAttack,
} from '../functions/combat.js';

const moveUnits = () => {
  for (let [i, unit] of Object.entries(state.units)) {
    const unit = state.units[i] as InstancedUnit;
    const { standardDirection } = state.players[unit.ownerPlayer];
    unit.position = calculatesPosition(
      unit.position,
      unit.speed,
      standardDirection
    );
  }
};
const verifyIfEnemiesAreWithinRange = () => {
  for (let [i, unit] of Object.entries(state.units)) {
    const unit = state.units[i] as InstancedUnit;
    if (!unit) continue;
    const enemyWithinRange = hasEnemyUnitWithinRange(unit);
    if (enemyWithinRange) {
      // console.log("attacking", enemyWithinRange)
      console.log(
        unit.id,
        'unit.ticksUntilNextAttack',
        unit.ticksUntilNextAttack
      );

      if (unit.ticksUntilNextAttack <= 0) {
        console.log('initiates attack;');
        initiatesAttack(unit, enemyWithinRange);
      } else {
        unit.ticksUntilNextAttack--;
        console.log('did not attack', unit.ticksUntilNextAttack);
      }
    }
  }
};
export const updatesState = () => {
  moveUnits();
  verifyIfEnemiesAreWithinRange();
};
