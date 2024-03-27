import { v4 as uuidv4 } from "uuid";

export class Player {
  id: string;
  standardDirection: string = "";
  constructor() {
    this.id = uuidv4().substring(0, 7);
  }
}
