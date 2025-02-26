type Recipe = {
  parts: string[];
  result: string;
  title: string;
  alternative?: string[];
};

export const recipes: Recipe[] = [
  {
    parts: [require('./red.png'), require('./distillate.png')],
    result: require('./red-vial.png'),
    title: 'Зелье Лечения',
  },
  {
    parts: [require('./red.png'), require('./red.png'), require('./distillate.png')],
    result: require('./red-flask.png'),
    title: 'Зелье Лечения Среднее',
  },
  {
    parts: [require('./red.png'), require('./red.png'), require('./red.png'), require('./distillate.png')],
    result: require('./red-potion.png'),
    title: 'Зелье Лечения Большое',
  },
  {
    parts: [require('./blue.png'), require('./distillate.png')],
    result: require('./blue-vial.png'),
    title: 'Зелье Маны 1 ячейка',
  },
  {
    parts: [require('./blue.png'), require('./blue.png'), require('./distillate.png')],
    result: require('./blue-flask.png'),
    title: 'Зелье Маны 2 ячейка',
  },
  {
    parts: [require('./blue.png'), require('./blue.png'), require('./blue.png'), require('./distillate.png')],
    result: require('./blue-potion.png'),
    title: 'Зелье Маны 3 ячейка',
  },
  {
    parts: [require('./yellow.png'), require('./distillate.png')],
    result: require('./yellow-vial.png'),
    title: 'Зелье Защиты 10 ВКЗ',
  },
  {
    parts: [require('./yellow.png'), require('./yellow.png'), require('./distillate.png')],
    result: require('./yellow-flask.png'),
    title: 'Зелье Защиты 20 ВКЗ',
  },
  {
    parts: [require('./yellow.png'), require('./yellow.png'), require('./yellow.png'), require('./distillate.png')],
    result: require('./yellow-potion.png'),
    title: 'Зелье Защиты 30 ВКЗ',
  },
  {
    parts: [require('./red.png'), require('./yellow.png'), require('./distillate.png')],
    result: require('./orange-flask.png'),
    title: 'Лечение Болезней',
  },
  {
    parts: [require('./red.png'), require('./blue.png'), require('./distillate.png')],
    result: require('./violet-flask.png'),
    title: 'Невидимость',
  },
  {
    parts: [require('./blue.png'), require('./yellow.png'), require('./distillate.png')],
    result: require('./green-flask.png'),
    title: 'Героизм',
  },
  {
    parts: [require('./red-flask.png'), require('./green-flask.png'), require('./catalyst.png')],
    result: require('./brown-ampoule.png'),
    title: 'Аура Жизни',
    alternative: [require('./red.png'), require('./blue.png'), require('./yellow.png'), require('./catalyst.png')],
  },
  {
    parts: [require('./red-flask.png'), require('./orange-flask.png'), require('./catalyst.png')],
    result: require('./amber-ampoule.png'),
    title: 'Маяк Надежды',
    alternative: [require('./red.png'), require('./red.png'), require('./yellow.png'), require('./catalyst.png')],
  },
  {
    parts: [require('./red-flask.png'), require('./violet-flask.png'), require('./catalyst.png')],
    result: require('./magenta-ampoule.png'),
    title: 'Аура Очищения',
    alternative: [require('./red.png'), require('./red.png'), require('./blue.png'), require('./catalyst.png')],
  },
  {
    parts: [require('./blue-flask.png'), require('./green-flask.png'), require('./catalyst.png')],
    result: require('./turquoise-ampoule.png'),
    title: 'Мерцание',
    alternative: [require('./blue.png'), require('./blue.png'), require('./yellow.png'), require('./catalyst.png')],
  },
  {
    parts: [require('./blue-flask.png'), require('./orange-flask.png'), require('./catalyst.png')],
    result: require('./sky-blue-ampoule.png'),
    title: 'Полёт',
    alternative: [require('./red.png'), require('./blue.png'), require('./yellow.png'), require('./catalyst.png')],
  },
  {
    parts: [require('./blue-flask.png'), require('./violet-flask.png'), require('./catalyst.png')],
    result: require('./purple-ampoule.png'),
    title: 'Отражения',
    alternative: [require('./red.png'), require('./blue.png'), require('./blue.png'), require('./catalyst.png')],
  },
  {
    parts: [require('./yellow-flask.png'), require('./green-flask.png'), require('./catalyst.png')],
    result: require('./lime-ampoule.png'),
    title: 'Малое восстановление',
    alternative: [require('./blue.png'), require('./yellow.png'), require('./yellow.png'), require('./catalyst.png')],
  },
  {
    parts: [require('./yellow-flask.png'), require('./orange-flask.png'), require('./catalyst.png')],
    result: require('./pearl-ampoule.png'),
    title: 'Защита от энергии',
    alternative: [require('./red.png'), require('./yellow.png'), require('./yellow.png'), require('./catalyst.png')],
  },
  {
    parts: [require('./yellow-flask.png'), require('./violet-flask.png'), require('./catalyst.png')],
    result: require('./black-ampoule.png'),
    title: 'Снятие проклятия',
    alternative: [require('./red.png'), require('./blue.png'), require('./yellow.png'), require('./catalyst.png')],
  },
  {
    parts: [require('./green-flask.png'), require('./orange-flask.png'), require('./catalyst.png')],
    result: require('./grey-ampoule.png'),
    title: 'Каменная кожа',
    alternative: [
      require('./red.png'),
      require('./blue.png'),
      require('./yellow.png'),
      require('./yellow.png'),
      require('./catalyst.png'),
    ],
  },
  {
    parts: [require('./green-flask.png'), require('./violet-flask.png'), require('./catalyst.png')],
    result: require('./white-ampoule.png'),
    title: 'Высшая Невидимость',
    alternative: [
      require('./red.png'),
      require('./blue.png'),
      require('./blue.png'),
      require('./yellow.png'),
      require('./catalyst.png'),
    ],
  },
  {
    parts: [require('./orange-flask.png'), require('./violet-flask.png'), require('./catalyst.png')],
    result: require('./acid-yellow-ampoule.png'),
    title: 'Ускорение',
    alternative: [
      require('./red.png'),
      require('./red.png'),
      require('./blue.png'),
      require('./yellow.png'),
      require('./catalyst.png'),
    ],
  },
];
/* 

 
Зелёное+Оранжевое =Каменная кожа
Зелёное+Фиолетовое = Высшая Невидимость
Синее+Фиолетовое= Ускорение
*/
function renderRecipe(recipe: Recipe) {
  const recipeNode = document.createElement('div');
  recipeNode.classList.add('recipe');

  const partsNode = document.createElement('div');
  partsNode.classList.add('parts');
  recipeNode.appendChild(partsNode);

  recipe.parts.forEach((part) => {
    const ingredientNode = document.createElement('div');
    ingredientNode.classList.add('ingredient');
    const ingredientImg = document.createElement('img');
    ingredientImg.src = part;

    ingredientNode.appendChild(ingredientImg);
    partsNode.appendChild(ingredientNode);
  });

  if (recipe.alternative) {
    const alternativeNode = document.createElement('div');
    alternativeNode.classList.add('alternative');
    partsNode.appendChild(alternativeNode);

    recipe.alternative.forEach((part) => {
      const ingredientNode = document.createElement('div');
      ingredientNode.classList.add('ingredient');
      const ingredientImg = document.createElement('img');
      ingredientImg.src = part;

      ingredientNode.appendChild(ingredientImg);
      alternativeNode.appendChild(ingredientNode);
    });
  }

  const resultNode = document.createElement('div');
  resultNode.classList.add('result');

  const resultImg = document.createElement('img');
  resultImg.src = recipe.result;

  const titleNode = document.createElement('div');
  titleNode.classList.add('title');
  titleNode.textContent = recipe.title;

  resultNode.appendChild(resultImg);
  recipeNode.appendChild(resultNode);
  recipeNode.appendChild(titleNode);

  return recipeNode;
}

recipes.forEach((recipe) => {
  const recipeNode = renderRecipe(recipe);
  document.querySelector('.page').appendChild(recipeNode);
});
