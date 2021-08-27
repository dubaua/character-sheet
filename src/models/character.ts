import { AbilitiyEnum, Ability } from './ability';
import { Race } from './race';
import { Skill, SkillEnum } from './skill';

export class Character {
  public abilities = new Map<AbilitiyEnum, Ability>();
  public skills = new Map<SkillEnum, Skill>();
  public level = 1;
  public armor = 10;
  public speed = 30;
  public hitDie = 6;
  public alignment = 'Neutral';
  public archetype = '';
  public hitLevelUpRolls: number[] = [];
  public isHaveLongbow = false;
  public proficiencies: string[] = [];
  public equipment = '';
  public race: Race;

  constructor(public name: string, public className, public racename: string, public subracename = '') {
    this.initAbilities();
    this.initSkills();
    this.initRace(racename, subracename);
  }

  private initAbilities() {
    for (const abilityName in AbilitiyEnum) {
      this.abilities.set(abilityName as AbilitiyEnum, new Ability(abilityName));
    }
  }

  private initSkills() {
    for (const skillName in SkillEnum) {
      this.skills.set(skillName as SkillEnum, new Skill(skillName));
    }
  }

  public initRace(race: string, subrace?: string) {
    this.race = new Race(race, subrace);
  }

  public getAbilityModifier(name: AbilitiyEnum): number {
    return Math.floor((this.abilities.get(name).value - 10) / 2);
  }

  public getSkillModifier(name: SkillEnum): number {
    const skill = this.skills.get(name);
    const abilityModifier = this.getAbilityModifier(skill.ability);
    const proficiencyModifier = skill.isProficiencient ? this.proficiency : 0;
    const expertiseModifier = skill.isExpertised ? this.proficiency : 0;
    return abilityModifier + proficiencyModifier + expertiseModifier;
  }

  public get raceTitle(): string {
    return this.race.subrace || this.race.race;
  }

  public get hp(): number {
    return this.hitDie + this.conMod + this.hitLevelUpRolls.reduce((a, c) => a + c + this.conMod, 0);
  }

  public get proficiency(): number {
    return Math.floor(this.level / 4) + 2;
  }

  public get passivePerception(): number {
    return 10 + this.getSkillModifier(SkillEnum.Perception);
  }

  public get initiative(): number {
    return this.dexMod;
  }

  public get strMod(): number {
    return this.getAbilityModifier(AbilitiyEnum.Strength);
  }

  public get dexMod(): number {
    return this.getAbilityModifier(AbilitiyEnum.Dexterity);
  }

  public get conMod(): number {
    return this.getAbilityModifier(AbilitiyEnum.Constitution);
  }

  public get intMod(): number {
    return this.getAbilityModifier(AbilitiyEnum.Intelligence);
  }

  public get wisMod(): number {
    return this.getAbilityModifier(AbilitiyEnum.Wisdom);
  }

  public get chaMod(): number {
    return this.getAbilityModifier(AbilitiyEnum.Charisma);
  }

  public get sneakAttackDie(): string {
    return `${Math.floor((this.level - 1) / 2) + 1}d6`;
  }

  public get attackDex(): number {
    return this.proficiency + this.dexMod;
  }

  public get boomingBladeDamage(): string {
    let primaryDamage = '';
    let moveDamage = 'd8 Thunder';
    if (this.level >= 5) {
      primaryDamage = 'd8 Thunder ';
      moveDamage = '2d8 Thunder';
    }
    if (this.level >= 11) {
      primaryDamage = '2d8 Thunder ';
      moveDamage = '3d8 Thunder';
    }
    if (this.level >= 17) {
      primaryDamage = '3d8 Thunder ';
      moveDamage = '4d8 Thunder';
    }
    return `${primaryDamage}if target willingly moves ${moveDamage}`;
  }

  public get grennflameBladeDamage(): string {
    let primaryDamage = '';
    let secondaryDamage = `${this.intMod} Fire`;
    if (this.level >= 5) {
      primaryDamage = 'd8 Fire ';
      secondaryDamage = `d8+${this.intMod} Fire`;
    }
    if (this.level >= 11) {
      primaryDamage = '2d8 Fire ';
      secondaryDamage = `2d8+${this.intMod} Fire`;
    }
    if (this.level >= 17) {
      primaryDamage = '3d8 Fire ';
      secondaryDamage = `3d8+${this.intMod} Fire`;
    }
    return `${primaryDamage} and ${secondaryDamage} to secondary target`;
  }
}
