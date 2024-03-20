import {InstancedUnit} from "../../models/unit.js";
import {Position} from "../../models/position.js";

export class MetalWarriorTypeUnit implements InstancedUnit {
    id: string = "";
    position: Position = {
        x: 0,
        y: 0,
        isFlying: false
    };
    name = "metal_warrior";
    speed = 100;
}
