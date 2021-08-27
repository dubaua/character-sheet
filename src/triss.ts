import { AbilitiyEnum } from './models/ability';
import { Character } from './models/character';
import { SkillEnum } from './models/skill';
import { renderCharacter } from './render-functions';

const character = new Character('T`riss', 'Hexblade', 'Elf', 'Drow');

character.abilities.get(AbilitiyEnum.Strength).setValue(6);
character.abilities.get(AbilitiyEnum.Dexterity).setValue(13);
character.abilities.get(AbilitiyEnum.Constitution).setValue(14);
character.abilities.get(AbilitiyEnum.Intelligence).setValue(10);
character.abilities.get(AbilitiyEnum.Wisdom).setValue(12).setSavingThrowProficiency(true);
character.abilities.get(AbilitiyEnum.Charisma).setValue(18).setSavingThrowProficiency(true);

character.skills.get(SkillEnum.Perception).setProficiency(true);

character.level = 1;
character.armor = 10;
character.speed = 30;
character.hitDie = 8;
character.hitLevelUpRolls = [];
character.alignment = 'Chaotic Neutral';
character.archetype = 'Pact of the Blade';

character.proficiencies = [
  'Light Armor',
  'Medium Armor',
  'Simple Weapons',
  'Martial Weapons',
  'Shields',
];

character.equipment = `Studded Leather, rapier, longbow and quiver of 20 arrows, two daggers, two elven shortswords,
thieves’ tools, fine clothes, disguise kit, cook’s utensils, burglar’s Pack. Backpack,
a bag of 1,000 ball bearings, 10 feet of string, a bell, 5 candles,
a crowbar, a hammer, 10 pilons, a hooded lantern, 2 flasks of oil, 5 days
rations, a tinderbox, and a waterskin. 50 feet hempen rope.`


renderCharacter(character);