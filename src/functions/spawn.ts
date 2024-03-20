import {MetalWarriorTypeUnit} from "../catalog/units/metalWarrior.js";
import { v4 as uuidv4 } from 'uuid';
import {state} from "../state/state.js";

let spawnLocation = 0
export const spawn = (unitName) => {
    spawnLocation++;
    let unit;
    if(unitName === "metal_warrior"){
        unit = new MetalWarriorTypeUnit()
        unit.id = uuidv4().substring(0, 7);
        unit.position = {...unit.position, x : spawnLocation*100}
    }
    state.units[unit.id] = unit;
}
