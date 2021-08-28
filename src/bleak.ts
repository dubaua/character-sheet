import { AbilitiyEnum } from './models/ability';
import { Action, ActionType } from './models/action';
import { Character } from './models/character';
import { SkillEnum } from './models/skill';
import { renderCharacter } from './render-functions';

const character = new Character('Bleak', 'Rogue', 'Elf', 'High Elf');

character.abilities.get(AbilitiyEnum.Strength).setValue(8);
character.abilities.get(AbilitiyEnum.Dexterity).setValue(18).setSavingThrowProficiency(true);
character.abilities.get(AbilitiyEnum.Constitution).setValue(14);
character.abilities.get(AbilitiyEnum.Intelligence).setValue(16).setSavingThrowProficiency(true);
character.abilities.get(AbilitiyEnum.Wisdom).setValue(10);
character.abilities.get(AbilitiyEnum.Charisma).setValue(14);

character.skills.get(SkillEnum.Acrobatics).setProficiency(true);
character.skills.get(SkillEnum.Deception).setProficiency(true);
character.skills.get(SkillEnum.Insight).setProficiency(true);
character.skills.get(SkillEnum.Investigation).setProficiency(true);
character.skills.get(SkillEnum.Perception).setProficiency(true);
character.skills.get(SkillEnum.SleightOfHand).setProficiency(true);
character.skills.get(SkillEnum.Stealth).setProficiency(true).setExpertise(true);

character.level = 4;
character.armor = 15;
character.speed = 30;
character.hitDie = 8;
character.hitLevelUpRolls = [6, 8, 8];
character.alignment = 'Chaotic Neutral';
character.archetype = 'Arcane Trickster';

const sneakAttack = new Action('Sneak Attack', 'On hit', ActionType.BonusAction, (character) => {
  return `${Math.floor((character.level - 1) / 2) + 1}d6 with finesse or ranged weapon`;
});
const rapierAttack = new Action('Rapier', 'Melee', ActionType.Action, (character) => {
  const attack = character.dexMod + character.proficiency;
  return `+${attack} AC, d8+${character.dexMod} Piercing`;
});
const shortswordAttack = new Action('Shortsword', 'Melee', ActionType.Action, (character) => {
  const attack = character.dexMod + character.proficiency;
  return `+${attack} AC, d6+${character.dexMod} Piercing`;
});
const shortswordOffhandAttack = new Action('Shortsword Offhand', 'Melee', ActionType.Action, (character) => {
  const attack = character.dexMod + character.proficiency;
  return `+${attack} AC, d6 Piercing`;
});

character.proficiencies = [
  'Light Armor',
  'Simple Weapons',
  'Rapiers',
  'Longswords',
  'Shortswords',
  'Shortbows',
  'Longbows',
  'Thieves’ Tools expertise',
  'Disguise Kit',
  'Cooks Utensils',
];

character.equipment = `Studded Leather, rapier, longbow and quiver of&nbsp;20&nbsp;arrows, two daggers, two elven shortswords,
thieves&rsquo; tools, fine clothes, disguise kit, cook&rsquo;s utensils, burglar&rsquo;s Pack. Backpack,
a&nbsp;bag of&nbsp;1,000 ball bearings, 10&nbsp;feet of&nbsp;string, a&nbsp;bell, 5&nbsp;candles,
a&nbsp;crowbar, a hammer, 10&nbsp;pilons, a&nbsp;hooded lantern, 2&nbsp;flasks of&nbsp;oil, 5&nbsp;days
rations, a&nbsp;tinderbox, and a&nbsp;waterskin.&nbsp;50&nbsp;feet hempen rope.`;

renderCharacter(character);

// TODO feats
// TODO Attacks
