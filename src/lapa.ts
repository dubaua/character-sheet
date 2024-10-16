import { AbilityEnum } from './models/ability';
import { Action, ActionType } from './models/action';
import { Character } from './models/character';
import { SkillEnum } from './models/skill';
import { renderCharacter } from './render-functions';

const character: Character = new Character('Бархатная Лапа', 'Убийца', 'Табакси');

/*
роллы хп 2 и 6
120
45 доспех,
25 лук короткий
4 (2 кенжика)
1 (20 дротиков
16 набор взломщика
2 колчан и 20 стрел
25 воровские инструменты
*/

character.abilities.get(AbilityEnum.Strength)!.setValue(14);
character.abilities.get(AbilityEnum.Dexterity)!.setValue(15 + 2 + 1).setSavingThrowProficiency(true); // Custom Lineage, Feat Athlet
character.abilities.get(AbilityEnum.Constitution)!.setValue(14);
character.abilities.get(AbilityEnum.Intelligence)!.setValue(10).setSavingThrowProficiency(true);
character.abilities.get(AbilityEnum.Wisdom)!.setValue(8);
character.abilities.get(AbilityEnum.Charisma)!.setValue(10);

// Плут
character.skills.get(SkillEnum.Stealth)!.setProficiency(true);
character.skills.get(SkillEnum.Acrobatics)!.setProficiency(true).setExpertise(true);
character.skills.get(SkillEnum.Athletics)!.setProficiency(true).setExpertise(true);
character.skills.get(SkillEnum.SleightOfHand)!.setProficiency(true);
// Custom lineage
character.skills.get(SkillEnum.Perception)!.setProficiency(true);
// background Thieves Guild
character.skills.get(SkillEnum.Deception)!.setProficiency(true);
character.skills.get(SkillEnum.Insight)!.setProficiency(true);

// @ts-ignore
window.lapa = character;

character.level = 3;
character.armor = 12 + character.dexMod;
character.speed = 30;
character.hitDie = 8;
character.hitLevelUpRolls = [2, 6];
character.hpBonus = 0;
character.alignment = 'Хаотично скрытный';
character.archetype = '';
character.weaponEnchantment = 0;

character.addAction(
  new Action('Короткий Лук', '80/320', ActionType.Action, (character) => {
    const attack = character.dexMod + character.proficiency
    const damage = character.dexMod;
    return `+${attack} атаки, 1d6+${damage} колющий`;
  }),
);

character.addAction(
  new Action('Дротик', '20/60', ActionType.Action, (character) => {
    const attack = character.dexMod + character.proficiency
    const damage = character.dexMod;
    return `+${attack} атаки, 1d4+${damage} колющий`;
  }),
);

character.addAction(
  new Action('Кинжал', 'ближняя', ActionType.Action, (character) => {
    const attack = character.dexMod + character.proficiency
    const damage = character.dexMod;
    return `+${attack} атаки, 1d4+${damage} колющий`;
  }),
);

character.addAction(
  new Action('Скрытая Атака', 'попадание', ActionType.FreeAction, (character) => {
    const dices = Math.ceil(character.level / 2)
    return `+${dices}d6 урона типа атаки`;
  }),
);

character.proficiencies = [
  'Легкая броня',
  'Простое оружие',
  'Ручные Арбалеты',
  'Длинные мечи',
  'Рапиры',
  'Короткие мечи',
  'Воровские инструменты',
  'Набор отравителя',
  'Набор для грима',
  'Флейты' // предыстория
];

character.equipment = `
Клепаный кожаный доспех, надетый под темную одежду с капюшоном:
короткий лук, 2 кинжала, 20 дротиков, колчан со стрелами
<br>
<br>
<strong>Набор взломщика</strong> Включает рюкзак, сумку с 1 000 металлических шариков, 10 футов лески, колокольчик, 5 свечек, ломик, молоток, 10 шлямбуров, закрытый фонарь, 2 фляги масла, рационы на 5 дней, трутницу и бурдюк. В набор также входит 50-футовая пеньковая верёвка, закреплённая сбоку.<br>
<br>
<strong>Воровские инструменты</strong> В этот набор инструментов входят небольшой напильник, набор отмычек, небольшое зеркальце на длинной ручке, ножницы и пара щипчиков. Владение этими инструментами позволяет добавлять бонус мастерства ко всем проверкам характеристик, сделанным для отключения ловушек и взлома замков.<br>
<br>
<strong>Татуировка Гильдии Воров</strong>, требуется настройка<br>
Нанесённая специальной иглой, эта магическая татуировка имеет абстрактный внешний вид в тёмных тонах.<br>
<strong>Теневая сущность.</strong> Вы получаете тёмное зрение в пределах 60 футов и совершаете проверки Ловкости (Скрытность) с преимуществом.<br>
<strong>Теневая защита.</strong> Когда вы получаете урон, вы можете реакцией стать бесплотным на мгновение, уменьшив вдвое урон, который вы получаете. Эта реакция не может быть совершена вновь до следующего заката.<br>
`;

renderCharacter(character);
