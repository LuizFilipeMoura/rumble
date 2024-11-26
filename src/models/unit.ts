import { Position } from './position.js';
import { v4 as uuidv4 } from 'uuid';

export enum ATTACK_RADIUS {
  meele = 100,
  ranged = 300,
}

export class InstancedUnit {
  ownerPlayer: number;
  id: string;
  position: Position;
  name: string;
  speed: number;
  maxHealth: number;
  health: number;
  damage: number;
  attackRadius: ATTACK_RADIUS | 0;
  attackSpeed: number;
  ticksUntilNextAttack: number = 0;
  canMove: boolean = true;
  forceStay: boolean = true;
  canAttack: boolean = true;
  constructor(ownerPlayer, spawnPoint) {
    this.id = uuidv4().substring(0, 7);
    this.ownerPlayer = ownerPlayer;
    this.position = spawnPoint;
  }
}
