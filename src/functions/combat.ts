import {InstancedUnit} from "../models/unit.js";
import {enemyUnits, state} from "../state/state.js";

export const hasEnemyUnitWithinRange = (unit: InstancedUnit) => {
    for(let enemyUnit of enemyUnits(unit.ownerPlayer)){
        if(Math.abs(enemyUnit.position.x - unit.position.x) <= unit.attackRadius && Math.abs(enemyUnit.position.y - unit.position.y) <= unit.attackRadius){
            return state.units[enemyUnit.id];
        }
    }
    return false;
}
export const initiatesAttack = (unit: InstancedUnit, enemy: InstancedUnit) => {
    enemy.health -= unit.damage;
    if(enemy.health <= 0){
        delete state.units[enemy.id]
    }
    unit.ticksUntilNextAttack = unit.attackSpeed;
}
