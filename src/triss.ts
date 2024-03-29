import { AbilityEnum } from './models/ability';
import { Action, ActionType } from './models/action';
import { Character } from './models/character';
import { SkillEnum } from './models/skill';
import { renderCharacter } from './render-functions';

const character: Character = new Character('Т`риссе', 'Хексблейд', 'Elf', 'Drow');

/*
18 (6+6+4) 16
9 (2+5+1) 8
19 (4+6+6) 16
12 (2+2+6) 10
17 (5+4+5) 14
17 (5+5+5) 15
*/
// hp rolls = 18 (7+3+5+3)
// Cloak of Protection
character.abilities.get(AbilityEnum.Strength)!.setValue(8);
character.abilities.get(AbilityEnum.Dexterity)!.setValue(14);
character.abilities.get(AbilityEnum.Constitution)!.setValue(16);
character.abilities
  .get(AbilityEnum.Intelligence)!
  .setValue(15 + 1);
character.abilities.get(AbilityEnum.Wisdom)!.setValue(10).setSavingThrowProficiency(true);
character.abilities
  .get(AbilityEnum.Charisma)!
  .setValue(16 + 2 + 1) // from Feat
  .setSavingThrowProficiency(true);
// drow
character.skills.get(SkillEnum.Perception)!.setProficiency(true);
// background
character.skills.get(SkillEnum.Insight)!.setProficiency(true);
character.skills.get(SkillEnum.Arcana)!.setProficiency(true);
// Warlock
character.skills.get(SkillEnum.Investigation)!.setProficiency(true);
character.skills.get(SkillEnum.Deception)!.setProficiency(true);

character.level = 8;
character.armor = 14 + character.dexMod;
character.speed = 30;
character.hitDie = 8;
character.hitLevelUpRolls = [7, 3, 5, 3, 8, 8, 3];
character.hpBonus = 10; // благословление Ориль
character.alignment = 'Хаотично нейтральный';
character.archetype = '';
character.weaponEnchantment = 2;

// 1 cantrip available
character.addAction(
  new Action('Большой Меч Договора', 'Ближнее', ActionType.Action, (character) => {
    const { chaMod, weaponEnchantment, proficiency } = character;
    const attack = chaMod + proficiency;
    // 2d6 => d6+6 из-за протеза
    return `+${attack + weaponEnchantment} КД, d6+${chaMod + weaponEnchantment + 6} режущий + Кара ${1 + 4}d8 силовой`;
  }),
);
character.addAction(
  new Action('Большой Меч Договора Сразмаху', '', ActionType.Action, (character) => {
    const { chaMod, weaponEnchantment, proficiency } = character;
    const attack = chaMod + proficiency;
    return `+${attack + weaponEnchantment - 5} КД, d6+${chaMod + weaponEnchantment + 10 + 6} режущий + Кара ${
      1 + 4
    }d8 силовой`;
  }),
);
character.addAction(
  new Action('Мистический Заряд × 2', '120', ActionType.Action, (character) => {
    const attack = character.chaMod + character.proficiency;
    return `+${attack + 2} КД, d10+${character.chaMod + 2} силовой`;
  }),
);
character.addAction(
  new Action('Волшебная рука', '30', ActionType.Action, (character) => {
    return `1 минута магическая рука помощница`;
  }),
);
character.addAction(
  new Action('Проклятье Хексблейда', '30', ActionType.BonusAction, (character) => {
    return `Crit on 19, 20; ${character.proficiency} bonus damage on hit; ${
      character.level + character.chaMod
    } heal on kill`;
  }),
);
character.addAction(
  new Action('Щит', 'На себя', ActionType.Reaction, (character) => {
    return `Бонус 5 КД до начала своего следующего хода`;
  }),
);
character.addAction(
  new Action('Туманный шаг', 'На себя', ActionType.BonusAction, (character) => {
    return `Окутавшись серебристым туманом, вы телепортируетесь на 30 футов в свободное пространство, видимое вами.`;
  }),
);

character.proficiencies = ['Легкая броня', 'Средняя броня', 'Простое оружие', 'Военное оружие', 'Щиты', 'Арфы'];

character.equipment = `
Чешуйчатая кольчуга, Арфа, Одежда путешественника, Рюкзак, Лом, Молот, 10 крючков,
10 факелов, Трутница, 10 дней пайка, Бурдюк с водой, 50 футов пеньковой веревки.<br>
<br>
<strong>Большой Чардалиновый Меч</strong><br>
Большой меч, редкий. <strong>Требуется настройка</strong><br>
У вас есть бонус +2 к атаке, атаке заклинаниями, урону и броскам на урон от заклинаний, сделанным этим магическим оружием или при использовании его в качестве фокусировки заклинаний.<br>
Удерживая этот меч, вы получаете дополнительную ячейку заклинаний колдуна в соответствии с вашим текущим уровнем ячейки заклинаний. Вы восставливаете эту ячейку заклинания после короткого или продолжительного отдыха.<br>
<br>
<strong>Заполярные сапоги</strong><br>
Чудесный предмет. <strong>Требуется настройка</strong><br>
Пока вы их носите, вы получаете следующие преимущества:
<ul>
<li>Вы получаете сопротивление урону холодом.</li>
<li>Вы игнорируете труднопроходимую местность, созданную льдом или снегом.</li>
<li>Вы нормально переносите температуру до −50 °F (−45 °C) без тёплой одежды. Если вы одеты в теплую одежду, то можете переносить температуру до −100 °F (−73 °C).</li>
</ul>
<br>
<strong>Протез</strong><br>
Один из кубиков урона максимальный
`;

// cantrips 3 + dancing lights + minor illusion
// el blast
// mage hand
// prestidigitation


// Shield
// Адское возмездие [Hellish rebuke]
// Flock of Familiars
// Misty Step
// Hunger of Hadar
// counterspell
// shadow of moil
// major image
// tongues

// Drow spells: dancing lights, faerie fire, darkness

// От дроу
character.addSpell({
  title: 'Пляшущие огоньки',
  vocal: ['льет скина', 'миркрид се хорфид'],
  somatic: 'Легкий проворот пальцем, кроме мизинца вытянутой руки',
  level: 0,
  school: 'воплощение',
  actionType: 'Действие',
  distance: '120 футов',
  components: 'В, С, М (кусочек фосфора, гнилушка или светлячок)',
  duration: 'Концентрация, вплоть до 1 минуты',
  classes: 'бард, волшебник, изобретатель, чародей',
  source: `Player's handbook`,
  description: `Вы создаете до четырёх огоньков размером с факел в пределах дистанции, делая их похожими на факелы, фонари или светящиеся сферы, парящие в воздухе. Вы можете также объединить четыре огонька в одну светящуюся человекоподобную фигуру Среднего размера. Какую бы форму вы ни выбрали, каждый огонёк излучает тусклый свет в радиусе 10 футов.

  Вы можете бонусным действием в свой ход переместить огоньки на 60 футов в новое место в пределах дистанции. Каждый огонёк должен находиться в пределах 20 футов от другого огонька, созданного этим заклинанием, и огонёк тухнет, если оказывается за пределами дистанции заклинания.`,
});

character.addSpell({
  title: 'Мистический Заряд',
  vocal: ['скветта', 'бликка'],
  somatic: 'Выброс кисти вперед, вместе с выкриком',
  level: 0,
  school: 'воплощение',
  actionType: 'Действие',
  distance: '120 футов',
  components: 'В, С',
  duration: 'Мгновенная',
  classes: 'колдун',
  source: `Player's handbook`,
  description: `К существу, находящемуся в пределах дистанции, устремляется луч потрескивающей энергии. Совершите дальнобойную атаку заклинанием по цели. При попадании цель получает урон силовым полем 1d10.

  Заклинание создаёт ещё один луч, когда вы достигаете больших уровней: два луча на 5-м уровне, три луча на 11-м уровне и четыре луча на 17-м уровне.
  
  Вы можете направить лучи в одну цель или в разные. Для каждого луча совершите свой бросок атаки.`,
});

// Из ведьмовского клинка
character.addSpell({
  title: 'Щит',
  vocal: ['фекья', 'виста'],
  somatic: 'Перекрещенные от себя ладони на уровне груди',
  level: 1,
  school: 'ограждение',
  actionType: 'реакция, совершаемая вами, когда по вам попадает атака или вы становитесь целью волшебной стрелы',
  distance: 'На себя',
  components: 'В, С',
  duration: '1 раунд',
  classes: 'волшебник, чародей',
  source: `Player's handbook`,
  description: `Невидимый барьер из магической силы появляется, защищая вас. Вы получаете до начала своего следующего хода бонус +5 к КД, в том числе и против вызвавшей срабатывание атаки, и вы не получаете урон от волшебной стрелы.`,
});


character.addSpell({
  title: 'Волшебная рука',
  vocal: ['свёрт хёнд'],
  somatic: 'Культя бейна приближенная к плечевому суставу',
  level: 0,
  school: 'вызов',
  actionType: 'Действие',
  distance: '30 футов',
  components: 'В, С',
  duration: '1 минута',
  classes: 'бард, волшебник, изобретатель, колдун, чародей',
  source: `Player's handbook`,
  description: `В точке, выбранной вами в пределах дистанции, появляется призрачная парящая рука. Рука существует, пока заклинание активно или пока вы не отпустите её действием. Рука исчезает, если окажется более чем в 30 футах от вас или если вы повторно наложите это заклинание.

  Вы можете действием контролировать руку. С её помощью вы можете манипулировать предметами, открывать незапертые двери и контейнеры, убирать предметы в открытые контейнеры и доставать их оттуда или выливать содержимое флаконов. При каждом использовании руки вы можете переместить её на 30 футов.
  
  Рука не может совершать атаки, активировать магические предметы и переносить более 10 фунтов (4,5 кг).`,
});

// Дроу
character.addSpell({
  title: 'Огонь Фей',
  vocal: ['квейкья и', 'слакаду а'],
  level: 1,
  school: 'воплощение',
  actionType: 'Действие',
  distance: '60 футов',
  components: 'В',
  duration: 'Концентрация, вплоть до 1 минуты',
  classes: 'бард, друид, изобретатель',
  source: `Player's handbook`,
  description: `Все предметы в кубе с длиной ребра 20 футов в пределах дистанции подсвечиваются синим, зелёным или фиолетовым цветом (на ваш выбор). Все существа в этой области тоже подсвечиваются, если проваливают спасбросок Ловкости. На время длительности заклинания подсвеченные предметы и существа испускают тусклый свет в радиусе 10 футов.

  Все броски атаки по затронутым существам и предметам совершаются с преимуществом, если атакующий видит их, и эти существа и предметы не получают преимуществ от невидимости.`,
});

character.addSpell({
  title: 'Туманный шаг',
  vocal: ['скреф', 'стёк'],
  level: 2,
  school: 'вызов',
  actionType: 'бонусное действие',
  distance: 'На себя',
  components: 'В',
  duration: 'Мгновенная',
  classes: 'волшебник, колдун, чародей',
  source: `Player's handbook`,
  description: `Окутавшись серебристым туманом, вы телепортируетесь на 30 футов в свободное пространство, видимое вами.`,
});

character.addSpell({
  title: 'Адское Возмездие',
  vocal: ['хефндарлога'],
  somatic: 'Перекрещенные козы тыльной стороной наружу на уровне груди',
  level: 1,
  school: 'воплощение',
  actionType: '1 реакция, совершаемая вами, когда вы получаете урон от существа, находящегося в пределах 60 футов от вас и видимого вами',
  distance: '60 футов',
  components: 'В, С',
  duration: 'Мгновенная',
  classes: 'колдун',
  source: `Player's handbook`,
  description: `Вы указываете пальцем, и существо, причинившее вам урон, мгновенно окружается пламенем. Существо должно совершить спасбросок Ловкости. Оно получает 2d10 урона огнём при провале, или половину этого урона при успехе.

  <strong>На больших уровнях.</strong> Если вы накладываете это заклинание, используя ячейку 2-го уровня или выше, урон увеличивается на 1d10 за каждый уровень ячейки выше первого.`,
});

character.addSpell({
  title: 'Контрзаклинание',
  somatic: 'Быстрый росчерк указательным пальцем вытянутой руки',
  level: 3,
  school: 'ограждение',
  actionType: '1 реакция, совершаемая вами, когда видимое вами существо в пределах 60 футов от вас накладывает заклинание',
  distance: '60 футов',
  components: 'С',
  duration: 'Мгновенная',
  classes: 'волшебник, колдун, чародей',
  source: `Player's handbook`,
  description: `Вы пытаетесь прервать процесс накладывания заклинания. Если существо накладывает заклинание 3-го уровня или ниже, его заклинание проваливается, и не оказывает никакого эффекта. Если оно накладывало заклинание 4-го уровня или выше, совершите проверку базовой характеристики. Сл равна 10 + уровень заклинания. В случае успеха заклинание проваливается и не оказывает никакого эффекта.

  <strong>На больших уровнях.</strong> Если вы накладываете это заклинание, используя ячейку 4-го уровня или выше, прерванное заклинание автоматически не оказывает эффекта, если его уровень не превышает уровень использованной вами ячейки.`,
});

// character.addSpell({
//   title: 'Поиск Фамильяра',
//   vocal: ['это заклинание для референса'],
//   level: 1,
//   school: 'вызов',
//   actionType: '1 час',
//   distance: '10 футов',
//   components: 'В, С, М (стоящие 10 зм уголь, благовония и травы, сжигаемые в огне в латунной жаровне)',
//   duration: 'Мгновенная',
//   classes: 'бард, волшебник, колдун, чародей',
//   source: `Player's handbook`,
//   description: `Вы получаете в услужение фамильяра — духа, принимающего облик выбранного вами животного: ворона, кошки, краба, крысы, летучей мыши, лягушки (жабы), морского конька, осьминога, паука, рыбы (пираньи), совы, куницы, ядовитой змеи, ястреба или ящерицы. Появившись в свободном пространстве в пределах дистанции, фамильяр приобретает характеристики выбранной формы, хотя он не Зверь, а Исчадие, Небожитель или Фея (по вашему выбору).

//   Ваш фамильяр действует независимо от вас, но всегда повинуется вашим командам. В сражении он определяет свою инициативу и действует в свой ход. Фамильяр не может атаковать, но может совершать другие действия как обычно.
  
//   Когда хиты фамильяра опускаются до 0, он исчезает, не оставляя физического тела. Он возвращается, когда вы используете это заклинание ещё раз. Вы можете действием временно отпустить своего фамильяра. Тот исчезает в карманном измерении, где будет ждать, пока вы его не призовете. В качестве альтернативы, вы можете отпустить его насовсем. Пока фамильяр временно отпущен, вы можете действием вернуть его в свободное пространство в пределах 30 футов от себя. Всякий раз, когда хиты фамильяра опускаются до 0 или он исчезает в карманном измерении, он оставляет в своём пространстве всё, во что он был одет или нёс.
  
//   Пока ваш фамильяр находится в пределах 100 футов, вы можете общаться с ним телепатически. Кроме того, в пределах этого же радиуса вы можете действием начать смотреть глазами фамильяра и слушать его ушами до начала своего следующего хода, получая преимущество от особых чувств, которыми может обладать фамильяр. В это время для своих собственных чувств вы слепы и глухи.
  
//   У вас не может быть больше одного фамильяра одновременно. Если вы накладываете это заклинание, уже имея фамильяра, вы заставляете принять его новый облик. Выберите один из описанных выше обликов. Ваш фамильяр становится этим существом.
  
//   Если вы накладываете заклинание с дистанцией «касание», его может передать фамильяр, как если бы это он его накладывал. Ваш фамильяр должен при этом находиться в пределах 100 футов от вас, и он использует свою реакцию, когда вы накладываете его. Если заклинание требует броска атаки, вы используете свой модификатор атаки.`,
// });

character.addSpell({
  title: 'Стая Фамильяров',
  vocal: ['инраш углуннар'],
  somatic: 'Хаба-хаба',
  level: 2,
  school: 'вызов',
  actionType: '1 минута',
  distance: 'Касание',
  components: 'В, С',
  duration: 'Концентрация, вплоть до 1 часа',
  classes: 'волшебник, колдун',
  source: `Lost Laboratory of Kwalish`,
  description: `Вы временно призываете трёх фамильяров — духов, которые принимают вид животных по вашему выбору. Каждый фамильяр следует правилам и опциям из заклинания поиск фамильяра. Все фамильяры, призванные этим заклинанием, должны быть одного выбранного вами вида (Исчадие, Небожитель или Фея). Если вы уже призвали фамильяра заклинанием поиск фамильяра или другим подобным заклинанием, то заклинание стая фамильяров призывает на одного фамильяра меньше.

  Призванные этим заклинанием фамильяры могут телепатически общаться с вами и делиться с вами видимой и слышимой информацией, пока они находятся в пределах 1 мили от вас.
  
  Если вы накладываете заклинание с дистанцией «касание», его может передать фамильяр по правилам заклинания поиск фамильяра. Однако вы можете передавать заклинание только через одного фамильяра за ход.
  
  <strong>На больших уровнях.</strong> Если вы накладываете это заклинание, используя ячейку 3-го уровня или выше, вы вызываете дополнительного фамильяра за каждый уровень ячейки выше второго.`,
});



character.addSpell({
  title: 'Голод Хадара',
  vocal: ['геймсмоксфискур', 'миркурхвар'],
  somatic: 'Две руки сверху и низу будто обхватывают сферу и мелдленно перебирают пальцами',
  level: 3,
  school: 'вызов',
  actionType: 'действие',
  distance: '150 футов',
  components: 'В, С, М (маринованное щупальце осьминога)',
  duration: 'Концентрация, вплоть до 1 минуты',
  classes: 'колдун',
  source: `Player's handbook`,
  description: `Вы открываете врата в межзвёздную тьму, область, населённую неизвестными кошмарами. Появляется сфера черноты и холода с радиусом 20 футов с центром на точке в пределах дистанции, существующая, пока активно заклинание. Эта пустота заполнена какофонией тихих шёпотов и хлюпающих шумов, которые слышно в пределах 30 футов. Никакой свет, ни магический, ни обычный, не может осветить эту местность, и существа, полностью находящиеся в этой области, ослеплены.

  Пустота создаёт искажения в ткани пространства, и её местность является труднопроходимой. Все существа, начинающие ход в этой местности, получают 2к6 урона холодом. Все существа, оканчивающие ход в этой местности, должны преуспеть в спасброске Ловкости, иначе получают 2к6 урона кислотой, так как к ним прикасаются бледные потусторонние щупальца.`,
});

character.addSpell({
  title: 'Тьма',
  vocal: ['фэла сиг ур угсин'],
  level: 2,
  school: 'воплощение',
  actionType: 'действие',
  distance: '60 футов',
  components: 'В, М (мех летучей мыши и либо капля дегтя, либо кусочек угля)',
  duration: 'Концентрация, вплоть до 10 минут',
  classes: 'волшебник, колдун, чародей',
  source: `Player's handbook`,
  description: `Из точки, выбранной вами в пределах дистанции, расползается магическая тьма сферой с радиусом 15 футов. Тьма огибает углы. Существа с тёмным зрением не могут видеть сквозь эту тьму, и немагический свет не может её осветить.

  Если выбранная вами точка находится на предмете, который вы держите или который никто не несёт и не носит, тьма исходит из предмета и перемещается вместе с ним. Если полностью накрыть источник тьмы непрозрачным предметом, например, чашей или шлемом, тьма будет заблокирована.
  
  Если часть зоны этого заклинания перекрывает часть зоны света, созданного заклинанием с уровнем не выше 2-го, заклинание, создавшее свет, рассеивается.`,
});

character.addSpell({
  title: 'Языки',
  vocal: ['тунгумалум'],
  level: 3,
  school: 'прорицание',
  actionType: 'действие',
  distance: 'касание',
  components: 'В, М (маленькая глиняная модель зиккурата)',
  duration: '1 час',
  classes: 'бард, волшебник, жрец, колдун, чародей',
  source: `Player's handbook`,
  description: `Это заклинание дарует существу, которого вы касаетесь, способность понимать все языки, которые оно слышит. Более того, когда цель говорит, все существа, знающие хотя бы один язык, и слышащие цель, понимают, что она сказала.`,
});

character.addSpell({
  title: 'Облачение Тени',
  vocal: ['эйнин меф миркри'],
  level: 4,
  school: 'некромантия',
  actionType: 'действие',
  distance: 'на себя',
  components: 'В, С, М (глазное яблоко Нежити, заключенное в драгоценный камень стоимостью не менее 150 зм)',
  duration: 'Концентрация, вплоть до 1 минуты',
  classes: 'колдун',
  source: `Xanathar's Guide to Everything`,
  description: `Пламевидные тени окутывают ваше тело на всё время действия заклинания, в результате чего вы становитесь сильно заслонённым для других. Тени превращают тусклый свет в пределах 10 футов от вас в темноту, а яркий свет в той же области — в тусклый свет.

  Вы получаете сопротивление урону излучением до окончания действия заклинания. Кроме того, всякий раз, когда существо, находящееся в пределах 10 футов от вас, попадает по вам рукопашной атакой, тени атакуют его, причиняя 2к8 урона некротической энергией.`,
});

character.addSpell({
  title: 'Образ',
  vocal: ['блекинг'],
  level: 3,
  school: 'иллюзия',
  actionType: 'действие',
  distance: '120 футов',
  components: 'В, С, М (кусок овечьей шерсти)',
  duration: 'Концентрация, вплоть до 10 минут',
  classes: 'бард, волшебник, колдун, чародей',
  source: `Player's handbook`,
  description: `Вы создаете образ предмета, существа или другого видимого явления, помещающийся в объеме в куб с длиной ребра 20 футов. Образ появляется в точке, которую вы видите в пределах дистанции, и существует, пока заклинание активно. Он выглядит абсолютно реальным, включая звук, запах и температуру, соответствующую образу. Вы не можете создать жар или холод, достаточный для получения урона; звук, громкость которого может причинить урон звуком или оглушить существо, или запах, способный вызвать тошноту (такую как вонь троглодита).

  Пока вы находитесь в пределах дистанции от иллюзии, вы можете действием заставить образ переместиться в любое место в пределах дистанции. Пока образ меняет местоположение, вы можете изменять его внешность, чтобы перемещение выглядело естественным. Например, если вы создаёте образ существа и перемещаете его, вы можете изменить образ, чтобы казалось, что оно идёт. Точно так же вы можете заставить иллюзию издавать в разное время разные звуки и даже заставлять её принимать участие в беседе, например.
  
  Физическое взаимодействие с образом даёт понять, что это иллюзия, потому что сквозь него всё проходит. Существа, исследующие образ действием, могут определить, что это иллюзия, совершив успешную проверку Интеллекта (Расследование) против Сл ваших заклинаний. Если существо распознаёт иллюзию, оно может видеть сквозь неё, и все прочие сенсорные эффекты иллюзии тоже притупляются.
  
  На больших уровнях. Если вы накладываете это заклинание, используя ячейку 6-го уровня или выше, оно длится, пока не рассеяно, не требуя от вас концентрацию.`,
});


renderCharacter(character);
