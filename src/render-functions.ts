import { AbilityEnum, Ability, AbilityTitles } from './models/ability';
import { Action, ActionTitles, ActionType } from './models/action';
import { Character } from './models/character';
import { AcraneTricksterSpellcasting } from './models/arcane-trickster-spellslots';
import { IProficiencable, SkillEnum } from './models/skill';
import { glueUpPrepositions } from './prepositions';
import { Spell } from './models/spell';


export function renderAbility(character: Character, ability: Ability) {
  const skills = Array.from(character.skills.values()).filter((skill) => skill.ability === ability.type);

  const abilityNode = document.createElement('div');
  abilityNode.classList.add('ability');

  const ability__labelNode = document.createElement('h1');
  ability__labelNode.classList.add('ability__label');

  const ability__nameNode = document.createElement('div');
  ability__nameNode.classList.add('ability__name');
  ability__nameNode.textContent = ability.label;

  const ability__valueNode = document.createElement('div');
  ability__valueNode.classList.add('ability__value');
  ability__valueNode.textContent = ability.value.toString();

  const ability__modifierNode = document.createElement('div');
  ability__modifierNode.classList.add('ability__modifier');
  const abilitiyModifier = character.getAbilityModifier(AbilityEnum[ability.type]);
  ability__modifierNode.textContent = abilitiyModifier.toString();

  const ability__dependantsNode = document.createElement('div');
  ability__dependantsNode.classList.add('ability__dependants');
  ability__dependantsNode.style.height = `${16 * (skills.length + 1)}px`;

  const savingThrowsProficiencyModifier = ability.isSavingThrowsProficiency ? character.proficiency : 0;
  const savingThrowsModifier = abilitiyModifier + savingThrowsProficiencyModifier + ability.savingThrowBonus;
  ability__dependantsNode.appendChild(
    renderProficiencable(
      character,
      {
        type: 'Saving Throws',
        label: 'Спасброски',
        isProficiencient: ability.isSavingThrowsProficiency,
        isExpertised: false,
      },
      savingThrowsModifier,
    ),
  );

  skills
    .map((skill) => renderProficiencable(character, skill))
    .forEach((node) => {
      ability__dependantsNode.appendChild(node);
    });

  ability__labelNode.appendChild(ability__nameNode);
  ability__labelNode.appendChild(ability__valueNode);
  abilityNode.appendChild(ability__labelNode);
  abilityNode.appendChild(ability__modifierNode);
  abilityNode.appendChild(ability__dependantsNode);

  return abilityNode;
}

export function renderProficiencable(character: Character, skill: IProficiencable, value?: number) {
  const skillNode = document.createElement('div');
  skillNode.classList.add('skill');

  const skill__titleNode = document.createElement('div');
  skill__titleNode.classList.add('skill__title');
  skill__titleNode.textContent = skill.label;

  const skill__modifierNode = document.createElement('div');
  skill__modifierNode.classList.add('skill__modifier');
  if (value !== undefined && value !== null) {
    skill__modifierNode.textContent = value.toString();
  } else {
    skill__modifierNode.textContent = character.getSkillModifier(SkillEnum[skill.type]).toString();
  }

  if (skill.isProficiencient) {
    skill__modifierNode.classList.add('skill__modifier--proficiency');
  }

  if (skill.isExpertised) {
    skill__modifierNode.classList.add('skill__modifier--expertise');
  }

  skillNode.appendChild(skill__titleNode);
  skillNode.appendChild(skill__modifierNode);

  return skillNode;
}

export function renderResourceGroup(resource: { label: string; value: number }) {
  const resource__groupNode = document.createElement('div');
  resource__groupNode.classList.add('resource__group');

  const resource__groupLabelNode = document.createElement('div');
  resource__groupLabelNode.classList.add('resource__group-label');
  resource__groupLabelNode.textContent = resource.label;

  const resource__boxes = document.createElement('div');
  resource__boxes.classList.add('resource__boxes');
  resource__boxes.dataset.resourceBoxes = resource.value.toString();

  resource__groupNode.appendChild(resource__groupLabelNode);
  resource__groupNode.appendChild(resource__boxes);

  return resource__groupNode;
}

export function renderRaceTrait(traitTitle: string, traitDecsription: string) {
  const traitNode = document.createElement('div');
  traitNode.classList.add('trait');

  const traitTitleNode = document.createElement('h2');
  traitTitleNode.innerHTML = glueUpPrepositions(traitTitle);

  const traitDecsriptionNode = document.createElement('p');
  traitDecsriptionNode.innerHTML = glueUpPrepositions(traitDecsription);

  traitNode.appendChild(traitTitleNode);
  traitNode.appendChild(traitDecsriptionNode);

  return traitNode;
}

export function renderAction(action: Action, character: Character) {
  const actionNode = document.createElement('div');
  actionNode.classList.add('action');

  const actionLabelNode = document.createElement('div');
  actionLabelNode.classList.add('action__label');
  actionLabelNode.textContent = action.title;
  actionNode.appendChild(actionLabelNode);

  if (action.actionType !== ActionType.Action) {
    const actionTypeNode = document.createElement('div');
    actionTypeNode.classList.add('action__type');
    actionTypeNode.textContent = action.typeLabel;
    actionLabelNode.appendChild(actionTypeNode);
  }

  const actionRangeNode = document.createElement('div');
  actionRangeNode.classList.add('action__range');
  actionRangeNode.textContent = action.range;
  actionNode.appendChild(actionRangeNode);

  if (typeof action.getDescription === 'function') {
    const actionDetailsNode = document.createElement('div');
    actionDetailsNode.classList.add('action__details');
    actionDetailsNode.innerHTML = action.getDescription(character);
    actionNode.appendChild(actionDetailsNode);
  }

  return actionNode;
}

export function renderSpell(spell: Spell, character: Character) {
  const spellNode = document.createElement('div');
  spellNode.classList.add('spell');
  spellNode.classList.add('sheet__column');

  const level = spell.level === 0 ? 'Заговор' : `${spell.level} уровень`;
  spellNode.innerHTML = `<h1>${spell.title}</h1>`;
  spellNode.innerHTML += `<h2 class="spell__level">${level}, ${spell.school}</h2>`;
  spellNode.innerHTML += `<div class="spell__detail"><strong>Время накладывания</strong>: ${spell.actionType}</div>
<div class="spell__detail"><strong>Дистанция</strong>: ${spell.distance}</div>
<div class="spell__detail"><strong>Компоненты</strong>: ${spell.components}</div>
<div class="spell__detail"><strong>Длительность</strong>: ${spell.duration}</div>
<div class="spell__detail"><strong>Классы</strong>: ${spell.classes}</div>
<div class="spell__detail"><strong>Источник</strong>: ${spell.source}</div>
<div class="spell__description">${spell.description}</div>
`;

  if (spell.vocal) {
    spellNode.innerHTML += `<h2 class="spell__vocal">${spell.vocal.join(', ')}</h2>`
  }

  if (spell.somatic) {
    spellNode.innerHTML += `<h2 class="spell__somatic">${spell.somatic}</h2>`
  }

  return spellNode;
}

export function renderCharacter(character: Character) {
  // if (character?.race?.traits) {
  //   character.race.traits.forEach((traitDescription, trainName) => {
  //     document.querySelector('[data-race-traits]').appendChild(renderRaceTrait(trainName, traitDescription));
  //   });
  // }

  const abilitiesNode = document.querySelector('[data-abilities]');
  if (abilitiesNode) {
    const abilities = Array.from(character.abilities.values());
    abilities
      .map((ability) => renderAbility(character, ability))
      .forEach((node) => {
        abilitiesNode.appendChild(node);
      });
  }

  document.querySelector('[data-name]')?.textContent = character.name;
  document.querySelector('[data-class]')?.textContent = character.className;
  document.querySelector('[data-level]')?.textContent = character.level.toString();
  document.querySelector('[data-alignment]')?.textContent = character.alignment;
  document.querySelector('[data-archetype]')?.textContent = character.archetype;
  document.querySelector('[data-other-proficiencies]')?.textContent = character.proficiencies.join(', ');
  document.querySelector('[data-equipment]').innerHTML = character.equipment;
  // document.querySelector('[data-race]')?.textContent = character.raceTitle;

  document.querySelector('[data-proficiency]')?.textContent = character.proficiency.toString();
  document.querySelector('[data-perception]')?.textContent = character.getPassiveSkill(SkillEnum.Perception).toString();
  document.querySelector('[data-insight]')?.textContent = character.getPassiveSkill(SkillEnum.Insight).toString();
  document.querySelector('[data-investigation]')?.textContent = character.getPassiveSkill(SkillEnum.Investigation).toString();
  document.querySelector('[data-armor]')?.textContent = character.armor.toString();
  document.querySelector('[data-hp]')?.textContent = character.hp.toString();
  document.querySelector('[data-hit-die]')?.textContent = character.hitDie.toString();
  (document.querySelector('[data-hit-die-count]') as HTMLElement)?.dataset.resourceBoxes = character.level.toString();
  document.querySelector('[data-speed]')?.textContent = character.speed.toString();
  document.querySelector('[data-initiative]')?.textContent = character.initiative.toString();
  document.querySelectorAll('[data-dex-mod]')?.forEach((node) => {
    node.textContent = character.dexMod.toString();
  });
  document.querySelectorAll('[data-int-mod]').forEach((node) => {
    node.textContent = character.intMod.toString();
  });

  const resourceNodes = document.querySelectorAll('[data-resource-boxes]');
  resourceNodes.forEach((resourceNode) => {
    const count = parseInt((resourceNode as HTMLElement)?.dataset.resourceBoxes);
    for (let i = 0; i < count; i++) {
      const boxNode = document.createElement('div');
      boxNode.classList.add('resource__box');
      resourceNode.appendChild(boxNode);
    }
  });

  character.actions.forEach(action => {
    document.querySelector('[data-actions]').appendChild(renderAction(action, character));
  })

  character.spells.forEach(spell => {
    document.querySelector('[data-spells]').appendChild(renderSpell(spell, character));
  })
}

