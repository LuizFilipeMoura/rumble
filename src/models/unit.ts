import {Position} from "./position.js";

export interface InstancedUnit {
    id: string;
    position: Position;
    name: string;
    speed: number;
}
