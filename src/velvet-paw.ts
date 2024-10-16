import { AbilityEnum } from './models/ability';
import { Action, ActionType } from './models/action';
import { Character } from './models/character';
import { SkillEnum } from './models/skill';
import { renderCharacter } from './render-functions';

const character: Character = new Character('Схр\'аззира', 'Клинок Души', 'Satyr');

character.abilities.get(AbilityEnum.Strength)!.setValue(13);
character.abilities.get(AbilityEnum.Dexterity)!.setValue(15 + 2).setSavingThrowProficiency(true);
character.abilities.get(AbilityEnum.Constitution)!.setValue(12);
character.abilities.get(AbilityEnum.Intelligence)!.setValue(13 + 1).setSavingThrowProficiency(true);
character.abilities.get(AbilityEnum.Wisdom)!.setValue(10);
character.abilities.get(AbilityEnum.Charisma)!.setValue(10);

// своя предыстория
character.skills.get(SkillEnum.SleightOfHand)!.setProficiency(true);
character.skills.get(SkillEnum.Arcana)!.setProficiency(true);
// черта посвященный в магию
// маскировка 1 ур
// booming blade
// дружба

// проныра

// сообщение от клинка души (психический шепот, поэтому сообщение не нужно)
// плут клинок души
character.skills.get(SkillEnum.Acrobatics)!.setProficiency(true);
character.skills.get(SkillEnum.Athletics)!.setProficiency(true).setExpertise(true);
character.skills.get(SkillEnum.Insight)!.setProficiency(true);
character.skills.get(SkillEnum.Investigation)!.setProficiency(true);
// tabaxi
character.skills.get(SkillEnum.Stealth)!.setProficiency(true).setExpertise(true);
character.skills.get(SkillEnum.Perception)!.setProficiency(true).setExpertise(true); // от предыстории

// @ts-ignore
window.socrates = character

// Alert Feat
character.initiativeModifier = character.proficiency;

character.level = 3;
character.armor = 12 + character.dexMod;
character.speed = 30;
character.hitDie = 8;
character.hitLevelUpRolls = [];
character.hpBonus = 0;
character.alignment = 'Хаотично тупой';
character.archetype = '';
character.weaponEnchantment = 0;


character.addAction(
  new Action('Скрытая Атака', 'попадание', ActionType.BonusAction, (character) => {
    return `${Math.floor((character.level - 1) / 2) + 1}d6 с фехтовальным или дальним`;
  }),
);
character.addAction(
  new Action('Рапира', 'ближнее', ActionType.Action, (character) => {
    const attack = character.dexMod + character.proficiency;
    return `+${attack} AC, d8+${character.dexMod} колющий, напор`;
  }),
);
character.addAction(
  new Action('Кинжал', 'ближнее', ActionType.Action, (character) => {
    const attack = character.dexMod + character.proficiency;
    return `+${attack} AC, d4+${character.dexMod} колющий, подрезание`;
  }),
);
character.addAction(
  new Action('Кинжал бросок', '20/60', ActionType.Action, (character) => {
    const attack = character.dexMod + character.proficiency;
    return `+${attack} AC, d4+${character.dexMod} колющий, подрезание`;
  }),
);
character.addAction(
  new Action('Дротик', '20/60', ActionType.Action, (character) => {
    const attack = character.dexMod + character.proficiency;
    return `+${attack} AC, d4+${character.dexMod} колющий, напор`;
  }),
);
character.addAction(
  new Action('Псирикен', 'ближнее', ActionType.Action, (character) => {
    const attack = character.dexMod + character.proficiency;
    return `+${attack} AC, d6+${character.dexMod} психический, напор`;
  }),
);
character.addAction(
  new Action('Псирикен бросок', '60/120', ActionType.Action, (character) => {
    const attack = character.dexMod + character.proficiency;
    return `+${attack} AC, d6+${character.dexMod} психический, напор`;
  }),
);
character.addAction(
  new Action('Псирикен второй', '0/60/120', ActionType.BonusAction, (character) => {
    const attack = character.dexMod + character.proficiency;
    return `+${attack} AC, d4+${character.dexMod} психический, напор`;
  }),
);
character.addAction(
  new Action('Дротик', '20/60', ActionType.Action, (character) => {
    const attack = character.dexMod + character.proficiency;
    return `+${attack} AC, d4+${character.dexMod} колющий, напор`;
  }),
);
character.addAction(
  new Action('Booming Blade', 'With Melee Attack', ActionType.Action, (character) => {
    let primaryDamage = '';
    let moveDamage = 'd8 Thunder';
    if (character.level >= 5) {
      primaryDamage = 'd8 Thunder ';
      moveDamage = '2d8 Thunder';
    }
    if (character.level >= 11) {
      primaryDamage = '2d8 Thunder ';
      moveDamage = '3d8 Thunder';
    }
    if (character.level >= 17) {
      primaryDamage = '3d8 Thunder ';
      moveDamage = '4d8 Thunder';
    }
    return `${primaryDamage}if target willingly moves ${moveDamage}`;
  }),
);

character.proficiencies = [
  'Легкая броня',
  'Простое оружие и воинское оружие со свойством легкое или фехтовальное',
  'Воровские инструменты',
  'Набор Отравителя', // происхождение
];

/*
100зм
25 воровские инструменты
1 дротики 20
8 4 кинжала
2 рюкзак
1 спальник
2 одежда путешественника
1 веревка
50 набор отравителя

предыстория 50зм
25 рапира
15 парадная одежда
5 зм зеркало
5 зм духи
*/ 
character.equipment = `4 кинжала, рапира, клепаная кожа, воровские инструменты, набор отравителя, 20 дротиков, рюкзак, спальник, веревка, одежда путешественника, парадная одежда, зеркало, духи, 10 золотых<br>
<br>
<strong>Броня Асмодея</strong>, неизвестно что делает, выглядит как проклепка<br>
Тетрадь с договорами<br>
`;

character.addSpell({
  title: 'Дружба',
  vocal: [],
  somatic: 'Распростертые объятья, как когда старого знакомого увидел',
  level: 0,
  school: 'очарование',
  actionType: 'Действие',
  distance: '10 футов',
  components: 'С, М (небольшое количество грима)',
  duration: 'Концентрация, до 1 минуты',
  classes: 'бард, волшебник, колдун, чародей',
  source: `Player's handbook`,
  description: `Вы магически излучаете чувство дружелюбия к одному существу, которого видите в пределах дистанции. Цель должна преуспеть в спасброске Мудрости, иначе она получит состояние очарованный на время действия заклинания. Цель автоматически преуспеет, если она не является гуманоидом, если вы сражаетесь с ней, или если вы накладывали это заклинание на неё в течение последних 24 часов.
Заклинание заканчивается досрочно, если цель получает урон, или если вы совершаете бросок атаки, наносите урон или заставляете кого-либо совершить спасбросок. Когда заклинание заканчивается, то цель осознаёт, что была очарована вами.`,
});

character.addSpell({
  title: 'Громовой клинок',
  vocal: [],
  somatic: 'Крааа',
  level: 0,
  school: 'воплощение',
  actionType: 'Действие',
  distance: 'На себя (5-футовый радиус)',
  components: 'С, М (рукопашное оружие стоимостью не менее 1 см)',
  duration: '1 раунд',
  classes: 'волшебник, изобретатель, колдун, чародей',
  source: `«Sword Coast Adventurer's Guide», «Tasha's Cauldron of Everything»`,
  description: `Вы взмахиваете оружием, выбранным в качестве материального компонента, и совершаете им рукопашную атаку оружием против одного существа в пределах 5 футов от вас. При попадании цель подвергается обычному эффекту от атаки этим оружием и покрывается бушующей энергией до начала вашего следующего хода. Если цель добровольно перемещается на 5 футов или более до окончания действия заклинания, она получает 1к8 урона звуком, и действие заклинания заканчивается.
Урон этого заклинания увеличивается, когда вы достигаете определённых уровней. На 5-м уровне рукопашная атака наносит дополнительно 1к8 урона звуком при попадании, а урон, получаемый при перемещении, увеличивается до 2к8. Оба броска урона снова увеличиваются на 1к8 на 11-м уровне (2к8 и 3к8) и на 17-м уровне (3к8 и 4к8).`,
});

character.addSpell({
  title: 'Маскировка',
  vocal: ['млэм'],
  somatic: 'полизать лапу и почесать морду',
  level: 1,
  school: 'иллюзия',
  actionType: 'Действие',
  distance: 'На себя',
  components: 'В, С',
  duration: '1 час',
  classes: 'бард, волшебник, чародей',
  source: `Player's handbook`,
  description: `Вы изменяете свой внешний вид, включая одежду, доспехи, оружие и другие предметы, находящиеся при вас, до окончания длительности заклинания. Вы можете казаться на 1 фут ниже или выше, а также выглядеть тяжелее или легче. Вы должны принять форму, которая имеет ту же основную структуру конечностей, что и у вас. В остальном, степень иллюзии зависит от вас.
Изменения, произведенные этим заклинанием, не выдерживают проверку физическим исследование. Например, если вы используете это заклинание, чтобы добавить шляпу к своему наряду, то предметы будут проходить сквозь шляпу, и любой, кто её коснется, не почувствует ничего.
Чтобы разоблачить вашу маскировку, существо должно совершить действие поиск для изучения вашего внешнего вида и успешно пройти проверку Интеллект (Анализ) против Сл вашего заклинания.`,
});

renderCharacter(character);

const intSpellcasting = document.querySelector('[data-int-spellcasting]');
if (intSpellcasting) {
  const intMod = character.proficiency + character.intMod + 8;
  intSpellcasting.textContent = intMod.toString()
}