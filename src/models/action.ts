import { Character } from "./character";

export enum ActionType {
  Action = 'Action',
  BonusAction = 'Bonus action',
  FreeAction = 'Free action',
  Reaction = 'Reaction',
}

export const ActionTitles = {
  [ActionType.Action]: 'Действие',
  [ActionType.BonusAction]: 'Бонусное',
  [ActionType.FreeAction]: 'Свободное',
  [ActionType.Reaction]: 'Реакция',
}

export class Action {
  constructor(
    public readonly title: string,
    public range: string,
    public actionType: ActionType,
    public getDescription?: (character: Character) => string,
  ) {}

  public get typeLabel(): string {
    return ActionTitles[this.actionType];
  }
}
