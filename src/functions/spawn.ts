import {MetalWarriorTypeUnit} from "../catalog/units/metalWarrior.js";
import { v4 as uuidv4 } from 'uuid';
import {state} from "../state/state.js";
import {InstancedUnit} from "../models/unit.js";

export const spawn = ({unitName, player}) => {
    let unit;
    if(unitName === "metal_warrior"){
        unit = new MetalWarriorTypeUnit()
        unit.id = uuidv4().substring(0, 7);
        unit.ownerPlayer = player;
        unit.position = {...unit.position}
    }
    state.units[unit.id] = unit;
    return state.units[unit.id] as InstancedUnit
}
