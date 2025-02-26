import { AbilityEnum } from './ability';

export enum SkillEnum {
  Acrobatics = 'Acrobatics',
  AnimalHandling = 'AnimalHandling',
  Arcana = 'Arcana',
  Athletics = 'Athletics',
  Deception = 'Deception',
  History = 'History',
  Insight = 'Insight',
  Intimidation = 'Intimidation',
  Investigation = 'Investigation',
  Medicine = 'Medicine',
  Nature = 'Nature',
  Perception = 'Perception',
  Performance = 'Performance',
  Persuasion = 'Persuasion',
  Religion = 'Religion',
  SleightOfHand = 'SleightOfHand',
  Stealth = 'Stealth',
  Survival = 'Survival',
}

export enum SkillTitleEnum {
  Acrobatics = 'Акробатика',
  AnimalHandling = 'Уход за животными',
  Arcana = 'Магия',
  Athletics = 'Атлетика',
  Deception = 'Обман',
  History = 'История',
  Insight = 'Проницательность',
  Intimidation = 'Запугивание',
  Investigation = 'Расследование',
  Medicine = 'Медицина',
  Nature = 'Природа',
  Perception = 'Внимательность',
  Performance = 'Представление',
  Persuasion = 'Убеждение',
  Religion = 'Религия',
  SleightOfHand = 'Ловкость рук',
  Stealth = 'Скрытность',
  Survival = 'Выживание',
}

export enum SkillAttributes {
  Acrobatics = AbilityEnum.Dexterity,
  AnimalHandling = AbilityEnum.Wisdom,
  Arcana = AbilityEnum.Intelligence,
  Athletics = AbilityEnum.Strength,
  Deception = AbilityEnum.Charisma,
  History = AbilityEnum.Intelligence,
  Insight = AbilityEnum.Wisdom,
  Intimidation = AbilityEnum.Charisma,
  Investigation = AbilityEnum.Intelligence,
  Medicine = AbilityEnum.Wisdom,
  Nature = AbilityEnum.Intelligence,
  Perception = AbilityEnum.Wisdom,
  Performance = AbilityEnum.Charisma,
  Persuasion = AbilityEnum.Charisma,
  Religion = AbilityEnum.Intelligence,
  SleightOfHand = AbilityEnum.Dexterity,
  Stealth = AbilityEnum.Dexterity,
  Survival = AbilityEnum.Wisdom,
}

export interface IProficiencable {
  type: string;
  label: string;
  isProficiencient: boolean;
  isExpertised: boolean;
  bonus: number;
  passiveBonus: number;
}

export class Skill implements IProficiencable {
  public readonly ability: AbilityEnum;
  public readonly label: AbilityEnum;
  public bonus = 0;
  public passiveBonus = 0;

  constructor(public type: string, public isProficiencient = false, public isExpertised = false) {
    this.ability = SkillAttributes[type];
    this.label = SkillTitleEnum[type];
  }

  public setProficiency(value: boolean) {
    this.isProficiencient = value;
    return this;
  }

  public setExpertise(value: boolean) {
    this.isExpertised = value;
    return this;
  }

  public setBonus(value: number) {
    this.bonus = value;
    return this;
  }

  public setPassiveBonus(value: number) {
    this.passiveBonus = value;
    return this;
  }
}
