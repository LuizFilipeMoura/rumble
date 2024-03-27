import { Position } from './position.js';

export enum ATTACK_RADIUS {
  meele = 100,
  ranged = 300,
}

export interface InstancedUnit {
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
  ticksUntilNextAttack: number;
}
