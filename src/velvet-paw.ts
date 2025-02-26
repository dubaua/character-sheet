import { AbilityEnum } from './models/ability';
import { Action, ActionType } from './models/action';
import { Character } from './models/character';
import { SkillEnum } from './models/skill';
import { renderCharacter } from './render-functions';

const character: Character = new Character('Бархатная Лапа', 'Солблейд', 'Satyr');

character.abilities.get(AbilityEnum.Strength)!.setValue(13).setSavingThrowBonus(1);
character.abilities.get(AbilityEnum.Dexterity)!.setValue(15 + 2 + 1).setSavingThrowProficiency(true).setSavingThrowBonus(1);
character.abilities.get(AbilityEnum.Constitution)!.setValue(12).setSavingThrowBonus(1);
character.abilities.get(AbilityEnum.Intelligence)!.setValue(13 + 1).setSavingThrowProficiency(true).setSavingThrowBonus(1);
character.abilities.get(AbilityEnum.Wisdom)!.setValue(10).setSavingThrowBonus(1);
character.abilities.get(AbilityEnum.Charisma)!.setValue(10).setSavingThrowBonus(1);

// своя предыстория
character.skills.get(SkillEnum.SleightOfHand)!.setProficiency(true).setExpertise(true).setPassiveBonus(5);
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
character.skills.get(SkillEnum.Deception)!.setProficiency(true).setExpertise(true); // Броня Асмодея
// tabaxi
character.skills.get(SkillEnum.Stealth)!.setProficiency(true).setExpertise(true);
character.skills.get(SkillEnum.Perception)!.setProficiency(true).setExpertise(true); // Броня Асмодея

// @ts-ignore
window.socrates = character

character.level = 6;
character.armor = 12 + character.dexMod + 2 + 1 + 2; // зачарование брони Асмодея, кольцо защиты, щит
character.speed = 30;
character.hitDie = 8;
character.hitLevelUpRolls = [5,5,5,5,9];
character.hpBonus = 0;
character.alignment = 'Хаотичный';
character.archetype = '';
character.weaponEnchantment = 0;


character.addAction(
  new Action('Скрытая Атака', 'попадание', ActionType.BonusAction, (character) => {
    return `${Math.floor((character.level - 1) / 2) + 1}d6 с фехтовальным или дальним`;
  }),
);
character.addAction(
  new Action('Дроуский Кинжал + 2', 'ближнее', ActionType.Action, (character) => {
    const attack = character.dexMod + character.proficiency + 2;
    return `+${attack} AC, d8+${character.dexMod + 2} колющий, напор`;
  }),
);
character.addAction(
  new Action('Хлыст', 'ближнее досягаемость', ActionType.Action, (character) => {
    const attack = character.dexMod + character.proficiency;
    return `+${attack} AC, d4+${character.dexMod} рубящий, замедление`;
  }),
);
character.addAction(
  new Action('Кинжал+1', 'ближнее', ActionType.Action, (character) => {
    const attack = character.dexMod + character.proficiency;
    return `+${attack + 1} AC, d4+${character.dexMod + 1} колющий, подрезание`;
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
  new Action('Громовой Клинок', 'Магия', ActionType.Action, (character) => {
    let primaryDamage = '';
    let moveDamage = 'd8';
    if (character.level >= 5) {
      primaryDamage = 'd8 ';
      moveDamage = '2d8';
    }
    if (character.level >= 11) {
      primaryDamage = '2d8 ';
      moveDamage = '3d8';
    }
    if (character.level >= 17) {
      primaryDamage = '3d8 ';
      moveDamage = '4d8';
    }
    return `${primaryDamage} гром + при передвижении ${moveDamage} гром`;
  }),
);

character.proficiencies = [
  'Легкая броня',
  'Средняя броня',
  'Щиты',
  'Простое оружие и воинское оружие',
  'Воровские инструменты',
  'Набор Отравителя', // происхождение
  'Набор Алхимика', // происхождение
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

0 ур: дает компетентность 1 навыка и владение инфернальным языком
1 ур: дает возможность кастовать раз в день Невидимость и Адское Возмездие откат каждого на продолж отдыхе
2 ур: броня становится +1, дает еще компетентность и 2 заряда Дьявольское везение (переброс  1 навыка, использовать новое знчение) откат на продолж отдыхе
3 ур: броня становится +2, даёт навык Дьявольский рывок (работает как туманный шаг, только позволяет по пути телепорта атаковать цель и применить к ней сник атаку, причем вне ограничений обычной сник атаки) восстанавливается коротким отдыхом

*/ 
character.equipment = `4 кинжала, дроуский кинжал +2 (короткий меч), клепаная кожа, воровские инструменты, мастерский набор отравителя (+1d4 к ядам), мастерские алхимические пренадлежности, 20 дротиков, рюкзак, спальник, одежда путешественника, зеркало, духи<br>
Парадная одежда — красная одежда чужестранки, роскошное вечернее платье в стиле дроу, сине-желтое одеяние заморского ученого<br>
<br>
Тетрадь с договорами<br>
<strong>Броня Асмодея</strong>, проклепанная броня, требует настройки<br>
<strong>0 Уровень</strong>. Дарует владение инфернальным языком и компетентность в одном навыке (Восприятие).<br>
<strong>1 Уровень</strong>. Дарует возможность накладывать заклинания Невидимость и Адское Возмездие. Когда заклинание наложенно с помощью брони, его нельзя накладывать таким образом до конца следующего продолжительного отдыха.<br>
<strong>2 Уровень</strong>. Броня становится магической бронёй +1. Дарует компетентность в ещё одном навыке (Обман). Дарует 2 заряда Дьявольского Везения, можно перебросить любую проверку навыка. Восстанавливается на длительном отдыхе.<br>
<strong>3 Уровень</strong>. Броня становится магической бронёй +2. Дарует возможность накладывать заклинание Дьявольский Рывок. Когда заклинание наложенно с помощью брони, его нельзя накладывать таким образом до конца следующего короткого отдыха. Дьявольское везение теперь также позволяет перебрасывать спасброски.<br>
<br>
<strong>Перчатки Воровства</strong>, +5 Ловкость рук на вскрытие замков<br>
<strong>Кольцо Защиты</strong>, требует настройки, дарует +1 к защите и спасброскам<br>
<strong>Кольцо свободных действий</strong>, требует настройки, Если вы носите это кольцо, труднопроходимая местность не заставляет вас тратить дополнительное перемещение. Кроме того, магия не может ни уменьшить вашу скорость, ни сделать вас парализованным или опутанным.<br>
`;

character.addSpell({
  title: 'Защита от оружия',
  vocal: ['korzan rakor'],
  somatic: 'Защита оружием',
  level: 0,
  school: 'ограждение',
  actionType: 'Действие',
  distance: 'На себя',
  components: 'В, С',
  duration: 'Концентрация, до 1 минуты',
  classes: 'бард, волшебник, колдун, чародей',
  source: `Player's handbook`,
  description: `Каждый раз, когда существо совершает атаку по вам до окончания длительности заклинания, то атакующий вычитает 1к4 из броска атаки.`,
});

character.addSpell({
  title: 'Громовой клинок',
  vocal: ['ash\'san'],
  somatic: 'удар клинком',
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
  vocal: ['shar\'kar korakos'],
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

character.addSpell({
  title: 'Невидимость',
  vocal: ['nas\'sharm morak'],
  somatic: 'провести лапой по глазам',
  level: 2,
  school: 'иллюзия',
  actionType: 'Действие',
  distance: 'Касание',
  components: 'В, С, М (ресничка в смоле)',
  duration: 'Концентрация, до 1 часа',
  classes: 'бард, волшебник, колдун, чародей',
  source: `Player's handbook`,
  description: `Существо, которого вы касаетесь, получает
состояние невидимый до окончания действия заклинания. Заклинание прекращается досрочно сразу после того, как цель совершит атаку, нанесёт урон или наложит заклинание.
Использование более высокой ячейки. Вы можете выбрать одну дополнительную цель за каждый уровень ячейки заклинания выше 2-го.`,
});

character.addSpell({
  title: 'Адское Возмездие',
  vocal: ['mordakar zan\'shamrrak'],
  somatic: 'хурма трясущаяся',
  level: 1,
  school: 'воплощение',
  actionType: 'Реакция, которую вы используете в ответ на получение урона от существа, которое вы видите в пределах 60 футов от себя',
  distance: '60 футов',
  components: 'В, С',
  duration: 'Мгновенно',
  classes: 'колдун',
  source: `Player's handbook`,
  description: `Существо, нанесящее вам урон, на мгновение оказывается окружено зелёными огнями. Оно должно совершить спасбросок Ловкости, получая 2к10 урона огнём при провале или половину этого урона при успешном спасброске.
Использование более высокой ячейки. Урон увеличивается на 1к10 за каждый уровень ячейки заклинаний выше 1.`,
});

character.addSpell({
  title: 'Дьявольский Рывок',
  vocal: ['kash\'marr kazandor'],
  level: 2,
  school: 'вызов',
  actionType: '1 бонусное действие',
  distance: 'На себя',
  components: 'В',
  duration: 'Мгновенно',
  classes: 'волшебник, колдун, чародей',
  source: `Мирхат`,
  description: `Окутавшись серебристым туманом, вы телепортируетесь на расстояние до 30 футов в свободное пространство, видимое вами. В радиусе 30 футов во время телепортации можно атаковать цель и применить к ней Скрытую Атаку, даже, если в этот раунд она была нанесена, однако, нельзя применять Скрытую Атаку на цель, к которой она уже применялась в этот ход.`,
});

renderCharacter(character);

const intSpellcasting = document.querySelector('[data-int-spellcasting]');
if (intSpellcasting) {
  const intMod = character.proficiency + character.intMod + 8;
  intSpellcasting.textContent = intMod.toString()
}