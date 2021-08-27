const ASIName = 'Ability Score Increase';

export class Race {
  public traits = new Map<string, string>();
  constructor(public race: string, public subrace?: string) {
    if (Object.prototype.hasOwnProperty.call(RacesData, race)) {
      const raceData = RacesData[race];
      this.populateTraits(raceData.Traits);
      if (Object.prototype.hasOwnProperty.call(raceData, 'Subrace')) {
        if (Object.prototype.hasOwnProperty.call(raceData.Subrace, subrace)) {
          const subraceData = raceData.Subrace[subrace];
          this.populateTraits(subraceData.Traits);
        }
      }
    }
  }

  private populateTraits(traits: IRace['Traits']): void {
    Object.keys(traits).forEach((traitName) => {
      let trait = traits[traitName];
      if (typeof trait === 'string') {
        if (traitName === ASIName && this.traits.has(ASIName)) {
          trait = `${this.traits.get(traitName)} ${trait}`;
        }
        this.traits.set(traitName, trait);
      }
    });
  }
}

export type ITrait = string | Record<string, string>[] | Record<string, string>

interface IRace {
  AbilityScores?: Record<string, number>;
  Traits: Record<string, ITrait>;
  Subrace?: Record<string, ISubrace>;
}

interface ISubrace extends IRace {
  Changes?: Record<string, string>;
}

const RacesData: Record<string, IRace> = {
  Aarakocra: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 2,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 1,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Dexterity score increases by 2, and your Wisdom score increases by 1.',
      Age: 'Aarakocra reach maturity by age 3. Compared to humans, aarakocra don’t usually live longer than 30 years.',
      Alignment:
        'Most aarakocra are good and rarely choose sides when it comes to law and chaos. Tribal leaders and warriors might be lawful, while explorers and adventurers might tend toward chaotic.',
      Size: 'Aarakocra are about 5 feet tall. They have thin, lightweight bodies that weigh between 80 and 100 pounds. Your size is Medium.',
      Speed: 'Your base walking speed is 25 feet.',
      Flight: 'You have a flying speed of 50 feet. To use this speed, you can’t be wearing medium or heavy armor.',
      Talons: 'You are proficient with your unarmed strikes, which deal 1d4 slashing damage on a hit.',
      Languages: 'You can speak, read, and write Common, Aarakocra, and Auran.',
    },
  },
  Aasimar: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 2,
    },
    Traits: {
      'Ability Score Increase': 'Your Charisma score increases by 2.',
      Age: 'Aasimar mature at the same rate as humans, but can live up to 160 years.',
      Alignment:
        'Imbued with celestial power, most aasimar are good. Outcast aasimar are most often neutral or even evil.',
      Size: 'Aasimar have the same range of height and weight as humans.',
      Speed: 'Your base walking speed is 30 feet.',
      Darkvision:
        "Blessed with a radiant soul, your vision can easily cut through darkness. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
      'Celestial Resistance': 'You have resistance to necrotic damage and radiant damage.',
      'Healing Hands':
        "As an action, you can touch a creature and cause it to regain a number of hit points equal to your level. Once you use this trait, you can't use it again until you finish a long rest.",
      'Light Bearer': 'You know the Light cantrip. Charisma is your spellcasting ability for it.',
      Languages: 'You can speak, read, and write Common, and Celestial.',
      Subrace:
        'Three subraces of aasimar exist: protector aasimar, scourge aasimar, and fallen aasimar. Choose one of them for your character.',
    },
    Subrace: {
      'Protector Aasimar': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 1,
          Charisma: 2,
        },
        Traits: {
          'Ability Score Increase': 'Your Wisdom score increases by 1.',
          'Radiant Soul':
            "Starting at 3rd level, you can use your action to unleash the divine energy within yourself, causing your eyes to glimmer and two luminous, incorporeal wings to sprout from your back. <dd>Your transformation lasts for 1 minute or until you end it as a bonus action. During it, you have a flying speed of 30 feet, and once on each of your turns, you can deal extra radiant damage to one target when you deal damage to it with an attack or a spell. The extra radiant damage equals your level.</dd><dd>Once you use this trait, you can't use it again until you finish a long rest.</dd>",
        },
      },
      'Scourge Aasimar': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 1,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 2,
        },
        Traits: {
          'Ability Score Increase': 'Your Constitution score increases by 1.',
          'Radiant Consumption':
            "Starting at 3rd level, you can use your action to unleash the divine energy within yourself, causing a searing light to radiate from you, pour out of your eyes and mouth, and threaten to char you.<dd>Your transformation lasts for 1 minute or until you end it as a bonus action. During it, you shed bright light in a 10-foot radius and dim light for an additional 10 feet, and at the end of each of your turns, you and each creature within 10 feet of you take radiant damage equal to half your level (rounded up). In addition, once on each of your turns, you can deal extra radiant damage to one target when you deal damage to it with an attack or a spell. The extra radiant damage equals your level.</dd><dd>Once you use this trait, you can't use it again until you finish a long rest.</dd>",
        },
      },
      'Fallen Aasimar': {
        AbilityScores: {
          Strength: 1,
          Dexterity: 0,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 2,
        },
        Traits: {
          'Ability Score Increase': 'Your Strength score increases by 1.',
          'Necrotic Shroud':
            "Starting at 3rd level, you can use your action to unleash the divine energy within yourself, causing your eyes to turn into pools of darkness and two skeletal, ghostly, flightless wings to sprout from your back. The instant you transform, other creatures within 10 feet of you that you can see you must each succeed on a Charisma saving throw (DC 8 + your proficiency bonus + your Charisma modifier) or become frightened of you until the end of your next turn.<dd>Your transformation lasts for 1 minute or until you end it as a bonus action. During it, once on each of your turns, you can deal extra necrotic damage to one target when you deal damage to it with an attack or a spell. The extra necrotic damage equals your level.</dd><dd>Once you use this trait, you can't use it again until you finish a long rest.</dd>",
        },
      },
      'Aasimar DMG': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 1,
          Charisma: 2,
        },
        Traits: {
          'Ability Score Increase': 'Your Wisdom score increases by 1, and your Charisma score increases by 2.',
          Age: 'Aasimar mature at the same rate as humans but live a few years longer.',
          Alignment:
            'Due to their celestial heritage, aasimar are often good. However, some aasimar fall into evil, rejecting their heritage.',
          'Celestial Legacy':
            'You know the Light cantrip. Once you reach 3rd level, you can cast the Lesser Restoration spell once with this trait, and you regain the ability to do so when you finish a long rest. Once you reach 5th level, you can cast the Daylight spell once with this spell as a 3rd level spell, and you regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
        Changes: {
          'Ability Score Increase': 'Your Charisma score increases by 2.',
          Age: 'Aasimar mature at the same rate as humans, but can live up to 160 years.',
          Alignment:
            'Imbued with celestial power, most aasimar are good. Outcast aasimar are most often neutral or even evil.',
          'Healing Hands':
            "As an action, you can touch a creature and cause it to regain a number of hit points equal to your level. Once you use this trait, you can't use it again until you finish a long rest.",
          'Light Bearer': 'You know the Light cantrip. Charisma is your spellcasting ability for it.',
          Subrace:
            'Three subraces of aasimar exist: protector aasimar, scourge aasimar, and fallen aasimar. Choose one of them for your character.',
        },
      },
    },
  },
  Bugbear: {
    AbilityScores: {
      Strength: 2,
      Dexterity: 1,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Strength score increases by 2, and your Dexterity score increases by 1.',
      Age: 'Bugbears reach adulthood at age 16 and live up to 80 years.',
      Alignment:
        'Bugbears endure a harsh existence that demands each of them to remain self-sufficient, even at the expense of their fellows. They tend to be chaotic evil.',
      Size: 'Bugbears are between 6 and 8 feet tall and weigh between 250 and 350 pounds. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      Darkvision:
        "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
      'Long-Limbed': 'When you make a melee attack on your turn, your reach for it is 5 feet greater than normal.',
      'Powerful Build':
        'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
      Sneaky: 'You are proficient in the Stealth skill.',
      'Surprise Attack':
        'If you surprise a creature and hit it with an attack on your first turn in combat, the attack deals an extra 2d6 damage to it. You can use this trait only once per combat.',
      Languages: 'You can speak, read, and write Common and Goblin.',
    },
  },
  Centaur: {
    AbilityScores: {
      Strength: 2,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 1,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Strength score increases by 2, and your Wisdom score increases by 1.',
      Age: 'Centaurs mature and age at about the same rate as humans.',
      Alignment:
        'Centaurs are inclined toward neutrality. Those who join the Selesnya are more often neutral good, while those who join the Gruul are typically chaotic neutral.',
      Size: 'Centaurs stand between 6 and 7 feet tall, with their equine bodies reaching about 4 feet at the withers. Your size is Medium.',
      Speed: 'Your base walking speed is 40 feet.',
      Fey: 'Your creature type is fey, rather than humanoid.',
      Charge:
        'If you move at least 30 feet straight toward a target and then hit it with a melee weapon attack on the same turn, you can immediately follow that attack with a bonus action, making one attack against the target with your hooves.',
      Hooves:
        'Your hooves are natural melee weapons, which you can use to make unarmed strikes. If you hit with them, you deal bludgeoning damage equal to 1d4 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.',
      'Equine Build':
        'You count as one size larger when determining your carrying capacity and the weight you can push or drag.<dd>In addition, any climb that requires hands and feet is especially difficult for you because of your equine legs. When you make such a climb, each foot of movement costs you 4 extra feet, instead of the normal 1 extra foot.</dd>',
      Survivor:
        'You have proficiency in one of the following skills of your choice: Animal Handling, Medicine, Nature, or Survival.',
      Languages:
        'You can speak, read, and write Common and Sylvan. Sylvan is widely spoken in the Selesnya Conclave, for it is rich in vocabulary to describe natural phenomena and spiritual forces.',
    },
  },
  Changeling: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 2,
    },
    Traits: {
      'Ability Score Increase':
        'Your Charisma score increases by 2. In addition, one other ability score of your choice increases by 1. (Errata: No longer allow +3 Charisma)',
      Age: 'Changelings mature slightly faster than humans but share a similar lifespan - typically a century or less. While a changeling can transform to conceal their age, the effects of aging affect them similarly to humans.',
      Alignment: 'Changelings tend toward pragramatic neutrality, and few changelings embrace evil.',
      Size: 'Your size is Medium. To set your height and weight randomly, start with rolling a size modifier.<dd>Size modifier = 2d4.</dd><dd>Height = 5 feet + 1 inch + your size modifier in inches.</dd><dd>Weight in pounds = 115 + (2d4 x your size modifier)</dd>',
      Speed: 'Your base walking speed is 30 feet.',
      Shapechanger:
        "As an action, you can change your appearance and your voice. You determine the specifics of the changes, including your coloration, hair length, and sex. You can also adjust your height and weight, but not so much that your size changes. You can make yourself appear as a member of another race, though none of your game statistics change. You can't duplicate the appearance of a creature you've never seen, and you must adopt a form that has the same basic arrangement of limbs that you have. Your clothing and equipment aren't changed by this trait.<dd>You stay in this new form until you use an action to revert to your true form or until you die.</dd>",
      'Changeling Instincts':
        'You gain proficiency with  two of the following skills of your choice: Deception, Insight, Intimidation, and Persuasion.',
      Languages: 'You can speak, read, and write Common and two other languages of your choice.',
    },
  },
  Dragonborn: {
    AbilityScores: {
      Strength: 2,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 1,
    },
    Traits: {
      'Ability Score Increase': 'Your Strength score increases by 2, and your Charisma score increases by 1.',
      Age: 'Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.',
      Alignment:
        'Dragonborn tend to extremes, making a conscious choice for one side or the other in the cosmic war between good and evil (represented by Bahamut and Tiamat, respectively). Most dragonborn are good, but those who side with Tiamat can be terrible villains.',
      Size: 'Dragonborn are taller and heavier than humans, standing well over 6 feet tall and averaging almost 250 pounds. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      'Breath Weapon':
        'You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level. After you use your breath weapon, you can&#039;t use it again until you complete a short or long rest.',
      'Damage Resistance': 'You have resistance to the damage type associated with your draconic ancestry.',
      Languages:
        'You can speak, read, and write Common and Draconic. Draconic is thought to be one of the oldest languages and is often used in the study of magic. The language sounds harsh to most other creatures and includes numerous hard consonants and sibilants.',
      'Draconic Ancestry':
        'You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type, as shown in the table.',
      Types: [
        {
          tdata1: 'Black',
          tdata2: 'Acid',
          tdata3: '5 by 30 ft. line (Dex. save)',
        },
        {
          tdata1: 'Blue',
          tdata2: 'Lightning',
          tdata3: '5 by 30 ft. line (Dex. save)',
        },
        {
          tdata1: 'Brass',
          tdata2: 'Fire',
          tdata3: '5 by 30 ft. line (Dex. save)',
        },
        {
          tdata1: 'Bronze',
          tdata2: 'Lightning',
          tdata3: '5 by 30 ft. line (Dex. save)',
        },
        {
          tdata1: 'Copper',
          tdata2: 'Acid',
          tdata3: '5 by 30 ft. line (Dex. save)',
        },
        {
          tdata1: 'Gold',
          tdata2: 'Fire',
          tdata3: '15 ft. cone (Dex. save)',
        },
        {
          tdata1: 'Green',
          tdata2: 'Poison',
          tdata3: '15 ft. cone (Con. save)',
        },
        {
          tdata1: 'Red',
          tdata2: 'Fire',
          tdata3: '15 ft. cone (Dex. save)',
        },
        {
          tdata1: 'Silver',
          tdata2: 'Cold',
          tdata3: '15 ft. cone (Con. save)',
        },
        {
          tdata1: 'White',
          tdata2: 'Cold',
          tdata3: '15 ft. cone (Con. save)',
        },
      ],
    },
  },
  Dwarf: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 2,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Constitution score increases by 2.',
      Age: 'Dwarves mature at the same rate as humans, but they&#039;re considered young until they reach the age of 50. On average, they live about 350 years.',
      Alignment:
        'Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the benefits of a just order.',
      Size: 'Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium.',
      Speed: 'Your base walking speed is 25 feet. Your speed is not reduced by wearing heavy armor.',
      Darkvision:
        'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can&#039;t discern color in darkness, only shades of gray.',
      'Dwarven Resilience':
        'You have advantage on saving throws against poison, and you have resistance against poison damage.',
      'Dwarven Combat Training': 'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.',
      'Tool Proficiency':
        'You gain proficiency with the artisan&#039;s tools of your choice: smith&#039;s tools, brewer&#039;s supplies, or mason&#039;s tools.',
      Stonecunning:
        'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.',
      Languages:
        'You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.',
    },
    Subrace: {
      'Hill Dwarf': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 2,
          Intelligence: 0,
          Wisdom: 1,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Wisdom score increases by 1.',
          'Dwarven Toughness':
            'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.',
        },
      },
      'Mountain Dwarf': {
        AbilityScores: {
          Strength: 2,
          Dexterity: 0,
          Constitution: 2,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Strength score increases by 2.',
          'Dwarven Armor Training': 'You have proficiency with light and medium armor.',
        },
      },
      Duergar: {
        AbilityScores: {
          Strength: 1,
          Dexterity: 0,
          Constitution: 2,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Strength score increases by 1.',
          'Superior Darkvision': 'Your darkvision has a radius of 120 feet.',
          'Extra Language': 'You can speak, read, and write Undercommon.',
          'Duergar Resilience':
            'You have advantage on saving throws against illusions and against being charmed or paralyzed.',
          'Duergar Magic':
            "When you reach 3rd level, you can cast the Enlarge/Reduce spell on yourself once with this trait, using only the spell's enlarge option. When you reach 5th level, you can cast the Invisibility spell on yourself once with this trait. You don't need material components for either spell, and you can't cast them while you're in direct sunlight, although sunlight has no effect on them once cast. You regain the ability to cast these spells with this trait when you finish a long rest. Intelligence is your spellcasting ability for these spells.",
          'Sunlight Sensitivity':
            'You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.',
        },
      },
      'Dragonmark of Warding': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 2,
          Intelligence: 1,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Intelligence score increases by 1.',
          "Warder's Intuition":
            "When you make an Intelligence (Investigation) check or an ability check using thieves' tools, you can roll a d4 and add the number rolled to the ability check.",
          'Wards and Seals':
            "You can cast the <i>Alarm</i> and <i>Mage Armor</i> spells with this trait. Starting at 3rd level, you can also cast the <i>Arcane Lock</i> spell with it. Once you cast any of these spells with this trait, you can't cast that spell with it again until you finish a long rest. Intelligence is your spellcasting ability for these spells, and you don't need material components for them when you cast them with this trait.",
          'Spells of the Mark':
            'If you have the Spellcasting or the Pact Magic class feature, the spells on the Mark of Warding Spells table are added to the spell list of your spellcasting class.',
          Types: [
            {
              tdata1: '1st',
              tdata2: 'Alarm, Armor of Agathys',
            },
            {
              tdata1: '2nd',
              tdata2: 'Arcane Lock, Knock',
            },
            {
              tdata1: '3rd',
              tdata2: 'Glyph of Warding, Magic Circle',
            },
            {
              tdata1: '4th',
              tdata2: "Leomund's Secret Chest, Mordenkainen's Faithful Hound",
            },
            {
              tdata1: '5th',
              tdata2: 'Antilife Shell',
            },
          ],
        },
      },
    },
  },
  Elf: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 2,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Dexterity score increases by 2.',
      Age: 'Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old.',
      Alignment:
        'Elves love freedom, variety, and self-expression, so they lean strongly toward the gentler aspects of chaos. They value and protect others&#039; freedom as well as their own, and they are more often good than not. The drow are an exception; their exile into the Underdark has made them vicious and dangerous. Drow are more often evil than not.',
      Size: 'Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      Darkvision:
        'Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can&#039;t discern color in darkness, only shades of gray.',
      'Keen Senses': 'You have proficiency in the Perception skill.',
      'Fey Ancestry':
        'You have advantage on saving throws against being charmed, and magic can&#039;t put you to sleep.',
      Trance:
        'Elves don&#039;t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is &quot;trance.&quot;) While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.',
      Languages:
        'You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires.',
    },
    Subrace: {
      'High Elf': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 0,
          Intelligence: 1,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your intelligence score increases by 1.',
          'Elf Weapon Training': 'You have proficiency with the longsword, shortsword, shortbow, and longbow.',
          Cantrip:
            'You know one Cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.',
          'Extra Language': 'You can speak, read, and write one extra language of your choice.',
        },
      },
      'Wood Elf': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 1,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Wisdom score increases by 1.',
          'Elf Weapon Training': 'You have proficiency with the longsword, shortsword, shortbow, and longbow.',
          'Fleet of Foot': 'Your base walking speed increases to 35 feet.',
          'Mask of the Wild':
            'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.',
        },
      },
      Eladrin: {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 0,
          Intelligence: 1,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Intelligence score increases by 1.',
          'Elf Weapon Training': 'You have proficiency with the longsword, shortsword, shortbow, and longbow.',
          'Fey Step':
            'You can cast the Misty Step spell once using this trait. You regain the ability to do so when you finish a short or long rest.',
        },
      },
      'Eladrin MToF': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 1,
        },
        Traits: {
          'Ability Score Increase': 'Your Charisma score increases by 1.',
          'Changing with the Seasons':
            'Some eladrin remain associated with a particular season for their entire lives, whereas other eladrin transform, adopting characteristics of a new season. When finishing a long rest, any eladrin can change their season.',
          'Fey Step':
            "As a bonus action, you can magically teleport up to 30 feet to an unoccupied space you can see. Once you use this trait, you can't do so again until you finish a short or long rest. <dd>When you reach 3rd level, your Fey Step gains an additional effect based on your season; if the effect requires a saving throw, the DC equals 8 + your proficiency bonus + your Charisma modifier:</dd><br><dd><i>Autumn:</i> Immediately after you use your Fey Step, up to two creatures of your choice that you can see within 10 feet of you must succeed on a Wisdom saving throw or be charmed by you for 1 minute, or until you or your companions deal any damage to it.</dd><dd><i>Winter:</i> When you use your Fey Step, one creature of your choice that you can see within 5 feet of you before you teleport must succeed on a Wisdom saving throw or be frightened of you until the end of your next turn.</dd><dd><i>Spring:</i> When you use your Fey Step, you can touch one willing creature within 5 feet of you. That creature then teleports instead of you, appearing in an unoccupied space of your choice that you can see within 30 feet of you.</dd><dd><i>Summer:</i> Immediately after you use your Fey Step, each creature of your choice that you can see within 5 feet of you take fire damage equal to your Charisma modifier (minimum of 1 damage).</dd>",
        },
      },
      Drow: {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 1,
        },
        Traits: {
          'Ability Score Increase': 'Your Charisma score increases by 1.',
          'Superior Darkvision': 'Your darkvision has a radius of 120 feet.',
          'Sunlight Sensitivity':
            'You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.',
          'Drow Magic':
            'You know the Dancing Lights cantrip. When you reach 3rd level, you can cast the Faerie Fire spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can also cast the Darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
          'Drow Weapon Training': 'You have proficiency with rapiers, shortswords, and hand crossbows.',
        },
        Changes: {
          Darkvision:
            'Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can&#039;t discern color in darkness, only shades of gray.',
        },
      },
      'Sea Elf': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 1,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Constitution score increases by 1.',
          'Sea Elf Training': 'You have proficiency with the spear, trident, light crossbow, and net.',
          'Child of the Sea': 'You have a swimming speed of 30 feet, and you can breathe air and water.',
          'Friend of the Sea':
            'Using gestures and sounds, you can communicate simple ideas with any beast that has an innate swimming speed.',
          Languages: 'You can speak, read, and write Aquan.',
        },
      },
      'Shadar-Kai': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 1,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Constitution score increases by 1.',
          'Necrotic Resistance': 'You have resistance to necrotic damage.',
          'Blessing of the Raven Queen':
            "As a bonus action, you can magically teleport up to 30 feet to an unoccupied space you can see. Once you use this trait, you can't do so until you finish a long rest.<dd>Starting at 3rd level, you also gain resistance to all damage when you teleport using this trait. The resistance lasts until the start of your next turn. During that time, you appear ghostly and translucent.</dd>",
        },
      },
      'Dragonmark of Shadow': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 1,
        },
        Traits: {
          'Ability Score Increase': 'Your Charisma score increases by 1.',
          'Cunning Intuition':
            'When you make an Charisma (Performance) or Dexterity (Stealth) check, you can roll a d4 and add the number rolled to the ability check.',
          'Shape Shadows':
            'You can cast the <i>Minor Illusion</i> cantrip. Starting at 3rd level, you can cast the <i>Invisibility</i> spell once with this trait, and you regain the ability to cast it when you finish a long rest. Charisma is your spellcasting ability for these spells.',
          'Spells of the Mark':
            'If you have the Spellcasting or the Pact Magic class feature, the spells on the Mark of Shadow Spells table are added to the spell list of your spellcasting class.',
          Types: [
            {
              tdata1: '1st',
              tdata2: 'Disguise Self, Silent Image',
            },
            {
              tdata1: '2nd',
              tdata2: 'Darkness, Pass Without Trace',
            },
            {
              tdata1: '3rd',
              tdata2: 'Clairvoyance, Major Image',
            },
            {
              tdata1: '4th',
              tdata2: 'Greater Invisibility, Hallucinatory Terrain',
            },
            {
              tdata1: '5th',
              tdata2: 'Mislead',
            },
          ],
        },
      },
    },
  },
  Firbolg: {
    AbilityScores: {
      Strength: 1,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 2,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Wisdom score increases by 2, and your Strength score increases by 1.',
      Age: 'As humanoids related to the fey, firbolg have long lifespans. A firbolg reaches adulthood around 30, and the oldest of them can live for 500 years.',
      Alignment:
        'As people who follow the rhythm of nature and see themselves as its caretakers, firbolg are typically neutral good. Evil firbolg are rare and are usually the sworn enemies of the rest of their kind.',
      Size: 'Firbolg are between 7 and 8 feet tall and weigh between 240 and 300 pounds. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      'Firbolg Magic':
        "You can cast Detect Magic and Disguise Self with this trait, using Wisdom as your spellcasting ability for them. Once you cast either spell, you can't cast it again with this trait until you finish a short or long rest. When you use this version of Disguise Self, you can seem up to 3 feet shorter than normal, allowing you to more easily blend in with humans and elves.",
      'Hidden Step':
        "As a bonus action, you can magically turn invisible until the start of your next turn or until you attack, make a damage roll, or force someone to make a saving throw. Once you use this trait, you can't use it again until you finish a short or long rest.",
      'Powerful Build':
        'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
      'Speech of Beast and Leaf':
        'You have the ability to communicate in a limited manner with beasts and plants. They can understand the meaning of your words, though you have no special ability to understand them in return. You have advantage on all Charisma checks you make to influence them.',
      Languages: 'You can speak, read, and write Common, Elvish, and Giant.',
    },
  },
  Genasi: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 2,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Constitution score increases by 2.',
      Age: 'Genasi mature at about the same rate as humans and reach adulthood in their late teens. They live somewhat longer than humans do, up to 120 years.',
      Alignment: 'Independent and self-reliant, genasi tend toward a neutral alignment.',
      Size: 'Genasi are as varied as their mortal parents but are generally built like humans, standing anywhere from 5 feet to over 6 feet tall. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      Languages:
        'You can speak, read, and write Common and Primordial. Primordial is a guttural language, filled with harsh syllables and hard consonants.',
    },
    Subrace: {
      'Air Genasi': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 1,
          Constitution: 2,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Dexterity score increases by 1.',
          'Unending Breath': 'You can hold your breath indefinitely while you’re not incapacitated.',
          'Mingle with the Wind':
            'You can cast the levitate spell once with this trait, requiring no material components, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for this spell.',
        },
      },
      'Earth Genasi': {
        AbilityScores: {
          Strength: 1,
          Dexterity: 0,
          Constitution: 2,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Strength score increases by 1.',
          'Earth Walk':
            'You can move across difficult terrain made of earth or stone without expending extra movement.',
          'Merge with Stone':
            'You can cast the pass without trace spell once with this trait, requiring no material components, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for this spell.',
        },
      },
      'Fire Genasi': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 2,
          Intelligence: 1,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Intelligence score increases by 1.',
          Darkvision:
            'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. Your ties to the Elemental Plane of Fire make your darkvision unusual: everything you see in darkness is in a shade of red.',
          'Fire Resistance': 'You have resistance to fire damage.',
          'Reach to the Blaze':
            'You know the Produce Flame cantrip. Once you reach 3rd level, you can cast the burning hands spell once with this trait as a 1st-level spell, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for these spells.',
        },
      },
      'Water Genasi': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 2,
          Intelligence: 0,
          Wisdom: 1,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Wisdom score increases by 1.',
          'Acid Resistance': 'You have resistance to acid damage.',
          Amphibious: 'You can breathe air and water.',
          Swim: 'You have a swimming speed of 30 feet.',
          'Call to the Wave':
            'You know the shape water cantrip (see chapter 2 EEPC). When you reach 3rd level, you can cast the create or destroy water spell as a 2nd-level spell once with this trait, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for these spells.',
        },
      },
    },
  },
  Gith: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 1,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Intelligence score increases by 1.',
      Age: 'Gith reach adulthood in their late teens and live for about a century.',
      Size: 'Gith are taller and leaner than humans, with most a slender 6 feet in height.',
      Speed: 'Your base walking speed is 30 feet.',
      Languages: 'You can speak, read, and write Common and Gith.',
    },
    Subrace: {
      Githyanki: {
        AbilityScores: {
          Strength: 2,
          Dexterity: 0,
          Constitution: 0,
          Intelligence: 1,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Strength score increases by 2.',
          Alignment:
            'Githyanki tend toward lawful evil. They are aggressive and arrogant, and they remain the faithful servants of their lich-queen, Vlaakith. Renegade githyanki tend toward chaos.',
          'Decadent Mastery':
            "You learn one language of your choice, and you are proficient with one skill or tool of your choice. In the timeless city of Tu'narath, githyanki have bountiful time to master odd bits of knowledge.",
          'Martial Prodigy':
            'You are proficient with light and medium armor and with shortswords, longswords, and greatswords.',
          'Githyanki Psionics':
            "You know the Mage Hand cantrip and the hand is invisible when you cast the cantrip with this trait.<dd>When you reach 3rd level, you can cast the Jump spell once with this trait, and you regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the Misty Step spell once with this trait and you regain the ability to do so when you finish a long rest.</dd><dd>Intelligence is your spellcasting ability for these spells. When you cast them with this trait, they don't require components.</dd>",
        },
      },
      Githzerai: {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 0,
          Intelligence: 1,
          Wisdom: 2,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Wisdom score increases by 2.',
          Alignment:
            'Githzerai tend toward lawful neutral. Their rigorous training in psychic abilities requires an implacable mental discipline.',
          'Mental Discipline':
            'You have advantage on saving throws against the charmed and frightened conditions. Under the tutelage of monastic masters, githzerai learn to govern their own minds.',
          'Githzerai Psionics':
            "You know the Mage Hand cantrip and the hand is invisible when you cast the cantrip with this trait.<dd>When you reach 3rd level, you can cast the Shield spell once with this trait, and you regain the ability to do so after you finish a long rest. When you reach 5th level, you can cast the Detect Thoughts spell once with this trait, and you regain the ability to do so when you finish a long rest.</dd><dd>Wisdom is your spellcasting ability for these spells. When you cast them with this trait, they don't require components.</dd>",
        },
      },
    },
  },
  Gnome: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 2,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Intelligence score increases by 2.',
      Age: 'Gnomes mature at the same rate humans do, and most are expected to settle down into an adult life by around age 40. They can live 350 to almost 500 years.',
      Alignment:
        'Gnomes are most often good. Those who lend toward law are sages, engineers, researchers, scholars, investigators, or inventors. Those who lend toward chaos are minstrels, tricksters, wanderers, or fanciful jewelers. Gnomes are good-hearted, and even the tricksters among them are more playful than vicious.',
      Size: 'Gnomes are between 3 and 4 feet tall and average about 40 pounds. Your size is Small.',
      Speed: 'Your base walking speed is 25 feet.',
      Darkvision:
        'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can&#039;t discern color in darkness, only shades of gray.',
      'Gnome Cunning': 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.',
      Languages:
        'You can speak, read, and write Common and Gnomish. The Gnomish language, which uses the Dwarvish script, is renowned for its technical treatises and its catalogs of knowledge about the natural world.',
    },
    Subrace: {
      'Forest Gnome': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 1,
          Constitution: 0,
          Intelligence: 2,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Dexterity score increases by 1.',
          'Natural Illusionist':
            'You know the Minor Illusion cantrip. Intelligence is your spellcasting ability for it.',
          'Speak with Small Beasts':
            'Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest gnomes love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other creatures as beloved pets.',
        },
      },
      'Rock Gnome': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 1,
          Intelligence: 2,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Constitution score increases by 1.',
          'Artificer&#039;s Lore':
            'Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.',
          Tinker:
            'You have proficiency with artisan&#039;s tools (tinker&#039;s tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time. When you create a device, choose one of the following options:',
          Types: {
            'Clockwork Toy':
              'This toy is a clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It makes noises as appropriate to the creature it represents.',
            'Fire Starter':
              'The device produces a miniature flame, which you can use to light a candle, torch, or campfire. Using the device requires your action.',
            'Music Box':
              'When opened, this music box plays a single song at a moderate volume. The box stops playing when it reaches the song&#039;s end or when it is closed.',
          },
        },
      },
      'Deep Gnome': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 1,
          Constitution: 0,
          Intelligence: 2,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          Age: 'Deep gnomes are short-lived for gnomes. They mature at the same rate humans do and are considered full-grown adults by 25. They live 200 to 250 years, although hard toil and the dangers of the Underdark often claim them before their time.',
          Alignment:
            'Svirfneblin believe that survival depends on avoiding entanglements with other creatures and not making enemies, so they favor neutral alignments. They rarely wish others ill, and they are unlikely to take risks on behalf of others.',
          Size: 'A typical svirfneblin stands about 3 to 3½ feet tall and weighs 80 to 120 pounds. Your size is Small.',
          'Ability Score Increase': 'Your Dexterity score increases by 1.',
          'Superior Darkvision': 'Your darkvision has a radius of 120 feet.',
          'Stone Camouflage': 'You have advantage on Dexterity (Stealth) checks to hide in rocky terrain.',
          'Extra Language': 'You can speak, read, and write Undercommon.',
          'Optional Feat: Svirfneblin Magic':
            'You have inherited the innate spellcasting ability of your ancestors. This ability allows you to cast Nondetection on yourself at will, without needing a material component. You can also cast each of the following spells once with this ability: Blindness/Deafness, Blur, and Disguise Self. You regain the ability to cast these spells when you finish a long rest.',
        },
        Changes: {
          Age: 'Gnomes mature at the same rate humans do, and most are expected to settle down into an adult life by around age 40. They can live 350 to almost 500 years.',
          Alignment:
            'Gnomes are most often good. Those who lend toward law are sages, engineers, researchers, scholars, investigators, or inventors. Those who lend toward chaos are minstrels, tricksters, wanderers, or fanciful jewelers. Gnomes are good-hearted, and even the tricksters among them are more playful than vicious.',
          Size: 'Gnomes are between 3 and 4 feet tall and average about 40 pounds. Your size is Small.',
        },
      },
      'Dragonmark of Scribing': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 0,
          Intelligence: 2,
          Wisdom: 0,
          Charisma: 1,
        },
        Traits: {
          'Ability Score Increase': 'Your Charisma score increases by 1.',
          'Gifted Scribe':
            "When you make an Intelligence (History) check or an ability check using calligrapher's supplies, you can roll a d4 and add the number rolled to the ability check.",
          "Scribe's Insight":
            'You can cast the <i>Message</i> cantrip. You can also cast the <i>Comprehend Languages</i> once with this trait, and you regain the ability to cast it when you finish a short or long rest. Starting at 3rd level, you can cast the <i>Magic Mouth</i> spell with this trait, and you regain the ability to cast it when you finish a long rest. Intelligence is your spellcasting ability for these spells.',
          'Spells of the Mark':
            'If you have the Spellcasting or the Pact Magic class feature, the spells on the Mark of Scribing Spells table are added to the spell list of your spellcasting class.',
          Types: [
            {
              tdata1: '1st',
              tdata2: 'Comprehend Languages, Illusory Script',
            },
            {
              tdata1: '2nd',
              tdata2: 'Animal Messenger, Silence',
            },
            {
              tdata1: '3rd',
              tdata2: 'Sending, Tongues',
            },
            {
              tdata1: '4th',
              tdata2: 'Arcane Eye, Confusion',
            },
            {
              tdata1: '5th',
              tdata2: 'Dream',
            },
          ],
        },
      },
    },
  },
  Goblin: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 2,
      Constitution: 1,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Dexterity score increases by 2, and your Constitution score increases by 1.',
      Age: 'Goblins reach adulthood at age 8 and live up to 60 years.',
      Alignment:
        'Goblins are typically neutral evil, as they care only for their own needs. A few goblins might tend toward good or neutrality, but only rarely.',
      Size: 'Goblins are between 3 and 4 feet tall and weigh between 40 and 80 pounds. Your size is Small.',
      Speed: 'Your base walking speed is 30 feet.',
      Darkvision:
        'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can&#039;t discern color in darkness, only shades of gray.',
      'Fury of the Small':
        "When you damage a creature with an attack or a spell and the creature's size is larger than yours, you can cause the attack or spell to deal extra damage to the creature. The extra damage equals your level. Once you use this trait, you can't use it again until you finish a short or long rest.",
      'Nimble Escape': 'You can take the Disengage or Hide action as a bonus action of each of your turns.',
      Languages:
        'You can speak, read, and write Common and Goblin. In Ravnica, Goblin is a simplistic language with a limited vocabulary and fluid rules of grammar, unsuited to any sophisticated conversation.',
    },
  },
  Goliath: {
    AbilityScores: {
      Strength: 2,
      Dexterity: 0,
      Constitution: 1,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Strength score increases by 2, and your Constitution score increases by 1.',
      Age: 'Goliaths have lifespans comparable to humans. They enter adulthood in their late teens and usually live less than a century.',
      Alignment:
        'Goliath society, with its clear roles and tasks, has a strong lawful bent. The goliath sense of fairness, balanced with an emphasis on self-sufficiency and personal accountability, pushes them toward neutrality.',
      Size: 'Goliaths are between 7 and 8 feet tall and weigh between 280 and 340 pounds. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      'Natural Athlete': 'You have proficiency in the Athletics skill.',
      "Stone's Endurance":
        'You can focus yourself to occasionally shrug off injury. When you take damage, you can use your reaction to roll a d12. Add your Constitution modifier to the number rolled, and reduce the damage by that total. After you use this trait, you can’t use it again until you finish a short or long rest.',
      'Powerful Build':
        'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
      'Mountain Born':
        'You have resistance to cold damage. You’re acclimated to high altitude, including elevations above 20,000 feet. You’re also naturally adapted to cold climates, as described in chapter 5 of the Dungeon Master’s Guide. (Errata: Added cold resistance)',
      Languages: 'You can speak, read, and write Common and Giant.',
    },
  },
  Grung: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 2,
      Constitution: 1,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Please Support the Charity':
        "The Grung is part of a charity package of which all proceeds go to the Extra Life charity, supporting children's hospitals.<dd>Buy the package <a href='https://www.dmsguild.com/product/223738' target='_blank'>here</a> and support the charity!</dd><dd>Learn more about the Extra Life Charity <a href='https://www.extra-life.org/index.cfm?fuseaction=cms.page&id=1306' target='_blank'>here.</a></dd><dd>Check out and join the D&D Team <a href='https://www.extra-life.org/index.cfm?fuseaction=donordrive.team&teamID=56177' target='_blank'>here.</a></dd><dd>Or donate through my page <a href='https://www.extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=453150' target='_blank'>here.</a></dd>",
    },
  },
  HalfElf: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 2,
    },
    Traits: {
      'Ability Score Increase':
        'Your Charisma score increases by 2, and two other ability scores of your choice increase by 1.',
      Age: 'Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much longer than humans, however, often exceeding 180 years.',
      Alignment:
        'Half-elves share the chaotic bent of their elven heritage. They value both personal freedom and creative expression, demonstrating neither love of leaders nor desire for followers. They chafe at rules, resent others&#039; demands, and sometimes prove unreliable, or at least unpredictable.',
      Size: 'HaIf-elves are about the same size as humans, ranging from 5 to 6 feet tall. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      Darkvision:
        'Thanks to your elf blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can&#039;t discern color in darkness, only shades of gray.',
      'Fey Ancestry':
        'You have advantage on saving throws against being charmed, and magic can&#039;t put you to sleep.',
      'Skill Versatility': 'You gain proficiency in two skills of your choice.',
      Languages: 'You can speak, read, and write Common, Elvish, and one extra language of your choice.',
    },
    Subrace: {
      'Half-Elf Variant': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 2,
        },
        Traits: {
          'Half-Elf Variants':
            'Some half-elves in Faerûn have a racial trait in place of the Skill Versatility trait. If your DM allows it, your half-elf character can forgo Skill Versatility and instead take the trait Keen Senses or a trait based on your elf parentage. (Note: There is no reason to take Keen Senses over Skill Versatility. Until errata is published, Wizards of the Coast currently recommends picking one of the choices below instead.)',
          Types: {
            'Wood Elf':
              "A half-elf of wood elf descent can choose the wood elf's Elf Weapon Training, Fleet of Foot, or Mask of the Wild.",
            'Moon or Sun Elf':
              "A half-elf of moon elf or sun elf descent can choose the high elf's Elf Weapon Training or Cantrip.",
            Drow: "A half-elf of drow descent can choose the drow's Drow Magic.",
            'Aquatic Elf': 'A half-elf of aquatic heritage can choose a swimming speed of 30 feet.',
          },
        },
        Changes: {
          'Skill Versatility': 'You gain proficiency in two skills of your choice.',
        },
      },
      'Dragonmark of Detection': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 2,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase':
            'Your Wisdom score increases by 2, and one other ability score of your choice increase by 1.',
          'Deductive Intuition':
            'When you make an Intelligence (Investigation) or Wisdom (Insight) check, you can roll a d4 and add the number rolled to the ability check.',
          'Magical Detection':
            "You can cast the <i>Detect Magic</i> and <i>Detect Poison and Disease</i> spells with this trait. Starting at 3rd level, you can also cast the <i>See Invisibility</i> spell with it. Once you cast any of these spells with this trait, you can't cast that spell with it again until you finish a long rest. Wisdom is your spellcasting ability for these spells, and you don't require material components for them. (Errata: Casting ability changed to Wisdom from Intelligence)",
          'Spells of the Mark':
            'If you have the Spellcasting or the Pact Magic class feature, the spells on the Mark of Detection Spells table are added to the spell list of your spellcasting class.',
          Types: [
            {
              tdata1: '1st',
              tdata2: 'Detect Evil and Good, Detect Poison and Disease',
            },
            {
              tdata1: '2nd',
              tdata2: 'Detect Thoughts, Find Traps',
            },
            {
              tdata1: '3rd',
              tdata2: 'Clairevoyance, Nondetection',
            },
            {
              tdata1: '4th',
              tdata2: 'Arcane Eye, Divination',
            },
            {
              tdata1: '5th',
              tdata2: 'Legend Lore',
            },
          ],
        },
        Changes: {
          'Ability Score Increase':
            'Your Charisma score increases by 2, and two other ability scores of your choice increase by 1.',
          'Skill Versatility': 'You gain proficiency in two skills of your choice.',
        },
      },
      'Dragonmark of Storm': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 1,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 2,
        },
        Traits: {
          'Ability Score Increase': 'Your Charisma score increases by 2, and your Dexterity score increases by 1.',
          "Windwright's Intuition":
            "When you make an Dexterity (Acrobatics) or any ability check involving navigator's tools, you can roll a d4 and add the number rolled to the ability check.",
          "Storm's Boon": 'You have resistance to lightning damage.',
          Headwinds:
            'You know the <i>Gust</i> cantrip. Starting at 3rd level, you can cast the <i>Gust of Wind</i> spell once with this trait, and you regain the ability to cast it when you finish a long rest. Charisma is your spellcasting ability for these spells.',
          'Spells of the Mark':
            'If you have the Spellcasting or the Pact Magic class feature, the spells on the Mark of Storm Spells table are added to the spell list of your spellcasting class.',
          Types: [
            {
              tdata1: '1st',
              tdata2: 'Feather Fall, Fog Cloud',
            },
            {
              tdata1: '2nd',
              tdata2: 'Gust of Wind, Levitate',
            },
            {
              tdata1: '3rd',
              tdata2: 'Sleet Storm, Wind Wall',
            },
            {
              tdata1: '4th',
              tdata2: 'Conjure Minor Elemental, Control Water',
            },
            {
              tdata1: '5th',
              tdata2: 'Conjure Elemental',
            },
          ],
        },
        Changes: {
          'Ability Score Increase':
            'Your Charisma score increases by 2, and two other ability scores of your choice increase by 1.',
          'Skill Versatility': 'You gain proficiency in two skills of your choice.',
        },
      },
    },
  },
  HalfOrc: {
    AbilityScores: {
      Strength: 2,
      Dexterity: 0,
      Constitution: 1,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Strength score increases by 2, and your Constitution score increases by 1.',
      Age: 'Half-orcs mature a little faster than humans, reaching adulthood around age 14. They age noticeably faster and rarely live longer than 75 years.',
      Alignment:
        'Half-orcs inherit a tendency toward chaos from their orc parents and are not strongly inclined toward good. Half-orcs raised among orcs and willing to live out their lives among them are usually evil.',
      Size: 'Half-orcs are somewhat larger and bulkier than humans, and they range from 5 to well over 6 feet tall. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      Darkvision:
        'Thanks to your orc blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can&#039;t discern color in darkness, only shades of gray.',
      Menacing: 'You gain proficiency in the Intimidation skill.',
      'Relentless Endurance':
        'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can&#039;t use this feature again until you finish a long rest.',
      'Savage Attacks':
        'When you score a critical hit with a melee weapon attack, you can roll one of the weapon&#039;s damage dice one additional time and add it to the extra damage of the critical hit.',
      Languages:
        'You can speak, read, and write Common and Orc. Orc is a harsh, grating language with hard consonants. It has no script of its own but is written in the Dwarvish script.',
    },
    Subrace: {
      'Dragonmark of Finding': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 1,
          Intelligence: 0,
          Wisdom: 2,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Wisdom score increases by 2, and your Constitution score increases by 1..',
          Darkvision:
            "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
          "Hunter's Intuition":
            'When you make a Wisdom (Perception) or Wisdom (Survival) check, you can roll a d4 and add the number rolled to the ability check.',
          "Finder's Magic":
            "You can cast the <i>Hunter's Mark</i> spell with this trait. Starting at 3rd level, you can also cast the <i>Locate Object</i> spell with it. Once you cast either spell with this trait, you can't cast that spell with it again until you finish a long rest. Wisdom is your spellcasting ability for these spells.",
          Languages: 'You can speak, read, and write Common and Goblin.',
          'Spells of the Mark':
            'If you have the Spellcasting or the Pact Magic class feature, the spells on the Mark of Finding Spells table are added to the spell list of your spellcasting class.',
          Types: [
            {
              tdata1: '1st',
              tdata2: 'Faerie Fire, Longstrider',
            },
            {
              tdata1: '2nd',
              tdata2: 'Locate Animals or Plants, Locate Object',
            },
            {
              tdata1: '3rd',
              tdata2: 'Clairvoyance, Speak with Plants',
            },
            {
              tdata1: '4th',
              tdata2: 'Divination, Locate Creature',
            },
            {
              tdata1: '5th',
              tdata2: 'Commune with Nature',
            },
          ],
        },
        Changes: {
          'Ability Score Increase': 'Your Strength score increases by 2, and your Constitution score increases by 1.',
          Languages:
            'You can speak, read, and write Common and Orc. Orc is a harsh, grating language with hard consonants. It has no script of its own but is written in the Dwarvish script.',
        },
      },
    },
  },
  Halfling: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 2,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Dexterity score increases by 2.',
      Age: 'A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second century.',
      Alignment:
        'Most halflings are lawful good. As a rule, they are good-hearted and kind, hate to see others in pain, and have no tolerance for oppression. They are also very orderly and traditional, leaning heavily on the support of their community and the comfort of their old ways.',
      Size: 'Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small.',
      Speed: 'Your base walking speed is 25 feet.',
      Lucky:
        'When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.',
      Brave: 'You have advantage on saving throws against being frightened.',
      'Halfling Nimbleness': 'You can move through the space of any creature that is of a size larger than yours.',
      Languages:
        'You can speak, read, and write Common and Halfling. The Halfling language isn&#039;t secret, but halflings are loath to share it with others. They write very little, so they don&#039;t have a rich body of literature. Their oral tradition, however, is very strong. Almost all halflings speak Common to converse with the people in whose lands they dwell or through which they are traveling.',
    },
    Subrace: {
      'Lightfoot Halfling': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 1,
        },
        Traits: {
          'Ability Score Increase': 'Your Charisma score increases by 1.',
          'Naturally Stealthy':
            'You can attempt to hide even when you are obscured by only a creature that is at least one size larger than you.',
        },
      },
      'Stout Halfling': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 1,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Constitution score increases by 1.',
          'Stout Resilience':
            'You have advantage on saving throws against poison, and you have resistance against poison damage.',
        },
      },
      'Ghostwise Halfling': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 1,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Wisdom score increases by 1.',
          'Silent Speech':
            'You can speak telepathically to any creature within 30 feet of you. The creature understands you only if the two of you share a language. You can speak telepathically in this way to one creature at a time.',
        },
      },
      'Dragonmark of Healing': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 1,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Wisdom score increases by 1.',
          'Medical Intuition':
            'When you make a Wisdom (Medicine) check or an ability check using an herbalism kit, you can roll a d4 and add the number rolled to the ability check.',
          'Healing Touch':
            "You can cast the <i>Cure Wounds</i> spell with this trait. Starting at 3rd level, you can also cast <i>Lesser Restoration</i> with it. Once you cast either spell with this trait, you can't cast that spell with it again until you finish a long rest. Wisdom is your spellcasting ability for these spells.",
          'Spells of the Mark':
            'If you have the Spellcasting or the Pact Magic class feature, the spells on the Mark of Healing Spells table are added to the spell list of your spellcasting class.',
          Types: [
            {
              tdata1: '1st',
              tdata2: 'Cure Wounds, Healing Word',
            },
            {
              tdata1: '2nd',
              tdata2: 'Lesser Restoration, Prayer of Healing',
            },
            {
              tdata1: '3rd',
              tdata2: 'Aura of Vitality, Mass Healing Word',
            },
            {
              tdata1: '4th',
              tdata2: 'Aura of Purity, Aura of Life',
            },
            {
              tdata1: '5th',
              tdata2: 'Greater Restoration',
            },
          ],
        },
      },
      'Dragonmark of Hospitality': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 1,
        },
        Traits: {
          'Ability Score Increase': 'Your Charisma score increases by 1.',
          'Ever Hospitable':
            "When you make a Charisma (Persuasion) check or an ability check involving brewer's supplies or cook's utensils, you can roll a d4 and add the number rolled to the ability check.",
          "Innkeeper's Magic":
            "You can cast the <i>Prestidigitation</i> cantrip. You can also cast the <i>Purify Food and Drink</i> and <o>Unseen Servant</i> spells with this trait. Once you cast either spell with this trait, you can't cast that spell with it again until you finish a long rest. Charisma is your spellcasting ability for these spells.",
          'Spells of the Mark':
            'If you have the Spellcasting or the Pact Magic class feature, the spells on the Mark of Hospitality Spells table are added to the spell list of your spellcasting class.',
          Types: [
            {
              tdata1: '1st',
              tdata2: 'Goodberry, Sleep',
            },
            {
              tdata1: '2nd',
              tdata2: 'Aid, Calm Emotions',
            },
            {
              tdata1: '3rd',
              tdata2: "Create Food and Water, Leomund's Tiny Hut",
            },
            {
              tdata1: '4th',
              tdata2: "Aura of Purity, Mordenkainen's Private Sanctum",
            },
            {
              tdata1: '5th',
              tdata2: 'Hallow',
            },
          ],
        },
      },
    },
  },
  Hobgoblin: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 2,
      Intelligence: 1,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Constitution score increases by 2, and your Intelligence score increases by 1.',
      Age: 'Hobgoblins mature at the same rate as humans and have lifespans similar in length to theirs.',
      Alignment:
        'Hobgoblin society is built on fidelity to a rigid, unforgiving code of conduct. As such, they tend toward lawful evil.',
      Size: 'Hobgoblins are between 5 and 6 feet tall and weigh between 150 and 200 pounds. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      Darkvision:
        'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can&#039;t discern color in darkness, only shades of gray.',
      'Martial Training': 'You are proficient with two martial weapons of your choice and with light armor.',
      'Saving Face':
        "Hobgoblins are careful not to show weakness in front of their allies, for fear of losing status. If you miss with an attack roll or fail an ability check or a saving throw, you can gain a bonus to the roll equal to the number of allies you can see within 30 feet of you (maximum bonus of +5). Once you use this trait, you can't use it again until you finish a short or long rest.",
      Languages: 'You can speak, read, and write Common and Goblin.',
    },
  },
  Human: {
    AbilityScores: {
      Strength: 1,
      Dexterity: 1,
      Constitution: 1,
      Intelligence: 1,
      Wisdom: 1,
      Charisma: 1,
    },
    Traits: {
      'Ability Score Increase': 'Your ability scores each increase by 1.',
      Age: 'Humans reach adulthood in their late teens and live less than a century.',
      Alignment: 'Humans tend toward no particular alignment. The best and the worst are found among them.',
      Size: 'Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your position in that range, your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      Languages:
        'You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on.',
    },
    Subrace: {
      'Human Variant': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Two different ability scores of your choice increase by 1.',
          Skills: 'You gain proficiency in one skill of your choice.',
          Feat: 'You gain one feat of your choice.',
        },
        Changes: {
          'Ability Score Increase': 'Your ability scores each increase by 1.',
        },
      },
      'Dragonmark of Finding': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 1,
          Intelligence: 0,
          Wisdom: 2,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Wisdom score increases by 2, and your Constitution score increases by 1.',
          Darkvision:
            "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
          "Hunter's Intuition":
            'When you make a Wisdom (Perception) or Wisdom (Survival) check, you can roll a d4 and add the number rolled to the ability check.',
          "Finder's Magic":
            "You can cast the <i>Hunter's Mark</i> spell with this trait. Starting at 3rd level, you can also cast the <i>Locate Object</i> spell with it. Once you cast either spell with this trait, you can't cast that spell with it again until you finish a long rest. Wisdom is your spellcasting ability for these spells.",
          Languages: 'You can speak, read, and write Common and Goblin.',
          'Spells of the Mark':
            'If you have the Spellcasting or the Pact Magic class feature, the spells on the Mark of Finding Spells table are added to the spell list of your spellcasting class.',
          Types: [
            {
              tdata1: '1st',
              tdata2: 'Faerie Fire, Longstrider',
            },
            {
              tdata1: '2nd',
              tdata2: 'Locate Animals or Plants, Locate Object',
            },
            {
              tdata1: '3rd',
              tdata2: 'Clairvoyance, Speak with Plants',
            },
            {
              tdata1: '4th',
              tdata2: 'Divination, Locate Creature',
            },
            {
              tdata1: '5th',
              tdata2: 'Commune with Nature',
            },
          ],
        },
        Changes: {
          'Ability Score Increase': 'Your ability scores each increase by 1.',
          Languages:
            'You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on.',
        },
      },
      'Dragonmark of Handling': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 2,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase':
            'Your Wisdom score increases by 2, and one other ability score of your choice increases by 1.',
          'Wild Intuition':
            'When you make a Wisdom (Animal Handling) or Intelligence (Nature) check, you can roll a d4 and add the number rolled to the ability check.',
          'Primal Connection':
            "You can cast the <i>Animal Friendship</i> and <i>Speak with Animals</i> spells once with this trait, requiring no material component. Once you cast either spell with this trait, you can't cast that spell again until you finish a short or long rest. Wisdom is the spellcasting ability for these spells.",
          'The Bigger They Are':
            "Starting at 3rd level, you can target a beast or monstrosity when you canst <i>Animal Friendship</i> or <i>Speak with Animals</i> provided the creature's Intelligence score is 3 or lower.",
          'Spells of the Mark':
            'If you have the Spellcasting or the Pact Magic class feature, the spells on the Mark of Handling Spells table are added to the spell list of your spellcasting class.',
          Types: [
            {
              tdata1: '1st',
              tdata2: 'Animal Friendship, Speak with Animals',
            },
            {
              tdata1: '2nd',
              tdata2: 'Beast Sense, Calm Emotions',
            },
            {
              tdata1: '3rd',
              tdata2: 'Beacon of Hope, Conjure Animals',
            },
            {
              tdata1: '4th',
              tdata2: 'Aura of Life, Dominate Beast',
            },
            {
              tdata1: '5th',
              tdata2: 'Awaken',
            },
          ],
        },
        Changes: {
          'Ability Score Increase': 'Your ability scores each increase by 1.',
        },
      },
      'Dragonmark of Making': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 0,
          Intelligence: 2,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase':
            'Your Intelligence score increases by 2, and one other ability score of your choice increases by 1.',
          "Artisan's Intuition":
            "When you make an Arcana check or an ability check involving artisan's tools, you can roll a d4 and add the number rolled to the ability check.",
          "Maker's Gift": "You gain proficiency with one type of artisan's tools of your choice.",
          Spellsmith:
            "You know the <i>Mending</i> cantrip. You can also cast the <i>Magic Weapon</i> spell with this trait. When you do so, the spell lasts for 1 hour and doesn't require concentration. Once you cast the spell with this trait, you can't do so again until you finish a long rest. Intelligence is your spellcasting ability for these spells.",
          'Spells of the Mark':
            'If you have the Spellcasting or the Pact Magic class feature, the spells on the Mark of Making Spells table are added to the spell list of your spellcasting class.',
          Types: [
            {
              tdata1: '1st',
              tdata2: "Identify, Tenser's Floating Disk",
            },
            {
              tdata1: '2nd',
              tdata2: 'Continual Flame, Magic Weapon',
            },
            {
              tdata1: '3rd',
              tdata2: 'Conjure Barrage, Elemental Weapon',
            },
            {
              tdata1: '4th',
              tdata2: 'Fabricate, Stone Shape',
            },
            {
              tdata1: '5th',
              tdata2: 'Creation',
            },
          ],
        },
        Changes: {
          'Ability Score Increase': 'Your ability scores each increase by 1.',
        },
      },
      'Dragonmark of Passage': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase':
            'Your Dexterity score increases by 2, and one other ability score of your choice increases by 1.',
          "Courier's Speed": 'Your base walking speed increases to 35 feet.',
          'Intuitive Motion':
            'When you make a Dexterity (Acrobatics) check or any ability check to operate or maintain a land behicle, you can roll a d4 and add the number rolled to the ability check.',
          'Magical Passage':
            'You can cast the <i>Misty Step</i> spell once with this trait, and you regain the ability to cast it when you finish a long rest. Dexterity is your spellcasting ability for this spell.',
          'Spells of the Mark':
            'If you have the Spellcasting or the Pact Magic class feature, the spells on the Mark of Passage Spells table are added to the spell list of your spellcasting class.',
          Types: [
            {
              tdata1: '1st',
              tdata2: 'Expeditious Retreat, Jump',
            },
            {
              tdata1: '2nd',
              tdata2: 'Misty Step, Pass Without Trace',
            },
            {
              tdata1: '3rd',
              tdata2: 'Blink, Phantom Steed',
            },
            {
              tdata1: '4th',
              tdata2: 'Dimension Door, Freedom of Movement',
            },
            {
              tdata1: '5th',
              tdata2: 'Teleportation Circle',
            },
          ],
        },
        Changes: {
          'Ability Score Increase': 'Your ability scores each increase by 1.',
        },
      },
      'Dragonmark of Sentinel': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 2,
          Intelligence: 0,
          Wisdom: 1,
          Charisma: 0,
        },
        Traits: {
          'Ability Score Increase': 'Your Consitution score increases by 2, and your Wisdom score increases by 1.',
          "Sentinel's Intuition":
            'When you make a Wisdom (Insight) or Wisdom (Perception) check, you can roll a d4 and add the number rolled to the ability check.',
          "Guardian's Shield":
            'You can cast the <i>Shield</i> spell once with this trait, and you regain the ability to cast it after you finish a long rest. Wisdom is your spellcasting ability for this spell.',
          'Vigilant Guardian':
            "When a creature you can see within 5 feet of you is hit by an attack roll, you can use your reaction to swap places with that creature, and you are hit by the attack instead. Once you use this trait, you can't do so again until you finish a long rest.",
          'Spells of the Mark':
            'If you have the Spellcasting or the Pact Magic class feature, the spells on the Mark of Sentinel Spells table are added to the spell list of your spellcasting class.',
          Types: [
            {
              tdata1: '1st',
              tdata2: 'Compelled Duel, Shield of Faith',
            },
            {
              tdata1: '2nd',
              tdata2: 'Warding Bond, Zone of Truth',
            },
            {
              tdata1: '3rd',
              tdata2: 'Counterspell, Protection from Energy',
            },
            {
              tdata1: '4th',
              tdata2: 'Death Ward, Guardian of Faith',
            },
            {
              tdata1: '5th',
              tdata2: "Bigby's Hand",
            },
          ],
        },
        Changes: {
          'Ability Score Increase': 'Your ability scores each increase by 1.',
        },
      },
    },
  },
  Kalashtar: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 2,
      Charisma: 1,
    },
    Traits: {
      'Ability Score Increase': 'Your Wisdom score increases by 2, and your Charisma score increases by 1.',
      Age: 'Kalashtar mature and age at the same rate as humans.',
      Alignment:
        'The noble spirit tied to a kalashtar drives it toward lawful and good behavior. Most kalashtar combine strong self-disipline with compassion for all beings, but some kalashtar resist the virtuous influence of their spirit.',
      Size: 'Your size is Medium. To set your height and weight randomly, start with rolling a size modifier:<dd>Size modifier = 2d6</dd><dd>Height = 5 feet + 4 inches + your size modifier in inches</dd><dd>Weight in pounds = 110 + (1d6 x your size modifier)</dd>',
      Speed: 'Your base walking speed is 30 feet.',
      'Dual Mind': 'You have advantage on all Wisdom saving throws.',
      'Mental Discipline': 'You have resistance to psychic damage.',
      'Mind Link':
        "You can speak telepathically to any creature you can see, provided the creature is within a number of feet of you equal to 10 times your level. You don't need to share a language with the creature for it to understand your telepathic utterances, but the creature must be able to understand at least one language.<dd>When you're using this trait to speak telepathically to a creature, you can use your action to give that creature the ability to speak telepathically with you for 1 hour or until you end this effect as an action. To use this ability, the creature must be able to see you and must be within this trait's range. You can give this ability to only one creature at a time; giving it to a creature takes it away from another creature who has it.</dd>",
      'Severed from Dreams':
        "Kalashtar sleep, but they don't connect to the plane of dreams as other creatures do. Instead, their minds draw from the memories of their otherwordly spirit while they sleep. As such, you are immune to spells and other magical effects that require you to dream, like <i>Dream</i>, but not to spells and other magical effects that put you to sleep, like <i>Sleep</i>.",
      Languages: 'You can speak, read, and write Common, Quori, and one other language of your choice.',
    },
  },
  Kenku: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 2,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 1,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Dexterity score increases by 2, and your Wisdom score increases by 1.',
      Age: 'Kenku have shorter lifespans than humans. They reach maturity at about 12 years old and can live to 60.',
      Alignment:
        'Kenku are chaotic creatures, rarely making enduring commitments, and they care mostly for preserving their own hides. They are generally chaotic neutral in outlook.',
      Size: 'Kenku are around 5 feet tall and weight between 90 and 120 pounds. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      'Expert Forgery':
        "You can duplicate other creatures' handwriting and craftwork. You have advantage on all checks made to produce forgeries or duplicates of existing objects.",
      'Kenku Training':
        'You are proficient in your choice of two of the following skills: Acrobatics, Deception, Stealth, and Sleight of Hand.',
      Mimicry:
        'You can mimic sounds you have heard, including voices. A creature that hears the sound you make can tell they are imitations with a successful Wisdom (Insight) check opposed to your Charisma (Deception) check.',
      Languages: 'You can read, and write Common and Auran, but you can only speak by using your mimicry trait.',
    },
  },
  Kobold: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 2,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Dexterity score increases by 2. (Errata: Removed -2 to Strength)',
      Age: 'Kobolds reach adulthood at age 6 and can live up to 120 years but rarely do so.',
      Alignment:
        'Kobolds are fundamentally selfish, making them evil, but their reliance on the strength of their group makes them trend toward law.',
      Size: 'Kobolds are between 2 and 3 feet tall and weigh between 25 and 35 pounds. Your size is Small.',
      Speed: 'Your base walking speed is 30 feet.',
      Darkvision:
        'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can&#039;t discern color in darkness, only shades of gray.',
      'Grovel, Cower, and Beg':
        "As an action on your turn, you can cower pathetically to distract nearby foes. Until the end of your next turn, your allies gain advantage against all enemies within 10 feet of you that can see you. Once you use this trait, you can't use it again until you finish a short or long rest.",
      'Pack Tactics':
        "You have advantage on an attack roll against a creature if at least one of your allies is within 5 feet of the creature and the ally isn't incapacitated.",
      'Sunlight Sensitivity':
        'You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.',
      Languages: 'You can speak, read, and write Common and Draconic.',
    },
  },
  Leonin: {
    AbilityScores: {
      Strength: 1,
      Dexterity: 0,
      Constitution: 2,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Constitution score increases by 2, and your Strength score increases by 1.',
      Age: 'Leonin mature and age at about the same rate as humans.',
      Alignment: 'Leonin tend toward good alignments. Leonin who are focused on the pride lean toward lawful good.',
      Size: "Leonin are typically over 6 feet tall, with some standing over 7 feet. Your size is Medium. Here's how to determine your height and weight randomly, starting with rolling a size modifier:<dd>Size modifier = 2d10</dd><dd>Height = 5 feet + 6 inches + your size modifier in inches</dd><dd>Weight in pounds = 180 + (2d6 x your size modifier)</dd>",
      Speed: 'Your base walking speed is 35 feet.',
      Darkvision:
        "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
      Claws:
        'Your claws are natural weapons, which you can use to make unarmed strikes. If you hit with them, you can deal slashing damage equal to 1d4 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.',
      "Hunter's Instincts":
        'You have proficiency in one of the following skills of your choice: Athletics, Intimidation, Perception, or Survival.',
      'Daunting Roar':
        "As a bonus action, you can let out an especially menacing roar. Creatures of your choice within 10 feet of you that can hear you must succeed on a Wisdom saving throw or become frightened of you until the end of your next turn. The DC of the save equals 8 + your proficiency bonus + your Constitution modifier. Once you use this trait, you can't use it again until you finish a short or long rest.",
      Languages: 'You can speak, read, and write Common and Leonin.',
    },
  },
  Lizardfolk: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 2,
      Intelligence: 0,
      Wisdom: 1,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Constitution score increases by 2, and your Wisdom score increases by 1.',
      Age: 'Lizardfolk reach maturity around age 14 and rarely live longer than 60 years.',
      Alignment:
        'Most lizardfolk are neutral. They see the world as a place of predators and prey, where life and death are natural processes. They wish only to survive, and prefer to leave other creatures to their own devices.',
      Size: 'Lizardfolk are a little bulkier and taller than humans, and their colorful frills make them appear even larger. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet, and you have a swimming speed of 30 feet.',
      Bite: 'Your fanged maw is a natural weapon, which you can use to make unarmed strikes. If you hit with it, you can deal piercing damage equal to 1d6 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.',
      'Cunning Artisan':
        "As part of a short rest, you can harvest bone and hide from a slain beast, construct, dragon, monstrosity, or plant creature of size Small or larger to create one of the following items: a shield, a club, a javelin, or 1d4 darts or blowgun needles. To use this trait, you need a blade, such as a dagger, or appropriate artisan's tools, such as the leatherworker's tools.",
      'Hold Breath': 'You can hold your breath for up to 15 minutes at a time.',
      "Hunter's Lore":
        'You gain proficiency with two of the following skills of your choice: Animal Handling, Nature, Perception, Stealth, and Survival.',
      'Natural Armor':
        "You have a tough scaly skin. When you aren't wearing armor, your AC is 13 + your Dexterity modifier. You can use your natural armor to determine your AC if the armor you wear would leave you with a lower AC. A shield's benefits apply as normal while you use your natural armor.",
      'Hungry Jaws':
        "In battle, you can throw yourself into a vicious feeding frenzy. As a bonus action, you can make a special attack with your bite. If the attack hits, it deals its normal damage, and you gain temporary hit points (minimum of 1) equal to your Constitution modifier, and you can't use this trait again until you finish a short or a long rest.",
      Languages: 'You can speak, read, and write Common and Draconic.',
    },
  },
  Locathah: {
    AbilityScores: {
      Strength: 2,
      Dexterity: 1,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Please Support the Charity':
        "The Locathah is part of a charity package of which all proceeds go to the Extra Life charity, supporting children's hospitals.<dd>Buy the package <a href='https://www.dmsguild.com/product/289261' target='_blank'>here</a> and support the charity!</dd><dd>Learn more about the Extra Life Charity <a href='https://www.extra-life.org/index.cfm?fuseaction=cms.page&id=1306' target='_blank'>here.</a></dd><dd>Check out and join the D&D Team <a href='https://www.extra-life.org/index.cfm?fuseaction=donordrive.team&teamID=56177' target='_blank'>here.</a></dd><dd>Or donate through my page <a href='https://www.extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=453150' target='_blank'>here.</a></dd>",
    },
  },
  Loxodon: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 2,
      Intelligence: 0,
      Wisdom: 1,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Constitution score increases by 2, and your Wisdom score increases by 1.',
      Age: 'Loxodons physically mature at the same rate as humans, but they live about 450 years. They highly value the weight of wisdom and experience and are considered young until they reach athe age of 60.',
      Alignment:
        'Most loxodons are lawful, believing in the value of a peaceful, ordered life. They also tend toward good.',
      Size: 'Loxodons stand between 7 and 8 feet tall. Their massive bodies weigh between 300 and 400 pounds. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      'Powerful Build':
        'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
      'Loxodon Serenity': 'You have advantage on saving throws against being charmed or frightened.',
      'Natural Armor':
        "You have thick, leathery skin. When you aren&#039;t wearing armor, your AC is 12 + your Constitution modifier. You can use your natural armor to determine your AC if the armor you wear would leave you with a lower AC. A shield's benefits apply as normal while you use your natural armor.",
      Trunk:
        "You can grasp things with your trunk, and you can use it as a snorkel. It has a reach of 5 feet, and it can lift a number of pounds equal to five times your Strength score. You can use it to do the following simple tasks: lift, drop, hold, push, or pull an object or a creature; open or close a door or container; grapple someone; or make an unarmed strike. Your DM might allow other simple tasks to be added to that list of options.<dd>Your trunk can't wield weapons or shields or do anything that requires manual precision, such as using tools or magic items or performing the somatic components of a spell.</dd>",
      'Keen Smell':
        'Thanks to your sensitive trunk, you have advantage on Wisdom (Perception), Wisdom (Survival), and Intelligence (Investigation) checks that involve smell.',
      Languages: 'You can speak, read, and write Common and Loxodon.',
    },
  },
  Minotaur: {
    AbilityScores: {
      Strength: 2,
      Dexterity: 0,
      Constitution: 1,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Strength score increases by 2, and your Constitution score increases by 1.',
      Alignment:
        'Most minotaurs who join the Boros Legion lean toward lawful alignments, while those associated with the Cult of Rakdos or the Gruul Clans tend toward chaotic alignments.',
      Size: 'Minotaurs average over 6 feet in height, and they have stocky builds. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      Horns:
        'Your horns are natural melee weapons, which you can use to make unarmed strikes. If you hit with them, you deal piercing damage equal to 1d6 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.',
      'Goring Rush':
        'Immediately after you use the Dash action on your turn and move at least 20 feet, you can make one melee attack with your horns as a bonus action.',
      'Hammering Horns':
        'Immediately after you hit a creature with a melee attack as part of the Attack action on your turn, you can use a bonus action to attempt to shove that target with your horns. The target must be no more than one size larger than you and within 5 feet of you. Unless it succeeds on a Strength saving throw against a DC equal to 8 + your proficency bonus + your Strength modifier, you push it up to 10 feet away from you.',
      'Imposing Presence':
        'You have proficiency in one of the following skills of your choice: Intimidation or Persuasion.',
      Languages: 'You can speak, read, and write Common and Minotaur.',
    },
  },
  Orc: {
    AbilityScores: {
      Strength: 2,
      Dexterity: 0,
      Constitution: 1,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase':
        'Your Strength score increases by 2, and your Constitution score increases by 1. (Errata: Removed -2 to Intelligence)',
      Age: 'Orcs reach adulthood at age 12 and live up to 50 years.',
      Alignment:
        'Orcs are vicious raiders, who believe that the world should be theirs. They also respect strength above all else and believe the strong must bully the weak to ensure that weakness does not spread like a disease. They are usually chaotic evil.',
      Size: 'Orcs are usually over 6 feet tall and weigh between 230 and 280 pounds. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      Darkvision:
        "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
      Aggressive:
        'As a bonus action, you can move up to your speed toward an enemy of your choice that you can see or hear. You must end this move closer to the enemy than you started.',
      'Primal Intuition':
        'You have proficiency in two of the following skills of your choice: Animal Handling, Insight, Intimidation, Medicine, Nature, Perception, and Survival. (Errata: Replaced Menacing trait)',
      'Powerful Build':
        'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
      Languages: 'You can speak, read, and write Common and Orc.',
    },
    Subrace: {
      'Eberron Orc': {
        Traits: {
          Alignment:
            'The orcs of Eberron are a passionate people, given to powerful emotion and deep faith. They are generally chaotic, but can be any alignment.',
          Size: 'Your size is Medium. To set your height and weight randomly, start with rolling a size modifier:<dd>Size modifier = 2d8</dd><dd>Height = 5 feet + 4 inches + your size modifier in inches</dd><dd>Weight in pounds = 175 + (2d6 x your size modifier)</dd>',
        },
        Changes: {
          Alignment:
            'Orcs are vicious raiders, who believe that the world should be theirs. They also respect strength above all else and believe the strong must bully the weak to ensure that weakness does not spread like a disease. They are usually chaotic evil.',
          Size: 'Orcs are usually over 6 feet tall and weigh between 230 and 280 pounds. Your size is Medium.',
        },
      },
    },
  },
  Satyr: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 1,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 2,
    },
    Traits: {
      'Ability Score Increase': 'Your Charisma score increases by 2, and your Dexterity score increases by 1.',
      Age: 'Satyrs mature and age at about the same rate as humans.',
      Alignment:
        'Satyrs delight in living a life free of the mantle of law. They gravitate toward being good, but some have devious streaks and enjoy causing dismay.',
      Size: "Satyrs range from just under 5 feet to about 6 feet in height, with generally slender builds. Your size is Medium. Here's how to determine your height and weight randomly, starting with rolling a size modifier:</dd><dd>Size modifier = 2d8</dd><dd>Height = 4 feet + 8 inches + your size modifier in inches</dd><dd>Weight in pounds = 100 + (2d4 x your size modifier)</dd>",
      Speed: 'Your base walking speed is 35 feet.',
      Fey: 'Your creature type is fey, rather than humanoid.',
      Ram: 'You can use your head and horns to make unarmed strikes. If you hit with them, you deal bludgeoning damage equal to 1d4 + your Strength modifier.',
      'Magic Resistance': 'You have advantage on saving throws against spells and other magical effects.',
      'Mirthful Leaps':
        'Whenever you make a long or high jump, you can roll a d8 and add the number rolled to the number of feet you cover, even when making a standing jump. This extra distance costs movement as normal.',
      Reveler:
        'You have proficiency in the Performance and Persuasion skills, and you have proficiency with one musical instrument of your choice.',
      Languages: 'You can speak, read, and write Common and Sylvan.',
    },
  },
  Shifter: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      Age: 'Shifters are quick to mature both physically and emotionally, reaching young adulthood at age 10. They rarely live to be more than 70 years old.',
      Alignment:
        'Shifters tend toward neutrality, being more focused on survival than concepts of good and evil. A love of personal freedom can drive shifters toward chaotic alignments.',
      Size: 'Your size is Medium. To set your height and weight randomly, start with rolling a size modifier:<dd>Size modifier = 2d8</dd><dd>Height = 4 feet + 6 inches + your size modifier in inches</dd><dd>Weight in pounds = 90 + (2d4 x your size modifier)</dd>',
      Speed: 'Your base walking speed is 30 feet.',
      Darkvision:
        "You have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't descern color in darkness, only shades of gray.",
      Shifting:
        "As a bonus action, you can assume a more bestial apperance. This transformation lasts for 1 minute, until you die, or until you revert to your normal appearance as a bonus action. When you shift, you gain temporary hit points equal to your level + your Constitution modifier (minimum of 1 temporary hit point). You also gain additional benefits that depend on your shifter subrace, described below.<dd>Once you shift, you can't do so again until you finish a short or long rest.</dd>",
      Languages: 'You can speak, read, and write Common.',
      Subrace:
        'The beast within shapes each shifter physically and mentally. The four major subraces of shifter include: beasthide, longtooth, swiftstride, and wildhunt. Choose a subrace for your shifter.',
    },
    Subrace: {
      'Beasthide Shifter': {
        AbilityScores: {
          Strength: 1,
          Dexterity: 0,
          Constitution: 2,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          Beasthide:
            'Stoic and solid, a beasthide shifter draws strength and stability from the beast within. Beasthide shifters are typically tied to the bear or the boar, but this subrace could embody any creature known for its toughness.',
          'Ability Score Increase': 'Your Constitution score increases by 2, and your Strength score increases by 1.',
          'Natural Athelete': 'You have proficiency in the Athletics skill.',
          'Shifting Feature':
            'Whenever you shift, you gain 1d6 additional temporary hit points. While shifted, you have a +1 bonus to your Armor Class.',
        },
      },
      'Longtooth Shifter': {
        AbilityScores: {
          Strength: 2,
          Dexterity: 1,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          Longtooth:
            'Longtooth shifters are fierce and aggressive, but they form deep bonds with their friends. Many longtooth shifters have canine traits that become more pronounced as they shift, but they might instead draw on tigers, hyenas, or other predators.',
          'Ability Score Increase': 'Your Strength score increases by 2, and your Dexterity score increases by 1.',
          Fierce: 'You have proficiency in the Intimidation skill.',
          'Shifting Feature':
            'While shifted, you can use your enlongated fangs to make an unarmed strike as a bonus action. If you hit with your fangs, you can deal piercing damage equal to 1d6 + your Strength modifier instead of the bludgeoning damage normal for an unarmed strike.',
        },
      },
      'Swiftstride Shifter': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 1,
        },
        Traits: {
          Swiftstride:
            'Swiftstride shifters are graceful and quick. Typically feline in nature, swiftstride shifters are often aloof and difficult to pin down physically or socially.',
          'Ability Score Increase': 'Your Dexterity score increases by 2, and your Charisma score increases by 1.',
          Graceful: 'You have proficiency in the Acrobatics skill.',
          'Shifting Feature':
            "While shifted, your walking speed increases by 10 feet. Additionally, you can move up to 10 feet as a reaction when a creature ends its turn within 5 feet of you. This reaction movement doesn't provoke opportunity attacks.",
        },
      },
      'Wildhunt Shifter': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 1,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 2,
          Charisma: 0,
        },
        Traits: {
          Wildhunt:
            'Wildhunt shifters are sharp and insightful. Many are constantly alert, ever wary for possible threats. Others focus on their intuition, searching within. Wildhunt shifters are excellent hunters, and they also tend to become the spiritual leaders of shifter communities.',
          'Ability Score Increase': 'Your Wisdom score increases by 2, and your Dexterity score increases by 1.',
          'Natural Tracker': 'You have proficiency in the Survival skill.',
          'Shifting Feature':
            "While shifted, you have advantage on Wisdom checks, and no creature within 30 feet of you can make an attack roll with advantage against you unless you're incapacitated.",
        },
      },
    },
  },
  SimicHybrid: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 2,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase':
        'Your Constitution score increases by 2, and one other ability score of your choice increases by 1.',
      Age: 'Hybrids begin their lives as adult humans, elves, or vedalken. They age at a slightly accelerated rate, so their maximum life spans are probably reduced somewhat. The Guardian Project has not been operating long enough to observe the full effect of this phenomenon.',
      Alignment:
        "Most hybrids share the generally neutral outlook of the Simic Combine. They are more interested in scientific research and the standing of their guild than in moral or ethical questions. Those who leave the Combine, however, often do so because their philosophical outlook and alignment are more in line with a different guild's. ",
      Size: 'Your size is Medium, within the normal range of your humanoid base race.',
      Speed: 'Your base walking speed is 30 feet.',
      Darkvision:
        "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
      Languages: 'You can speak, read, and write Common and your choice of Elvish or Vedalken.',
      'Animal Enhancement':
        "Your body has been altered to incorporate certain animal characteristics. You choose one animal enhancement now and a second enhancement at 5th level.<dd>At 1st level, choose one of the following options:</dd><br><dd><i>Manta Glide:</i> You have ray-like fins that you can use as wings to slow your fall or allow you to glide. When you fall and aren't incapacitated, you can subtract up to 100 feet from the fall when calculating falling damage, and you can move up to 2 feet horizontally for every 1 foot you descend.</dd><dd><i> Nimble Climber:</i> You have a climbing speed equal to your walking speed.</dd><dd><i>Underwater Adaptation:</i> You can breathe air and water, and you have a swimming speed equal to your walking speed.</dd><br><dd>At 5th level, your body evolves further, developing new characteristics. Choose one of the options you didn't take at 1st level, or one of the following options:</dd><br><dd><i>Grappling Appendages:</i> You have two special appendages growing alongside your arms. Choose whether they're both claws or tentacles. As an action, you can use one of them to try to grapple a creature. Each one is also a natural weapon, which you can use to make an unarmed strike. If you hit with it, the target takes bludgeoning damage equal to ld6 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike. Immediately after hitting, you can try to grapple the target as a bonus action. These appendages can't precisely manipulate anything and can't wield weapons, magic items. or other specialized equipment.</dd><dd><i>Carapace:</i> Your skin in places is covered by a thick shell. You gain a +1 bonus to AC when you're not wearing heavy armor.</dd><dd><i>Acid Spit:</i> As an action, you can spray acid from glands in your mouth, targeting one creature or object you can see within 30 feet of you. The target takes 2d10 acid damage unless it succeeds on a Dexterity saving throw against a DC equal to 8 + your Constitution modifier + your proficiency bonus. This damage increases by ldl0 when you reach 11th level (3dl0) and 17th level (4d10). You can use this trait a number of times equal to your Consitution modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.</dd>",
    },
  },
  Tabaxi: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 2,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 1,
    },
    Traits: {
      'Ability Score Increase': 'Your Dexterity score increases by 2, and your Charisma score increases by 1.',
      Age: 'Tabaxi have lifespans equivalent to humans.',
      Alignment:
        'Tabaxi tend toward chaotic alignments, as they let impulse and fancy guide their decisions. They are rarely evil, with most of them driven by curiosity rather than greed or other dark impulses.',
      Size: 'Tabaxi are taller on average than humans and relatively slender. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      Darkvision:
        "You have a cat's keen senses, especially in the dark. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
      'Feline Agility':
        "Your reflexes and agility allow you to move with a burst of speed. When you move on your turn in combat, you can double your speed until the end of the turn. Once you use this trait, you can't use it again until you move 0 feet on one of your turns.",
      "Cat's Claws":
        'Because of your claws, you have a climbing speed of 20 feet. In addition, your claws are natural weapons, which you can use to make unarmed strikes. If you hit with them, you deal slashing damage equal to 1d4 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.',
      "Cat's Talent": 'You have proficiency in the Perception and Stealth skills.',
      Languages: 'You can speak, read, and write Common and one other language of your choice.',
    },
  },
  Tiefling: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 1,
      Wisdom: 0,
      Charisma: 2,
    },
    Traits: {
      'Ability Score Increase': 'Your Intelligence score increases by 1, and your Charisma score increases by 2.',
      Age: 'Tieflings mature at the same rate as humans but live a few years longer.',
      Alignment:
        'Tieflings might not have an innate tendency toward evil, but many of them end up there. Evil or not, an independent nature inclines many tieflings toward a chaotic alignment.',
      Size: 'Tieflings are about the same size and build as humans. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      Darkvision:
        'Thanks to your infernal heritage, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can&#039;t discern color in darkness, only shades of gray.',
      'Hellish Resistance': 'You have resistance to fire damage.',
      'Infernal Legacy':
        'You know the Thaumaturgy cantrip. Once you reach 3rd level, you can cast the Hellish Rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. Once you reach 5th level, you can also cast the Darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
      Languages: 'You can speak, read, and write Common and Infernal.',
    },
    Subrace: {
      "Devil's Tongue Tiefling": {
        Traits: {
          Appearance:
            "Your tiefling might not look like other tieflings. Rather than having the physical characteristics described in the Player's handbook, choose 1d4 + 1 of the following features: small horns; fangs or sharp teeth; a forked tongue; catlike eyes; six fingers on each hand; goat like legs; cloven hoofs; a forked tail; leathery or scaly skin; red or dark blue skin; cast no shadow or reflection; exude a smell of brimstone.",
          "Devil's Tongue":
            'You know the Vicious Mockery cantrip. When you reach 3rd level, you can cast the Charm Person spell as a 2nd-level spell once with this trait. When you reach 5th level, you can cast the Enthrall spell once with this trait. You must finish a long rest to cast these spells once again with this trait. Charisma is your spellcasting ability for them. This Trait replaces the Infernal Legacy Trait.',
        },
        Changes: {
          'Infernal Legacy':
            'You know the Thaumaturgy cantrip. Once you reach 3rd level, you can cast the Hellish Rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. Once you reach 5th level, you can also cast the Darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
      },
      'Feral Tiefling': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 2,
          Constitution: 0,
          Intelligence: 1,
          Wisdom: 0,
          Charisma: 0,
        },
        Traits: {
          Appearance:
            "Your tiefling might not look like other tieflings. Rather than having the physical characteristics described in the Player's handbook, choose 1d4 + 1 of the following features: small horns; fangs or sharp teeth; a forked tongue; catlike eyes; six fingers on each hand; goat like legs; cloven hoofs; a forked tail; leathery or scaly skin; red or dark blue skin; cast no shadow or reflection; exude a smell of brimstone.",
          'Ability Score Increase':
            'Your Intelligence score increases by 1, and your Dexterity by 2. This trait replaces the Ability Score Increase trait.',
        },
        Changes: {
          'Ability Score Increase': 'Your Intelligence score increases by 1, and your Charisma score increases by 2.',
        },
      },
      'Hellfire Tiefling': {
        Traits: {
          Appearance:
            "Your tiefling might not look like other tieflings. Rather than having the physical characteristics described in the Player's handbook, choose 1d4 + 1 of the following features: small horns; fangs or sharp teeth; a forked tongue; catlike eyes; six fingers on each hand; goat like legs; cloven hoofs; a forked tail; leathery or scaly skin; red or dark blue skin; cast no shadow or reflection; exude a smell of brimstone.",
          Hellfire:
            'You know the Thaumaturgy cantrip. Once you reach 3rd level, you can cast the Burning Hands spell once per day as a 2nd-level spell. Once you reach 5th level, you can also cast the Darkness spell once per day. Charisma is your spellcasting ability for these spells. This trait replaces the Infernal Legacy Trait.',
        },
        Changes: {
          'Infernal Legacy':
            'You know the Thaumaturgy cantrip. Once you reach 3rd level, you can cast the Hellish Rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. Once you reach 5th level, you can also cast the Darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
      },
      'Winged Tiefling': {
        Traits: {
          Appearance:
            "Your tiefling might not look like other tieflings. Rather than having the physical characteristics described in the Player's handbook, choose 1d4 + 1 of the following features: small horns; fangs or sharp teeth; a forked tongue; catlike eyes; six fingers on each hand; goat like legs; cloven hoofs; a forked tail; leathery or scaly skin; red or dark blue skin; cast no shadow or reflection; exude a smell of brimstone.",
          Winged:
            "You have bat-like wings sprouting from your shoulder blades. You have a flying speed of 30 feet while you aren't wearing heavy armor. This trait replaces the Infernal Legacy trait.",
        },
        Changes: {
          'Infernal Legacy':
            'You know the Thaumaturgy cantrip. Once you reach 3rd level, you can cast the Hellish Rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. Once you reach 5th level, you can also cast the Darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
      },
      'Descendant of Asmodeus': {
        Traits: {
          Asmodeus:
            "The tieflings connected to Nessus command the power of fire and darkness, guided by a keener than normal intellect, as befits those linked to Asmodeus himself. Such tieflings use the Ability Score Increase and Infernal Legacy traits in the Player's Handbook.",
        },
      },
      'Descendant of Baalzebul': {
        Traits: {
          Baalzebul:
            'The crumbling realm of Maladomini is ruled by Baalzebul, who excels at corrupting those whose minor sins can be transformed into acts of damnation. Tieflings linked to this archdevil can corrupt others both physically and psychically.',
          'Legacy of Maladomini':
            'You know the Thaumaturgy cantrip. When you reach 3rd level, you can cast the Ray of Sickness spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the Crown of Madness spell once with this trait and regain the ability to so do when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
        Changes: {
          'Infernal Legacy':
            'You know the Thaumaturgy cantrip. Once you reach 3rd level, you can cast the Hellish Rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. Once you reach 5th level, you can also cast the Darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
      },
      'Descendant of Dispater': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 1,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 2,
        },
        Traits: {
          Dispater:
            "The great city of Dis occupies most of Hell's second layer. It is a place where secrets are uncovered and shared with the highest bidder, making tieflings tied to Dispater excellent spies and infiltrators.",
          'Ability Score Increase': 'Your Charisma score increases by 2, and your Dexterity score increases by 1.',
          'Legacy of Dis':
            'You know the Thaumaturgy cantrip. When you reach 3rd level, you can cast the Disguise Self spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the Detect Thoughts spell once with this trait and regain the ability to so do when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
        Changes: {
          'Ability Score Increase': 'Your Intelligence score increases by 1, and your Charisma score increases by 2.',
          'Infernal Legacy':
            'You know the Thaumaturgy cantrip. Once you reach 3rd level, you can cast the Hellish Rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. Once you reach 5th level, you can also cast the Darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
      },
      'Descendant of Fierna': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 1,
          Charisma: 2,
        },
        Traits: {
          Fierna: 'A master manipulator, Fierna grants tieflings tied to her forceful personalities.',
          'Ability Score Increase': 'Your Charisma score increases by 2, and your Wisdom score increases by 1.',
          'Legacy of Phlegethos':
            'You know the Friends cantrip. When you reach 3rd level, you can cast the Charm Person spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the Suggestion spell once with this trait and regain the ability to so do when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
        Changes: {
          'Ability Score Increase': 'Your Intelligence score increases by 1, and your Charisma score increases by 2.',
          'Infernal Legacy':
            'You know the Thaumaturgy cantrip. Once you reach 3rd level, you can cast the Hellish Rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. Once you reach 5th level, you can also cast the Darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
      },
      'Descendant of Glasya': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 1,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 2,
        },
        Traits: {
          Glasya:
            "Glasya, Hell's criminal mastermind, grants her tieflings magic that is useful for committing heists.",
          'Ability Score Increase': 'Your Charisma score increases by 2, and your Dexterity score increases by 1.',
          'Legacy of Malbolge':
            'You know the Minor Illusion cantrip. When you reach 3rd level, you can cast the Disguise Self spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the Invisibility spell once with this trait and regain the ability to so do when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
        Changes: {
          'Ability Score Increase': 'Your Intelligence score increases by 1, and your Charisma score increases by 2.',
          'Infernal Legacy':
            'You know the Thaumaturgy cantrip. Once you reach 3rd level, you can cast the Hellish Rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. Once you reach 5th level, you can also cast the Darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
      },
      'Descendant of Levistus': {
        AbilityScores: {
          Strength: 0,
          Dexterity: 0,
          Constitution: 1,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 2,
        },
        Traits: {
          Levistus:
            'Frozen Stygia is ruled by Levistus, an archdevil known for offering bargains to those who face an inescapable doom.',
          'Ability Score Increase': 'Your Charisma score increases by 2, and your Constitution score increases by 1.',
          'Legacy of Stygia':
            'You know the Ray of Frost cantrip. When you reach 3rd level, you can cast the Armor of Agathys spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the Darkness spell once with this trait and regain the ability to so do when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
        Changes: {
          'Ability Score Increase': 'Your Intelligence score increases by 1, and your Charisma score increases by 2.',
          'Infernal Legacy':
            'You know the Thaumaturgy cantrip. Once you reach 3rd level, you can cast the Hellish Rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. Once you reach 5th level, you can also cast the Darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
      },
      'Descendant of Mammon': {
        Traits: {
          Mammon:
            'The great miser Mammon loves coins above all else. Tieflings tied to him excel at gathering and safeguarding wealth.',
          'Legacy of Minauros':
            "You know the Mage Hand cantrip. When you reach 3rd level, you can cast the Tenser's Floating Disk spell once with this trait and regain the ability to do so when you finish a short or long rest. When you reach 5th level, you can cast the Arcane Lock spell once with this trait, requiring no material component, and regain the ability to so do when you finish a long rest. Charisma is your spellcasting ability for these spells.",
        },
        Changes: {
          'Infernal Legacy':
            'You know the Thaumaturgy cantrip. Once you reach 3rd level, you can cast the Hellish Rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. Once you reach 5th level, you can also cast the Darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
      },
      'Descendant of Mephistopheles': {
        Traits: {
          Mephistopheles:
            'In the frozen realm of Cania, Mephistopheles offers arcane power to those who entreat with him. Tieflings linked to him master some arcane magic.',
          'Legacy of Cania':
            'You know the Mage Hand cantrip. When you reach 3rd level, you can cast the Burning Hands spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the Flame Blade spell once with this trait and regain the ability to so do when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
        Changes: {
          'Infernal Legacy':
            'You know the Thaumaturgy cantrip. Once you reach 3rd level, you can cast the Hellish Rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. Once you reach 5th level, you can also cast the Darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
      },
      'Descendant of Zariel': {
        AbilityScores: {
          Strength: 1,
          Dexterity: 0,
          Constitution: 0,
          Intelligence: 0,
          Wisdom: 0,
          Charisma: 2,
        },
        Traits: {
          Zariel:
            'Tieflings with a blood tie to Zariel are stronger than the typical tiefling and receive magical abilities that aid them in battle.',
          'Ability Score Increase': 'Your Charisma score increases by 2, and your Strength score increases by 1.',
          'Legacy of Avernus':
            'You know the Thaumaturgy cantrip. When you reach 3rd level, you can cast the Searing Smite spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the Branding Smite spell once with this trait and regain the ability to so do when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
        Changes: {
          'Ability Score Increase': 'Your Intelligence score increases by 1, and your Charisma score increases by 2.',
          'Infernal Legacy':
            'You know the Thaumaturgy cantrip. Once you reach 3rd level, you can cast the Hellish Rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. Once you reach 5th level, you can also cast the Darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
        },
      },
    },
  },
  Tortle: {
    AbilityScores: {
      Strength: 2,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 1,
      Charisma: 0,
    },
    Traits: {
      'Please Support the Charity':
        "The Tortle is part of a charity package of which all proceeds go to the Extra Life charity, supporting children's hospitals.<dd>Buy the package <a href='https://www.dmsguild.com/product/221716/Tortle-Package-5e' target='_blank'>here</a> and support the charity!</dd><dd>Learn more about the Extra Life Charity <a href='https://www.extra-life.org/index.cfm?fuseaction=cms.page&id=1306' target='_blank'>here.</a></dd><dd>Check out and join the D&D Team <a href='https://www.extra-life.org/index.cfm?fuseaction=donordrive.team&teamID=56177' target='_blank'>here.</a></dd><dd>Or donate through my page <a href='https://www.extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=453150' target='_blank'>here.</a></dd>",
    },
  },
  Triton: {
    AbilityScores: {
      Strength: 1,
      Dexterity: 0,
      Constitution: 1,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 1,
    },
    Traits: {
      'Ability Score Increase': 'Your Strength, Constitution, and Charisma scores each increase by 1.',
      Age: 'Tritons reach maturity around age 15 and can live up to 200 years.',
      Alignment:
        'Tritons tend toward lawful good. As guardians of the darkest reaches of the sea, their culture pushes them toward order and benevolence.',
      Size: 'Tritons are slightly shorter than humans, averaging 5 feet tall. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet, and you have a swimming speed of 30 feet.',
      Amphibious: 'You can breathe air and water.',
      'Control Air and Water':
        'A child of the sea, you can call on the magic of elemental air and water. You can cast Fog Cloud with this trait. Starting at 3rd level, you can cast Gust of Wind with it, and starting at 5th level, you can also cast Wall of Water with it. Once you cast a spell with this trait, you can’t cast that spell with it again until you finish a long rest. Charisma is your spellcasting ability for these spells.',
      Darkvision:
        'You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray. (Errata: Added Darkvision)',
      'Emissary of the Sea':
        'Aquatic beasts have an extraordinary affinity with your people. You can communicate simple ideas with beasts that can breathe water. They can understand the meaning of your words, though you have no special ability to understand them in return.',
      'Guardians of the Depths':
        'Adapted to even the most extreme ocean depths, you have resistance to cold damage. (Errata: Removed additional text)',
      Languages: 'You can speak, read, and write Common and Primordial.',
    },
  },
  Vedalken: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 2,
      Wisdom: 1,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase': 'Your Intelligence score increases by 2, and your Wisdom score increases by 1.',
      Age: 'Vedalken mature slower than humans do, reaching maturity around age 40. Their life span is typically 350 years, with some living to the age of 500.',
      Alignment: 'Vedalken are usually lawful and non-evil.',
      Size: 'Tall and slender, Vedalken stand 6 to 6 ½ feet tall on average and usually weigh less than 200 pounds. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      'Vedalken Dispassion': 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws.',
      'Tireless Precision':
        "You are proficient in one of the following skills of your choice: Arcana, History, Investigation, Medicine, Performance, or Sleight of Hand. You are also proficient with one tool of your choice.<dd>Whenever you make an ability check with the chosen skill or tool, roll a d4 and add the number rolled to the check's total.</dd>",
      'Partially Amphibious':
        "By absorbing oxygen through your skin, you can breathe underwater for up to 1 hour. Once you've reached that limit, you can't use this trait again until you finish a long rest.",
      Languages: 'You can speak, read, and write Common, Vedalken, and one other language of your choice.',
    },
  },
  Warforged: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 2,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    Traits: {
      'Ability Score Increase':
        'Your Constitution score increases by 2, and one other ability score of your choice increases by 1.',
      Age: 'A typical warforged is between two and thirty years old. The maximum warforged lifespan remains a mystery; so far, warforged have shown no signs of deterioration due to age. You are immune to magical aging effects.',
      Alignment:
        'Most warforged take comfort in order and discipline, tending toward law and neutrality. But some have absorbed the morality, or lack thereof, of the beings with which they served.',
      Size: 'Your size is Medium. To set your height and weight randomly, start with a rolling size modifier:<dd>Size modifier = 2d6</dd><dd>Height = 5 feet + 10 inches + your size modifier</dd><dd>Weight in pounds = 270 + (4 x your size modifier)</dd>',
      Speed: 'Your base walking speed is 30 feet.',
      'Constructed Resilience':
        "You were constructed to have remarkable fortitude, represented by the following benefits:<dd>You have advantage on savings throws against being poisoned, and you have resistance to poison damage.</dd><dd>You don't need to eat, drink, or breathe.</dd><dd>You are immune to disease.</dd><dd>You don't need to sleep, and magic can't put you to sleep.</dd>",
      "Sentry's Rest":
        "When you take a long rest, you must spend at least six hours in an inactive, motionless state, rather than sleeping. In this state, you appear inert, but it doesn't render you unconcious, and you can see and hear as normal.",
      'Integrated Protection':
        'Your body has a built in defensive layers, which can be enhanced with armor:<dd>You gain a +1 bonus to Armor Class.</dd><dd>You can don only armor with which you have proficency. To don armor other than a shield, you must incorporate it into your body over the course of 1 hour, during which, you remain in contact with the armor. To doff armor, you must spend 1 hour removing it. You can rest while donning or doffing armor in this way.</dd><dd>While you live, the armor incorporated into your body can’t be removed against your will',
      'Specialized Design': 'You gain one skill proficency and one tool proficency of your choice.',
      Languages: 'You can speak, read, and write Common and one other language of your choice.',
    },
  },
  YuanTi: {
    AbilityScores: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 1,
      Wisdom: 0,
      Charisma: 2,
    },
    Traits: {
      'Ability Score Increase': 'Your Charisma score increases by 2, and your Intelligence score increases by 1.',
      Age: 'Purebloods mature at the same rate as humans and have lifespans similar in length to theirs.',
      Alignment:
        'Purebloods are devoid of emotion and see others as tools to manipulate. They care little for law or chaos and are typically neutral evil.',
      Size: 'Purebloods match humans in average size and weight. Your size is Medium.',
      Speed: 'Your base walking speed is 30 feet.',
      Darkvision:
        'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can&#039;t discern color in darkness, only shades of gray.',
      'Innate Spellcasting':
        "You know the Poison Spray cantrip. You can cast Animal Friendship an unlimited number of times with this trait, but you can only target snakes with it. Starting at 3rd level, you can also cast Suggestion with this trait. Once you cast it, you can't do so again until you finish a long rest. Charisma is your spellcasting ability for these spells.",
      'Magic Resistance': 'You have advantage on all saving throws against spells and other magical effects.',
      'Poison Immunity': 'You are immune to poison damage and the poisoned condition.',
      Languages: 'You can speak, read, and write Common, Abyssal, and Draconic.',
    },
  },
};
