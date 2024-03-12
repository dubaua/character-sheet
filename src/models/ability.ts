export enum AbilityEnum {
  Strength = 'Strength',
  Dexterity = 'Dexterity',
  Constitution = 'Constitution',
  Intelligence = 'Intelligence',
  Wisdom = 'Wisdom',
  Charisma = 'Charisma',
}

export const AbilityTitles = {
  [AbilityEnum.Strength]: 'Сила',
  [AbilityEnum.Dexterity]: 'Ловкость',
  [AbilityEnum.Constitution]: 'Телосложение',
  [AbilityEnum.Intelligence]: 'Интеллект',
  [AbilityEnum.Wisdom]: 'Мудрость',
  [AbilityEnum.Charisma]: 'Харизма',
}

export class Ability {
  public savingThrowBonus = 0;
  constructor(public type: string, public value: number = 0, public isSavingThrowsProficiency: boolean = false) {}

  public setValue(value: number) {
    this.value = value;
    return this;
  }

  public setSavingThrowProficiency(value: boolean) {
    this.isSavingThrowsProficiency = value;
    return this;
  }

  public setSavingThrowBonus(value: number) {
    this.savingThrowBonus = value;
    return this;
  }

  public get modifier(): number {
    return Math.floor((this.value - 10) / 2);
  }

  public get label(): string {
    return AbilityTitles[this.type];
  }
}