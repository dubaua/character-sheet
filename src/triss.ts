import { AbilitiyEnum } from './models/ability';
import { Action, ActionType } from './models/action';
import { Character } from './models/character';
import { SkillEnum } from './models/skill';
import { renderCharacter } from './render-functions';

const character = new Character('T`riss', 'Hexblade', 'Elf', 'Drow');

character.abilities.get(AbilitiyEnum.Strength).setValue(6);
character.abilities.get(AbilitiyEnum.Dexterity).setValue(14); // rolled 13, +1 from drow race
character.abilities.get(AbilitiyEnum.Constitution).setValue(14);
character.abilities.get(AbilitiyEnum.Intelligence).setValue(10);
character.abilities.get(AbilitiyEnum.Wisdom).setValue(12).setSavingThrowProficiency(true);
character.abilities.get(AbilitiyEnum.Charisma).setValue(18).setSavingThrowProficiency(true); // rolled 17, +1 from feat (instead of +2 racial)
// drow
character.skills.get(SkillEnum.Perception).setProficiency(true);

character.level = 1;
character.armor = 16;
character.speed = 30;
character.hitDie = 8;
character.hitLevelUpRolls = [];
character.alignment = 'Chaotic Neutral';
character.archetype = 'Pact of the Blade';

const longsword = new Action('Longsword', 'Melee', ActionType.Action, (character) => {
  const attack = character.chaMod + character.proficiency;
  return `+${attack} AC, d8+${character.chaMod} Slashing`;
});
const longswordTwoHands = new Action('Longsword Two Hands', 'Melee', ActionType.Action, (character) => {
  const attack = character.chaMod + character.proficiency;
  return `+${attack} AC, d10+${character.chaMod} Slashing`;
});
const hexbladesCurse = new Action('Hexblade\'s Curse', '30', ActionType.BonusAction, (character) => {
  return `Crit on 19, 20; ${character.proficiency} bonus damage on hit; ${character.level + character.chaMod} heal on kill`;
});
const greenflameBlade = new Action('Dancing Lights', '120', ActionType.Action, (character) => {
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
});
const eldrichBlast = new Action('Eldrich Blast', '120', ActionType.Action, (character) => {
  const attack = character.chaMod + character.proficiency;
  return `+${attack} AC, d10 Force`;
});
const shield = new Action('Shield', 'Self', ActionType.Reaction, (character) => {
  return `Gain 5 AC until the start of my next turn`;
});
const dancingLights = new Action('Dancing Lights', '120', ActionType.Action, (character) => {
  return `Create four torch-sized dim lights with 10 ft radius`;
});
character.actions.set(longsword.title, longsword);
character.actions.set(longswordTwoHands.title, longswordTwoHands);
character.actions.set(hexbladesCurse.title, hexbladesCurse);
character.actions.set(greenflameBlade.title, greenflameBlade);
character.actions.set(eldrichBlast.title, eldrichBlast);
character.actions.set(shield.title, shield);
character.actions.set(dancingLights.title, dancingLights);

character.proficiencies = [
  'Light Armor',
  'Medium Armor',
  'Simple Weapons',
  'Martial Weapons',
  'Shields',
];

character.equipment = `Longsword, Scale mail,`


renderCharacter(character);