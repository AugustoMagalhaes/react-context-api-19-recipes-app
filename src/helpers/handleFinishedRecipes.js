export const handleFinishedRecipes = (recipe) => {
  const doneDate = new Date().toLocaleDateString('pt-Br');
  if (recipe.idMeal) {
    return {
      id: recipe.idMeal,
      type: 'meal',
      nationality: recipe.strArea,
      category: recipe.category,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate,
      tags: recipe.strTags,
    };
  }
  return {
    id: recipe.idDrink,
    type: 'drink',
    nationality: recipe.strArea || '',
    category: recipe.category,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
    doneDate,
    tags: recipe.strTags || [],
  };
};

export const sendToStorage = (recipe) => {
  const newRecipe = handleFinishedRecipes(recipe);
  const getDoneRecipes = localStorage.getItem('doneRecipes');
  const parsedDoneRecipes = JSON.parse(getDoneRecipes);
  if (parsedDoneRecipes) {
    const newStorage = [...parsedDoneRecipes, newRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
  }
};
