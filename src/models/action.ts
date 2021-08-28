import { Character } from "./character";

export enum ActionType {
  Action = 'Action',
  BonusAction = 'Bonus action',
  FreeAction = 'Free action',
  Reaction = 'Reaction',
}

export class Action {
  constructor(
    public readonly title: string,
    public range: string,
    public actionType: ActionType,
    public damageFunction: (character: Character) => string,
  ) {}
}
