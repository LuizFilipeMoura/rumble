import { ATTACK_RADIUS, InstancedUnit } from '../../models/unit.js';
import { Position } from '../../models/position.js';
import { v4 as uuidv4 } from 'uuid';

const maxHealth = 100;
const damageByAttack = 25;
const speed = 20;
const attackSpeed = 3;
export class MetalWarriorTypeUnit extends InstancedUnit {
  position: Position = {
    x: this.position.x,
    y: this.position.y,
    isFlying: false,
  };
  name = 'metal_warrior';
  speed = speed;
  health = maxHealth;
  damage = damageByAttack;
  maxHealth = maxHealth;
  attackRadius = ATTACK_RADIUS.meele;
  attackSpeed = attackSpeed;
  ticksUntilNextAttack = 0;
}
