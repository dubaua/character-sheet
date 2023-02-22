import { AbilityEnum } from './models/ability';
import { Action, ActionType } from './models/action';
import { Character } from './models/character';
import { SkillEnum } from './models/skill';
import { renderCharacter } from './render-functions';

const character = new Character('T`risse', 'Hexblade', 'Elf', 'Drow');

character.abilities.get(AbilityEnum.Strength).setValue(6).setSavingThrowBonus(1);
character.abilities.get(AbilityEnum.Dexterity).setValue(14).setSavingThrowBonus(1); // rolled 13, +1 from drow race
character.abilities.get(AbilityEnum.Constitution).setValue(14).setSavingThrowBonus(1);
character.abilities.get(AbilityEnum.Intelligence).setValue(10).setSavingThrowBonus(1);
character.abilities.get(AbilityEnum.Wisdom).setValue(12).setSavingThrowProficiency(true).setSavingThrowBonus(1);
character.abilities.get(AbilityEnum.Charisma).setValue(18).setSavingThrowProficiency(true).setSavingThrowBonus(1); // rolled 17, +1 from feat (instead of +2 racial)
// drow
character.skills.get(SkillEnum.Perception).setProficiency(true);
// Far traveler
character.skills.get(SkillEnum.Insight).setProficiency(true);
// Warlock
character.skills.get(SkillEnum.Arcana).setProficiency(true);
character.skills.get(SkillEnum.Deception).setProficiency(true);

character.level = 4;
character.armor = 17;
character.speed = 30;
character.hitDie = 8;
character.hitLevelUpRolls = [2, 3];
character.alignment = 'Chaotic Neutral';
character.archetype = 'Pact of the Blade';

character.addAction(
  new Action('Pact Greatsword', 'Melee', ActionType.Action, (character) => {
    const attack = character.chaMod + character.proficiency;
    // +1 from improved pact blade invocation
    return `+${attack + 1} AC, 2d6+${character.chaMod + 1} Slashing`;
  }),
);
character.addAction(
  new Action("Hexblade's Curse", '30', ActionType.BonusAction, (character) => {
    return `Crit on 19, 20; ${character.proficiency} bonus damage on hit; ${
      character.level + character.chaMod
    } heal on kill`;
  }),
);
character.addAction(
  new Action('Dancing Lights', '120', ActionType.Action, (character) => {
    let primaryDamage = '';
    let secondaryDamage = `${character.intMod} Fire`;
    if (character.level >= 5) {
      primaryDamage = 'd8 Fire and ';
      secondaryDamage = `d8+${character.intMod} Fire`;
    }
    if (character.level >= 11) {
      primaryDamage = '2d8 Fire and ';
      secondaryDamage = `2d8+${character.intMod} Fire`;
    }
    if (character.level >= 17) {
      primaryDamage = '3d8 Fire and ';
      secondaryDamage = `3d8+${character.intMod} Fire`;
    }
    return `${primaryDamage}${secondaryDamage} to secondary target`;
  }),
);
character.addAction(
  new Action('Eldrich Blast', '120', ActionType.Action, (character) => {
    const attack = character.chaMod + character.proficiency;
    return `+${attack + 1} AC, d10+1 Force`;
  }),
);
character.addAction(
  new Action('Greenflame Blade', 'With Melee Attack', ActionType.Action, (character) => {
    let primaryDamage = '';
    let secondaryDamage = `${character.chaMod} Fire`;
    if (character.level >= 5) {
      primaryDamage = 'd8 Fire ';
      secondaryDamage = `d8+${character.chaMod} Fire`;
    }
    if (character.level >= 11) {
      primaryDamage = '2d8 Fire ';
      secondaryDamage = `2d8+${character.chaMod} Fire`;
    }
    if (character.level >= 17) {
      primaryDamage = '3d8 Fire ';
      secondaryDamage = `3d8+${character.chaMod} Fire`;
    }
    return `${primaryDamage} and ${secondaryDamage} to secondary target`;
  }),
);
character.addAction(
  new Action('Shield', 'Self', ActionType.Reaction, (character) => {
    return `Gain 5 AC until the start of my next turn`;
  }),
);
character.addAction(
  new Action('Dancing Lights', '120', ActionType.Action, (character) => {
    return `Create four torch-sized dim lights with 10 ft radius`;
  }),
);
character.addAction(
  new Action('Faerie Fire', '60', ActionType.Action, (character) => {
    return `<strong>Concentration, up to 1 minute</strong><br>20 ft cube outlined in light. Dex save or creature also outlined and give advantage`;
  }),
);
character.addAction(
  new Action('Hex', '90', ActionType.BonusAction, (character) => {
    return `<strong>Concentration, up to 1 minute</strong><br>Curse target, extra d6 necrotic from me, disadvantage on ability checks`;
  }),
);
character.addAction(
  new Action('Protection from Evil and Good', 'Touch', ActionType.Action, (character) => {
    return `<strong>Concentration, up to 10 minutes</strong><br>
Protect one willing creature you touch against aberrations, celestials, elementals, fey, fiends, and undead.
Creatures have disadvantage on attack rolls against the target. The target also can't be charmed, frightened, or possessed by them.`;
  }),
);
character.addAction(
  new Action('Misty Step', 'Self', ActionType.BonusAction, (character) => {
    return `Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see.`;
  }),
);

character.proficiencies = ['Light Armor', 'Medium Armor', 'Simple Weapons', 'Martial Weapons', 'Shields', 'Harps'];

character.equipment = `Longsword, Scale mail, Harp, Traveler's clothes, a Backpack, a Crowbar, a Hammer, 10 pitons, 10 torches, a Tinderbox, 10 days of Rations, a Waterskin, 50 feet of Hempen rope, a small piece of jewelry worth 10 gp in the style of your homeland's craftsmanship, and a pouch containing 5 gp<br>
<strong>Cloak Of Protection</strong><br>
Adventuring gear (wondrous item, shoulders) Requires Attunement<br>
You gain a +1 bonus to AC and Saving Throws while you wear this cloak.`;

renderCharacter(character);
