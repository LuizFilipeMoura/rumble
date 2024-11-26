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
    if(unit.canMove){
      unit.position = calculatesPosition(
        unit.position,
        unit.speed,
        standardDirection
      );
    }
  }
};
const verifyAttacks = (unit, enemyWithinRange) => {
  if (unit.ticksUntilNextAttack <= 0) {
    console.log('initiates attack;');
    initiatesAttack(unit, enemyWithinRange);
  } else {
    unit.ticksUntilNextAttack--;
    console.log('did not attack', unit.ticksUntilNextAttack);
  }
}
const verifyIfEnemiesAreWithinRange = () => {
  for (let [i, unit] of Object.entries(state.units)) {
    const unit = state.units[i] as InstancedUnit;

    if (!unit) continue;
    const enemyWithinRange = hasEnemyUnitWithinRange(unit);

    unit.canMove = !enemyWithinRange;
    if (enemyWithinRange && unit.canAttack) {
      verifyAttacks(unit, enemyWithinRange)
    }
  }
};

export const updatesState = () => {
  moveUnits();
  verifyIfEnemiesAreWithinRange();
};
