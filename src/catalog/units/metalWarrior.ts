import { ATTACK_RADIUS, InstancedUnit } from "../../models/unit.js";
import { Position } from "../../models/position.js";
import { v4 as uuidv4 } from "uuid";

const maxHealth = 100;
const damageByAttack = 50;
const speed = 1;
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

  constructor(ownerPlayer) {
    this.id = uuidv4().substring(0, 7);
    this.ownerPlayer = ownerPlayer;
  }

  ownerPlayer: number;
}
