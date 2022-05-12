export const handleFinishedRecipes = (recipe) => {
  const doneDate = new Date().toLocaleDateString('pt-Br');
  const splitedTags = typeof recipe.strTags === 'string'
    ? recipe.strTags.split(', ') : [];
  if (recipe.idMeal) {
    return {
      id: recipe.idMeal,
      type: 'food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate,
      tags: splitedTags,
    };
  }
  return {
    id: recipe.idDrink,
    type: 'drink',
    nationality: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
    doneDate,
    tags: splitedTags,
  };
};

export const sendToStorage = (recipe) => {
  const newRecipe = handleFinishedRecipes(recipe);
  const getDoneRecipes = localStorage.getItem('doneRecipes');
  const parsedDoneRecipes = JSON.parse(getDoneRecipes);
  const checkRecipe = parsedDoneRecipes && parsedDoneRecipes
    .some((item) => item.id.includes(newRecipe.id));
  if (parsedDoneRecipes && !checkRecipe) {
    const newStorage = [...parsedDoneRecipes, newRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
  }
};
