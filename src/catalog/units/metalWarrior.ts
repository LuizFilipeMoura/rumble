import {ATTACK_RADIUS, InstancedUnit} from "../../models/unit.js";
import {Position} from "../../models/position.js";

const maxHealth = 100
const damageByAttack = 50;
const speed = 100;
const attackSpeed = 3;
export class MetalWarriorTypeUnit implements InstancedUnit {
    id: string = "";
    position: Position = {
        x: 0,
        y: 0,
        isFlying: false
    };
    name = "metal_warrior";
    speed = speed;
    health = maxHealth;
    damage = damageByAttack;
    maxHealth = maxHealth;
    attackRadius = ATTACK_RADIUS.meele;
    attackSpeed = attackSpeed;
    ticksUntilNextAttack = 0;
}
