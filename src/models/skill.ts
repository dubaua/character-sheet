import { AbilitiyEnum } from './ability';

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
  Acrobatics = 'Acrobatics',
  AnimalHandling = 'Animal Handling',
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
  SleightOfHand = 'Sleight of Hand',
  Stealth = 'Stealth',
  Survival = 'Survival',
}

export enum SkillAttributes {
  Acrobatics = AbilitiyEnum.Dexterity,
  AnimalHandling = AbilitiyEnum.Wisdom,
  Arcana = AbilitiyEnum.Intelligence,
  Athletics = AbilitiyEnum.Strength,
  Deception = AbilitiyEnum.Charisma,
  History = AbilitiyEnum.Intelligence,
  Insight = AbilitiyEnum.Wisdom,
  Intimidation = AbilitiyEnum.Charisma,
  Investigation = AbilitiyEnum.Intelligence,
  Medicine = AbilitiyEnum.Wisdom,
  Nature = AbilitiyEnum.Intelligence,
  Perception = AbilitiyEnum.Wisdom,
  Performance = AbilitiyEnum.Charisma,
  Persuasion = AbilitiyEnum.Charisma,
  Religion = AbilitiyEnum.Intelligence,
  SleightOfHand = AbilitiyEnum.Dexterity,
  Stealth = AbilitiyEnum.Dexterity,
  Survival = AbilitiyEnum.Wisdom,
}

export interface IProficiencable {
  type: string;
  label: string;
  isProficiencient: boolean;
  isExpertised: boolean;
}

export class Skill implements IProficiencable {
  public readonly ability: AbilitiyEnum;
  public readonly label: AbilitiyEnum;

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
}
