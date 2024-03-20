import {state} from "./state.js";
import {calculatesPosition} from "../functions/movement.js";

const moveUnits = () => {

    for(let [i, unit] of Object.entries(state.units)){
        const unit = state.units[i]
        console.log(unit)
        unit.position = calculatesPosition(unit.position, unit.speed, "down")
    }
}
export const updatesState = () => {
    moveUnits()
}
