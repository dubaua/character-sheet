import { AbilityEnum } from './models/ability';
import { Action, ActionType } from './models/action';
import { Character } from './models/character';
import { SkillEnum } from './models/skill';
import { renderCharacter } from './render-functions';

/*
настройки
камень удачи (+1 к проверкам и спасам)
кольцо правды (преимущество на прониц)
Эльфийский плащ (преимущество)

.. фонарь обнаружения
*/

const character: Character = new Character('Сократ', 'Бард', 'Satyr');

/*
11 (3 + 4 + 4 + 3 - 3)
12 (4 + 6 + 2 + 1 - 1)
13 (4 + 1 + 6 + 3 - 1)
15 (1 + 6 + 5 + 4 - 1)
16 (6 + 5 + 1 + 5 - 1)
17 (6 + 5 + 4 + 6 - 4)
*/
// hp rolls = 18 (7+3+5+3)

// set bonus 1 stone of luck
character.abilities.get(AbilityEnum.Dexterity)!.setValue(17 + 1).setSavingThrowProficiency(true).setSavingThrowBonus(1);
character.abilities.get(AbilityEnum.Charisma)!.setValue(16 + 2 + 2).setSavingThrowProficiency(true).setSavingThrowBonus(1); // + 2 Paks blessing
character.abilities.get(AbilityEnum.Intelligence)!.setValue(15 + 1).setSavingThrowBonus(1); // feat Observant
character.abilities.get(AbilityEnum.Constitution)!.setValue(13).setSavingThrowBonus(1);
character.abilities.get(AbilityEnum.Wisdom)!.setValue(12).setSavingThrowBonus(1);
character.abilities.get(AbilityEnum.Strength)!.setValue(11).setSavingThrowBonus(1);

// satyr
character.skills.get(SkillEnum.Performance)!.setProficiency(true);
character.skills.get(SkillEnum.Persuasion)!.setProficiency(true);
// background
character.skills.get(SkillEnum.Stealth)!.setProficiency(true).setExpertise(true);
character.skills.get(SkillEnum.Perception)!.setProficiency(true).setExpertise(true).setPassiveBonus(5); // feat Observant
// Bard
character.skills.get(SkillEnum.Deception)!.setProficiency(true);
character.skills.get(SkillEnum.Insight)!.setProficiency(true);
character.skills.get(SkillEnum.Investigation)!.setProficiency(true).setPassiveBonus(5); // feat Observant
// Collegue of Knowledge
character.skills.get(SkillEnum.Acrobatics)!.setProficiency(true);
character.skills.get(SkillEnum.History)!.setProficiency(true);
character.skills.get(SkillEnum.SleightOfHand)!.setProficiency(true);

// stone of luck
character.skillCheckModifier = 1;

// @ts-ignore
window.socrates = character

// Alert Feat
character.initiativeModifier = 5;

character.level = 5;
character.armor = 13 + character.dexMod;
character.speed = 35;
character.hitDie = 8;
character.hitLevelUpRolls = [];
character.hpBonus = 0;
character.alignment = 'Хаотично нейтральный';
character.archetype = '';
character.weaponEnchantment = 0;

character.addAction(
  new Action('Спасброски против магии', '', ActionType.Action, (character) => {
    return 'Расовая фича сатира';
  }),
);
character.addAction(
  new Action('Бдительность', '', ActionType.Action, (character) => {
    return 'Другие существа не получают преимущество для бросков атаки по вам за то, что вы их не видите.';
  }),
);
character.addAction(
  new Action('Распознание лжи', '', ActionType.Action, (character) => {
    return 'Кольцо правды. Надев это кольцо, вы получаете преимущество на проверки Проницательности для определения, говорит ли кто-то правду или нет.';
  }),
);
character.addAction(
  new Action('Скрытность', '', ActionType.Action, (character) => {
    return 'Эльфийский плащ. Пока вы носите этот плащ с накинутым капюшоном, проверки Мудрости (Внимательность), совершённые чтобы увидеть вас, совершаются с помехой, а вы совершаете с преимуществом проверки Ловкости (Скрытность)';
  }),
);
// character.addAction(
//   new Action('Большой Меч Договора Сразмаху', '', ActionType.Action, (character) => {
//     const { chaMod, weaponEnchantment, proficiency } = character;
//     const attack = chaMod + proficiency;
//     return `+${attack + weaponEnchantment - 5} КД, d6+${chaMod + weaponEnchantment + 10 + 6} режущий + Кара ${
//       1 + 4
//     }d8 силовой`;
//   }),
// );
// character.addAction(
//   new Action('Мистический Заряд × 2', '120', ActionType.Action, (character) => {
//     const attack = character.chaMod + character.proficiency;
//     return `+${attack + 2} КД, d10+${character.chaMod + 2} силовой`;
//   }),
// );
// character.addAction(
//   new Action('Волшебная рука', '30', ActionType.Action, (character) => {
//     return `1 минута магическая рука помощница`;
//   }),
// );
// character.addAction(
//   new Action('Проклятье Хексблейда', '30', ActionType.BonusAction, (character) => {
//     return `Crit on 19, 20; ${character.proficiency} bonus damage on hit; ${
//       character.level + character.chaMod
//     } heal on kill`;
//   }),
// );
// character.addAction(
//   new Action('Щит', 'На себя', ActionType.Reaction, (character) => {
//     return `Бонус 5 КД до начала своего следующего хода`;
//   }),
// );
// character.addAction(
//   new Action('Туманный шаг', 'На себя', ActionType.BonusAction, (character) => {
//     return `Окутавшись серебристым туманом, вы телепортируетесь на 30 футов в свободное пространство, видимое вами.`;
//   }),
// );

character.proficiencies = [
  'Легкая броня',
  'Простое оружие',
  'Длинные мечи',
  'Короткие мечи',
  'Рапиры',
  'Ручные Арбалеты',
  'Лиры',
  'Виолы',
  'Лютни',
  'Волынки',
  'Воровские инструменты',
  'Набор для фальсификации',
];

character.equipment = `
Клепаный кожаный доспех, надетый под отличную одежду:
старый дорожный плащ с откидными бортами и поясом, застегивающийся на причудливые бронзовые пуговицы, в виде скарабеев.<br>
под ним видна пестрая шелковая рубашка нараспашку, обнажая мохнатую грудь.
Внимательный зритель заметит, что его шерстяные вычурные брюки заботливо подшиты, чтобы подходить под копыта. Но подшиты они были очень давно. Из кармана торчит полупустая бутылка вина, денег и оружия при нем нет.<br><br>
В его походной поклаже имеются: духи, кандалы, цепь, замок, воровские инструменты, набор для фальсификации, стальное зеркало, увеличительное стекло, волынка.<br><br>

Из расходных и повседневных вещей: пайки на 10 дней и бурдюк, 10 факелов, спальник, курительная трубка и табак. Бутылка т\`килы «Дам-в-Жбан», джина «Баньшина Жалоба» и лусканского рома. 5 фляжечек Мензоберонзанского Паучьего Абсента
<br>
<br>
<strong>Кольцо правды</strong>, требуется настройка<br>
Надев это кольцо, вы получаете преимущество на проверки Мудрости (Проницательность) для определения, говорит ли кто-то правду или нет.<br>
<br>
<strong>Эльфийский плащ</strong>, требуется настройка<br>
Пока вы носите этот плащ с накинутым капюшоном, проверки Мудрости (Восприятие), совершённые чтобы увидеть вас, совершаются с помехой, а вы совершаете с преимуществом проверки Ловкости (Скрытность), когда прячетесь — плащ способен изменять свой цвет, обеспечивая вам камуфляж. Накидывание и снятие капюшона совершается действием.<br>
<br>
<strong>Камень удачи</strong>, требуется настройка<br>
Пока этот полированный агат находится у вас, вы получаете бонус +1 к проверкам характеристик и спасброскам.<br>
<br>
<strong>Фонарь обнаружения</strong><br>
Этот закрытый фонарь способен гореть в течение шести часов на одной пинте масла, распространяя яркий свет в радиусе 30 футов и тусклый свет в радиусе ещё 30 футов. Все невидимые предметы и существа становятся видимыми, если они находятся в ярком свете этого фонаря. Вы можете действием опустить козырёк, уменьшив освещение до тусклого света в пределах 5 футов.
`;

character.addSpell({
  title: 'Дружба',
  vocal: [],
  somatic: 'Распростертые объятья, как когда старого знакомого увидел',
  level: 0,
  school: 'очарование',
  actionType: 'Действие',
  distance: 'На себя',
  components: 'С, М (небольшое количество грима, наносимое на лицо при накладывании этого заклинания)',
  duration: 'Концентрация, вплоть до 1 минуты',
  classes: 'бард, волшебник, колдун, чародей',
  source: `Player's handbook`,
  description: `Пока заклинание активно, вы совершаете с преимуществом все проверки Харизмы, направленные на одно выбранное вами существо, не враждебное по отношению к вам. Когда заклинание оканчивается, существо понимает, что вы влияли на её отношение с помощью магии, и становится враждебным по отношению к вам. Существо, склонное к насилию, может напасть на вас. Другие могут требовать другого возмездия (решает Мастер), в зависимости от отношений, сложившихся между вами.`,
});

character.addSpell({
  title: 'Злая насмешка',
  vocal: ['кринждан кайтыс булдым таш', 'яктыс якх!'],
  somatic: '',
  level: 0,
  school: 'очарование',
  actionType: 'Действие',
  distance: '60 футов',
  components: 'В',
  duration: 'Мгновенная',
  classes: 'бард',
  source: `Player's handbook`,
  description: `Вы испускаете на существо, видимое в пределах дистанции, поток оскорблений вперемешку с тонкой магией. Если цель слышит вас (при этом она не обязана вас понимать), она должна преуспеть в спасброске Мудрости, иначе получит урон психической энергией 1к4, и следующий бросок атаки до конца своего следующего хода совершит с помехой.

  Урон этого заклинания увеличивается на 1к4, когда вы достигаете 5-го уровня (2к4), 11-го уровня (3к4) и 17-го уровня (4к4).`,
});

character.addSpell({
  title: 'Фокусы',
  vocal: ['таш'],
  somatic: 'щелчки пальцами',
  level: 0,
  school: 'преобразование',
  actionType: 'Действие',
  distance: '10 футов',
  components: 'В, С',
  duration: 'Вплоть до 1 часа',
  classes: 'бард, волшебник, изобретатель, колдун, чародей',
  source: `Player's handbook`,
  description: `Это заклинание — небольшой магический трюк, на котором практикуются начинающие заклинатели. Вы создаете один из следующих магических эффектов в пределах дистанции:<ul> <li>Вы создаете мгновенный безвредный сенсорный эффект, такой как сноп искр, порыв ветра, тихую мелодию, или необычный запах.</li> <li>Вы мгновенно зажигаете или тушите свечу, факел или небольшой костер.</li> <li>Вы мгновенно чистите или мараете предмет, размерами не превышающий 1 кубического фута.</li> <li>Вы остужаете, нагреваете или придаете вкус 1 кубическому футу неживой материи на 1 час.</li> <li>Вы создаете на поверхности или предмете цвет, метку или символ, существующую 1 час.</li> <li>Вы создаете немагическую безделушку или иллюзорное изображение, помещающееся в вашу ладонь, и существующее до конца вашего следующего хода.</li>
</ul>Если вы накладываете это заклинание несколько раз, вы можете иметь не более трех не мгновенных эффектов одновременно, и можете действием окончить один любой из этих эффектов.`,
});
// яктыс якх!
character.addSpell({
  title: 'Обнаружение магии',
  vocal: ['махо о хикдащте кудасай'],
  level: 1,
  school: 'прорицание (ритуал)',
  actionType: '1 действие',
  distance: 'На себя',
  components: 'В, С',
  duration: 'Концентрация, вплоть до 10 минут',
  classes: 'бард, волшебник, друид, жрец, изобретатель, паладин, следопыт, чародей',
  source: `Player's handbook`,
  description: `Пока заклинание активно, вы чувствуете присутствие магии в пределах 30 футов. Если вы почувствовали за счет этого заклинания присутствие магии, вы можете действием увидеть слабую ауру вокруг видимого существа или предмета, несущего на себе магию, а также узнать школу этой магии, если она есть.

  Заклинание проницает большую часть барьеров, но блокируется 1 футом камня, 1 дюймом обычного металла, тонким листом свинца или 3 футами дерева или земли.`,
});

character.addSpell({
  title: 'Разговор с животными',
  vocal: ['добутсу но щита'],
  somatic: 'печать змеи наруто, скрещенные пальцы',
  level: 1,
  school: 'прорицание (ритуал)',
  actionType: ' 1 действие',
  distance: 'На себя',
  components: 'В, С',
  duration: '10 минут',
  classes: 'бард, друид, следопыт',
  source: `Player's handbook`,
  description: `Пока заклинание активно, вы получаете возможность понимать Зверей и общаться с ними устно. Знание и сознание многих Зверей ограничено их интеллектом, но они как минимум могут дать информацию о ближайших местах и чудовищах, включая тех, кого они видели за последний день. На усмотрение Мастера, вы можете попытаться убедить Зверя оказать вам небольшую помощь.`,
});

character.addSpell({
  title: 'Жуткий смех Таши',
  vocal: ['поккым болдым баш!'],
  somatic: 'говорящая рука',
  level: 1,
  school: 'очарование',
  actionType: '1 действие',
  distance: '30 футов',
  components: 'В, С, М (маленькие пирожные и перо, которым нужно махать в воздухе)',
  duration: 'Концентрация, вплоть до 1 минуты',
  classes: 'бард, волшебник',
  source: `Player's handbook`,
  description: `Существо на ваш выбор, видимое в пределах дистанции, воспринимает всё невероятно смешным и корчится от смеха, если заклинание на него действует. Цель должна преуспеть в спасброске Мудрости, иначе она падает ничком, становится недееспособной и в течение действия заклинания не может встать. Существа со значением Интеллекта 4 и ниже не попадают под действие этого заклинания.

  В конце каждого своего хода и каждый раз при получении урона цель может совершать новый спасбросок Мудрости. Спасбросок совершается с преимуществом, если он был вызван получением урона. При успехе заклинание оканчивается.`,
});

character.addSpell({
  title: 'Лечащее слово',
  vocal: ['казе но шизука'],
  level: 1,
  school: 'воплощение',
  actionType: '1 бонусное действие',
  distance: '60 футов',
  components: 'В',
  duration: 'Мгновенная',
  classes: 'бард, друид, жрец',
  source: `Player's handbook`,
  description: `Существо на ваш выбор, видимое в пределах дистанции, восстанавливает количество хитов, равное 1к4 + ваш модификатор базовой характеристики. Это заклинание не оказывает никакого эффекта на Нежить и Конструктов.

  На больших уровнях. Если вы накладываете это заклинание, используя ячейку 2-го уровня или выше, количество восстанавливаемых хитов увеличивается на 1к4 за каждый уровень ячейки выше первого.`,
});

character.addSpell({
  title: 'Обнаружение мыслей',
  vocal: ['токощьте кимас'],
  somatic: 'долгий блинк и нервное шевеление пальцами',
  level: 2,
  school: 'прорицание',
  actionType: ' 1 действие',
  distance: 'На себя',
  components: 'В, С, М (медная монетка)',
  duration: 'Концентрация, вплоть до 1 минуты',
  classes: 'бард, волшебник, чародей',
  source: `Player's handbook`,
  description: `Пока заклинание активно, вы можете читать мысли некоторых существ. При накладывании заклинания, а также действием в свой ход, пока заклинание активно, вы можете сосредоточиться на одном существе, которое видите в пределах 30 футов. Если у выбранного существа Интеллект равен 3 или ниже, или если оно не может говорить ни на одном языке, оно не попадает под действие заклинания.

  Вначале вы знаете поверхностные мысли существа — то, что находится в его сознании на текущий момент. Вы можете действием либо перенести внимание на мысли другого существа, либо попытаться углубиться в мысли текущего существа. Если вы погружаетесь глубже, цель должна совершить спасбросок Мудрости. В случае провала вы получаете понимание её мыслей (если есть), её эмоционального состояния, и того, что её больше всего заботит (а также то, что она любит и ненавидит). Если существо преуспеет, заклинание оканчивается. В любом случае, цель знает, что вы прощупывали её сознание, и если вы не перевели внимание на мысли другого существа, предыдущее существо может в свой ход действием совершить проверку Интеллекта, противопоставленную вашей проверке Интеллекта; в случае успеха заклинание оканчивается.
  
  Вопросы, задаваемые устно цели, влияют на ход её мыслей, поэтому это заклинание чрезвычайно эффективно во время допросов.
  
  Вы можете также использовать это заклинание для обнаружения присутствия мыслящих существ, которых вы не видите. Когда вы накладываете это заклинание, или позже, пока оно активно, потратив действие, вы можете поискать мысли существ в пределах 30 футов. Заклинание проницает большую часть барьеров, но блокируется 2 футами камня, 2 дюймами обычного металла или тонким листом свинца. Вы не можете обнаружить существ с Интеллектом 3 и ниже, а также тех, кто не говорят ни на одном языке.
  
  Обнаружив таким методом присутствие существа, вы можете до окончания действия заклинания читать его мысли, как описано выше, даже если вы его не видите, но оно должно находиться в пределах дистанции.`,
});

character.addSpell({
  title: 'Видение невидимого',
  vocal: ['янаттэ какудза рета моно о акирака ни-срю'],
  somatic: 'взаимодействие с виртуальным дашбордом',
  level: 2,
  school: 'прорицание',
  actionType: ' 1 действие',
  distance: 'На себя',
  components: 'В, С, М (щепотка талька и толченого серебра)',
  duration: '1 час',
  classes: 'бард, волшебник, изобретатель, чародей',
  source: `Player's handbook`,
  description: `Пока заклинание активно, вы видите невидимых существ и предметы, как если бы они были видимы, и ваше зрение простирается на Эфирный план. Эфирные существа и предметы выглядят призрачными и полупрозрачными.`,
});
// 4 level
character.addSpell({
  title: 'Раскалённый металл',
  vocal: ['ярык! аарык!'],
  somatic: 'на первое слово занесение руки, на второе резкое поднятие воображаемого металлического шара вверх',
  level: 2,
  school: 'преобразование',
  actionType: ' 1 действие',
  distance: '60 футов',
  components: 'В, С, М (кусок железа и пламя)',
  duration: 'Концентрация, вплоть до 1 минуты',
  classes: 'бард, друид, изобретатель',
  source: `Player's handbook`,
  description: `Выберите рукотворный металлический предмет, такой как металлическое оружие или комплект тяжелого или среднего доспеха, видимый в пределах дистанции. Вы делаете его раскаленным докрасна. Все существа, находящиеся в физическом контакте с этим предметом, получают урон огнём 2к8, когда вы накладываете это заклинание. Пока заклинание активно, вы можете бонусным действием в каждом последующем ходу вновь причинять этот урон. Если существо держит или носит предмет, и получает от него урон, оно должно преуспеть в спасброске Телосложения, иначе оно роняет этот предмет, если может. Если оно не может уронить предмет, то до начала вашего следующего хода совершает с помехой броски атаки и проверки характеристик.

  На больших уровнях. Если вы накладываете это заклинание, используя ячейку 3-го уровня или выше, урон увеличивается на 1к8 за каждый уровень ячейки выше второго.`,
});

character.addSpell({
  title: 'Раскалённый металл',
  vocal: ['ярык! аарык!'],
  somatic: 'на первое слово занесение руки, на второе резкое поднятие воображаемого металлического шара вверх',
  level: 2,
  school: 'преобразование',
  actionType: ' 1 действие',
  distance: '60 футов',
  components: 'В, С, М (кусок железа и пламя)',
  duration: 'Концентрация, вплоть до 1 минуты',
  classes: 'бард, друид, изобретатель',
  source: `Player's handbook`,
  description: `Выберите рукотворный металлический предмет, такой как металлическое оружие или комплект тяжелого или среднего доспеха, видимый в пределах дистанции. Вы делаете его раскаленным докрасна. Все существа, находящиеся в физическом контакте с этим предметом, получают урон огнём 2к8, когда вы накладываете это заклинание. Пока заклинание активно, вы можете бонусным действием в каждом последующем ходу вновь причинять этот урон. Если существо держит или носит предмет, и получает от него урон, оно должно преуспеть в спасброске Телосложения, иначе оно роняет этот предмет, если может. Если оно не может уронить предмет, то до начала вашего следующего хода совершает с помехой броски атаки и проверки характеристик.

  На больших уровнях. Если вы накладываете это заклинание, используя ячейку 3-го уровня или выше, урон увеличивается на 1к8 за каждый уровень ячейки выше второго.`,
});


renderCharacter(character);
