export enum AbilitiyEnum {
  Strength = 'Strength',
  Dexterity = 'Dexterity',
  Constitution = 'Constitution',
  Intelligence = 'Intelligence',
  Wisdom = 'Wisdom',
  Charisma = 'Charisma',
}

export class Ability {
  constructor(public type: string, public value: number = 0, public isSavingThrowsProficiency: boolean = false) {}

  public setValue(value: number) {
    this.value = value;
    return this;
  }

  public setSavingThrowProficiency(value: boolean) {
    this.isSavingThrowsProficiency = value;
    return this;
  }
}