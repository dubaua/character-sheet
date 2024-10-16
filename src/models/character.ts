import { AbilityEnum, Ability } from './ability';
import { Action } from './action';
import { Race } from './race';
import { Skill, SkillEnum } from './skill';
import { Spell } from './spell';

export class Character {
  public abilities = new Map<AbilityEnum, Ability>();
  public skills = new Map<SkillEnum, Skill>();
  public level = 1;
  public armor = 10;
  public speed = 30;
  public hitDie = 8;
  public alignment = 'Neutral';
  public archetype = '';
  public hitLevelUpRolls: number[] = [];
  public hpBonus = 0;
  public isHaveLongbow = false;
  public proficiencies: string[] = [];
  public equipment = '';
  public race: Race;
  public actions = new Map<string, Action>();
  public weaponEnchantment = 0;
  public spells: Spell[] = [];
  public initiativeModifier = 0;
  public skillCheckModifier = 0;
  public savingThrowsModifier = 0;
  public isJackOfAllTrades = false;

  constructor(public name: string, public className: string, public racename: string, public subracename = '') {
    this.initAbilities();
    this.initSkills();
    this.initRace(racename, subracename);
  }

  private initAbilities() {
    for (const abilityName in AbilityEnum) {
      this.abilities.set(abilityName as AbilityEnum, new Ability(abilityName));
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

  public addAction(action: Action) {
    this.actions.set(action.title, action);
  }

  public addSpell(spell: Spell) {
    this.spells.push(spell);
  }

  public getAbilityModifier(name: AbilityEnum): number {
    return this.abilities.get(name).modifier;
  }

  public getSkillModifier(name: SkillEnum): number {
    const skill = this.skills.get(name);
    const abilityModifier = this.getAbilityModifier(skill.ability);
    const proficiencyModifier = skill?.isProficiencient ? this.proficiency : 0;
    const expertiseModifier = skill?.isExpertised ? this.proficiency : 0;
    const bonus = skill?.bonus ?? 0;
    const jackOfAllTradesBonus = 0; //skill?.isProficiencient ? 0 : Math.floor(this.proficiency / 2);
    console.log(name, { abilityModifier,
      proficiencyModifier,
      expertiseModifier,
      bonus,
      jackOfAllTradesBonus,
      totalSkillCheckMod: this.skillCheckModifier,
     });
    
    return (
      abilityModifier + proficiencyModifier + expertiseModifier + bonus + jackOfAllTradesBonus + this.skillCheckModifier
    );
  }

  public get raceTitle(): string {
    return this.race.subrace || this.race.race;
  }

  public get hp(): number {
    const levelUpHp = this.hitLevelUpRolls.length
      ? this.hitLevelUpRolls.reduce((a, c) => a + c + this.conMod, 0)
      : (this.level - 1) * (this.hitDie / 2 + 1 + this.conMod);
    return this.hitDie + this.conMod + levelUpHp + this.hpBonus;
  }

  public get proficiency(): number {
    return Math.floor((this.level - 1) / 4) + 2;
  }

  public getPassiveSkill(skillName: SkillEnum): number {
    const skill = this.skills.get(skillName);
    return 10 + this.getSkillModifier(skillName) + skill!.passiveBonus;
  }

  public get initiative(): number {
    const jackOfAllTradesBonus = Math.floor(this.proficiency / 2);
    return this.dexMod + this.initiativeModifier + jackOfAllTradesBonus + this.skillCheckModifier;
  }

  public get strMod(): number {
    return this.getAbilityModifier(AbilityEnum.Strength);
  }

  public get dexMod(): number {
    return this.getAbilityModifier(AbilityEnum.Dexterity);
  }

  public get conMod(): number {
    return this.getAbilityModifier(AbilityEnum.Constitution);
  }

  public get intMod(): number {
    return this.getAbilityModifier(AbilityEnum.Intelligence);
  }

  public get wisMod(): number {
    return this.getAbilityModifier(AbilityEnum.Wisdom);
  }

  public get chaMod(): number {
    return this.getAbilityModifier(AbilityEnum.Charisma);
  }
}
